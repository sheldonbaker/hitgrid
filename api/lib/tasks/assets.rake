namespace :assets do
  desc "Import picks from -data"
  task import_draft_picks: :environment do
    Conditional.where(universe_id: 1).destroy_all
    CededConditional.destroy_all
    Asset.where(universe_id: 1).where(assetable_type: 'DraftPick').destroy_all

    clubs = Club.all.index_by &:abbr
    league_years = LeagueYear.all.index_by &:id
    start_date = league_years[2015].start_date # should work for now?

    CSV.read(Rails.root.join('data', 'picks.csv'), headers: true).each do |row|
      draft_pick = DraftPick.find_by(
        league_year_id: row['year'],
        round: row['round'],
        club_id: clubs[row['originalClub']].id
      )

      asset = Asset.new(
        universe_id: 1,
        club_id: clubs[row['club']].id,
        start_date: start_date,
        end_date: nil
      )

      if row['condition']
        conditional = Conditional.find_or_create_by(condition: row['condition'])
        conditional.draft_picks.push(draft_pick)
        conditional.save

        holder = true if row['conditionHolder'] == 'true'
        holder = false if row['conditionHolder'] == 'false'

        if holder == true
          asset.assetable = conditional
          asset.save
        elsif holder == false
          CededConditional.create(
            universe_id: 1,
            club_id: clubs[row['club']].id,
            start_date: start_date,
            end_date: nil,
            conditional: conditional
          )
        else
          # binding.pry
          # raise 'oh noes'
        end
      else
        asset.assetable = draft_pick
        asset.save
      end
    end
  end
end