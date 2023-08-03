namespace :draft_picks do
  desc "Import draft picks from GF"
  task import: :environment do
    ActiveRecord::Base.transaction do
      clubs = Club.all.index_by &:abbr

      rows = CSV.read(Rails.root.join('data', 'denormalized/gf_picks_fixed.csv'), headers: true)
    
      rows.each do |row|
        pick = DraftPick.create(
          league_year_id: row['year'].to_i - 1,
          round: row['round'].to_i,
          club_id: clubs[row['originalClub']].id
        )

        if row['condition']
          conditional = Conditional.find_or_create_by(
            universe_id: 1,
            condition: row['condition']
          )

          conditional.draft_picks.push(pick)
          conditional.save

          Asset.create(
            universe_id: 1,
            club_id: clubs[row['conditionalYieldee']].id,
            start_date: Date.parse('2015-07-01'), # HACK
            end_date: Date.parse('2016-04-09'), # HACK
            assetable: conditional
          )

          CededConditional.create(
            universe_id: 1,
            club_id: clubs[row['conditionalYielder']].id,
            start_date: Date.parse('2015-07-01'), # HACK
            end_date: Date.parse('2016-04-09'), # HACK
            conditional_id: conditional.id
          )
        else
          Asset.create(
            universe_id: 1,
            club_id: clubs[row['owner']].id,
            start_date: Date.parse('2015-07-01'), # HACK
            end_date: Date.parse('2016-04-09'), # HACK
            assetable: pick
          )
        end
      end
    end
  end
end