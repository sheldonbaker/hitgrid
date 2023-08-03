class TradeProcessor
  def initialize(proposal)
    @proposal = proposal
    @universe_id = @proposal.trade_deadline.universe.id
    @universe_date = @proposal.trade_deadline.universe.date
  end

  def valid?
    # TODOTODOTODO
    if @proposal.consented == false
      return false
    end

    true
  end

  def execute!
    if valid?
      ActiveRecord::Base.transaction do
        if @universe_id == 1
          raise "Cannot process universe-1 trade"
        end

        participating_teams = @proposal.participations.map(&:team)

        @proposal.participations.each do |participation|
          team = participation.team
          club_id = team.club.id

          other_team = participating_teams.find { |t| t.id != team.id }
          other_club_id = other_team.club.id

          participation.ingredients.each do |ingredient|
            assetable = ingredient.assetable
            provisionable = ingredient.provisionable

            ### assets

            if provisionable && provisionable.is_a?(Contingency)
              contingency = provisionable

              contingency.draft_picks.each do |draft_pick|
                assets = Asset.universable.where(assetable: draft_pick)
                reassign(assets, @universe_date, nil) # NO club - remove draft picks from assets
              end

              # TODOLATER
              # Add CededConditionals for new conditional

              conditional = Conditional.new(
                universe_id: @universe_id,
                condition: contingency.condition,
                draft_picks: contingency.draft_picks
              )

              Asset.create(
                universe_id: conditional.universe_id,
                club_id: other_club_id,
                start_date: @universe_date,
                end_date: LeagueYear.find(2015).end_date,
                assetable: conditional
              )
            end

            if assetable
              assets = Asset.universable.where(assetable: assetable)
              reassign(assets, @universe_date, other_club_id)

              ###
              ### allocations

              if assetable.is_a? Contract
                retainer = provisionable if provisionable && provisionable.is_a?(Retainer)

                allocations = Allocation.universable.where(contract_year: assetable.contract_year_for(2015)) # HACK: 2015
                reassign(allocations, @universe_date, other_club_id) do |allocation|
                  if retainer
                    { retained: true, retained_pct: 100 - allocation.effective_retained_pct - retainer.absolute_pct }
                  end
                end

                if retainer
                  # assumes no RetentionYears exist for same player and club
                  # (which is the rule in real life but we don't have validation for that yet)
                  retention = Retention.new(
                    universe_id: @universe_id,
                    club_id: club_id, # *not* other_club_id
                    contract: assetable,
                    absolute_pct: retainer.absolute_pct
                  )

                  split_retention_years = split_items_on_date(assetable.contract_years.map { |cy|
                    RetentionYear.new(
                      contract_year_id: cy.id,
                      league_year_id: cy.league_year_id,
                      start_date: cy.start_date,
                      end_date: cy.end_date
                    )
                  }, @universe_date)

                  split_retention_years.select! { |ry| ry.start_date >= @universe_date }

                  retention.retention_years = split_retention_years
                  retention.save!
                end
              end
            
              ### ltir reliefs
              reliefs = LtirRelief.universable.where(contract_year: assetable.contract_year_for(2015))
              reassign(reliefs, @universe_date, other_club_id)
              ###
            end
          end
        end

        ### cancel other proposals

        other_proposals = Proposal.participating_by(participating_teams.map(&:id)).where('proposals.id != ?', @proposal.id)
        other_proposals.where('trade_id IS NULL').each do |p|
          p.update_attributes! consented: false
        end

        ###

        trade = Trade.new(
          trade_deadline: @proposal.trade_deadline,
          date: @proposal.trade_deadline.date,
          proposal: @proposal
        )

        trade.participations = @proposal.participations.map do |pp|
          tp = pp.dup
          tp.negotiable = trade

          tp.ingredients = pp.ingredients.map do |ppi|
            tpi = ppi.dup
            tpi.participation = tp

            tpi
          end

          tp
        end

        trade.save!

        ### 

        # recalculate
        participating_teams.each do |team|
          Calculator.new.execute!(team.id, trade.date)
        end

        ###
        NewsItem.create(
          key: 'trade-confirmed',
          payload: {
            trade_id: trade.id,
            trade_deadline_id: @proposal.trade_deadline.id,
            club_distinctive_names: @proposal.participations.map { |p| p.team.club.distinctive_name }
          }
        )
        ### 

        true
      end
    end
  end

  private

  def reassign(relation, split_date, replacement_club_id)
    if relation.count == 0
      return
    end

    if relation.first.universe_id == 1
      items = relation.to_a.map { |i| i.dup.tap { |x| x.universe_id = @universe_id } }
    else
      items = relation.to_a.map &:dup
      relation.delete_all
    end

    items = split_items_on_date(items, split_date)

    # replace the club_id for today/future days
    items.each do |i|
      if i.start_date >= split_date
        attrs = block_given? && yield(i) || {}
        i.assign_attributes(attrs.merge({ club_id: replacement_club_id }))
      end

      i.save!
    end
  end

  # takes an array of items (e.g., Allocations) and returns a new
  # array containing new objects (e.g., Allocations) with (potentially)
  # one item split into two *on split_date*
  def split_items_on_date(items, split_date)
    dup_items = items.dup
    item_to_split = dup_items.find { |i| i.start_date <= split_date && i.end_date >= split_date }

    # don't split if start_date is the same as the current universe date
    unless item_to_split.start_date == split_date
      idx = dup_items.index(item_to_split)
      replacements = [
        item_to_split.dup.tap { |i| i.end_date = split_date - 1.day },
        item_to_split.dup.tap { |i| i.start_date = split_date }
      ]

      dup_items[idx..idx] = replacements
    end

    dup_items
  end
end