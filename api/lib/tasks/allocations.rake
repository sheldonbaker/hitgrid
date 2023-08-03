namespace :allocations do
  desc "Import allocations from -data"
  task import: :environment do
    date = ENV['date'] || raise('Must specify date')
    team = ENV['team'] || raise('Must specify team')

    ActiveRecord::Base.transaction do
      clubs = Club.all.index_by do |club| club.distinctive_name.downcase; end
      league_year = LeagueYear.find(2015) # should work for now?

      rows = CSV.read(Rails.root.join('data', 'denormalized/hc_allocations', date, team + '.csv'), headers: true)
      grouped = rows.group_by do |row|
        [row['firstName'], row['lastName']].join(' ')
      end

      grouped.each do |group, rows|
        rows.each_with_index do |row, index|
          contract_year = ContractYear
            .joins(contract: [:player])
            .where(league_year: league_year)
            .where('players.first_name = ?', row['firstName'])
            .where('players.last_name = ?', row['lastName'])
            .first

          allocation = Allocation.new(
            universe_id: 1,
            league_year: league_year,
            club_id: clubs[row['team']].id,
            contract_year: contract_year
          )

          allocation.start_date = Date.parse(row['startDate'])
          allocation.end_date = Date.parse(row['endDate'])

          allocation.loaned = ['Minors', 'Junior'].include?(row['status'])
          allocation.suspended = ['Suspended', 'SABP Suspension'].include?(row['status'])
          allocation.on_ir = ['Injured Reserve', 'Season-Opening Injured Reserve', 'Long-term Injured Reserve'].include?(row['status'])
          allocation.on_ltir = ['Long-term Injured Reserve', 'LTIR Conditioning'].include?(row['status'])
          allocation.exempt_from_50_limit = row['status'] == 'Junior' # TODO - age?

          if index == rows.length - 1
            unless row['last'] == 'true'
              allocation.end_date = league_year.season_end_date
            end
          end

          allocation.save!
        end
      end
    end

    ActiveRecord::Base.transaction do
      grouped = Allocation.where(universe_id: 1).all.group_by { |alloc| [alloc.universe_id, alloc.club_id, alloc.contract_year_id] }
    
      grouped.each do |key, allocations|
        asset = Asset.new(
          universe_id: 1,
          club_id: allocations.first.club_id,
          start_date: allocations.map(&:start_date).min,
          end_date: allocations.map(&:end_date).max,
          assetable: allocations.first.contract_year.contract
        )

        asset.save!
      end
    end
  end
end