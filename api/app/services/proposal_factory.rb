class ProposalFactory
  include ActiveModel::Validations

  attr_reader :proposal

  def initialize(attrs, profile)
    @profile = profile
    @proposal = Proposal.new(attrs)
    
    @proposal.date = @proposal.trade_deadline.date
    @proposal.participations.each { |p| p.initiating = false; p.negotiable = @proposal }
    @proposal.participations.find { |p| profile.teams.include?(p.team) }.assign_attributes(
      initiating: true,
      consenting: true
    )

    # sort initiating first
    sorted_participations = @proposal.participations.map(&:initiating).sort_by { |i| i ? 0 : 1 }

    @proposal.messages.each do |m|
      m.sender = sorted_participations.first.team
      m.recevier = sorted_participations.last.team
      m.proposal = @proposal
    end
  end

  def execute
    ActiveRecord::Base.transaction do
      @proposal.participations.each do |participation|
        team = participation.team
        allocations = Allocation.universable.for_team(team.id).on_team_date(team.id)

        participation.ingredients.each do |ingredient|
          if ingredient.assetable.is_a? Contract
            contract = ingredient.assetable
            contract_year = contract.contract_year_for(2015) # HACK

            ingredient.allocation = allocations.find { |a| a.contract_year_id == contract_year.id }
          end
        end
      end

      @proposal.save!
      @proposal.mark_as_read! for: @profile

      if @proposal.countered
        @proposal.countered.update_attributes! counter: @proposal
        
        # find countered proposal participation with the same team as
        # new proposal's initiator 
        part = @proposal.countered.participations.find { |p| p.team_id == @proposal.participations.find { |x| x.initiating }.team_id }
        part.update_attributes! consenting: false
      end

      true
    end
  end

  def errors
    @proposal.errors
  end
end