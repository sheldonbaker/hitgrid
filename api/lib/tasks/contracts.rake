namespace :contracts do
  desc "Import contracts from -data"
  task import: :environment do
    date = ENV['date'] || raise('Must specify date')
    team = ENV['team'] || raise('Must specify team')

    rows = CSV.read(Rails.root.join('data', 'denormalized/hc_contracts', date, team + '.csv'), headers: true)

    by_players = rows.group_by do |row|
      [row['playerFirstName'], row['playerLastName']].join(' ')
    end

    by_players.each do |group, rows|
      player = Player.find_or_create_by(
        first_name: rows.first['playerFirstName'],
        last_name: rows.first['playerLastName']
      )

      position = rows.first['playerPositions'].split(',').first.downcase
      position = { 'right wing': 'RW', 'center': 'C', 'left wing': 'LW', 'right defense': 'D', 'left defense': 'D', 'goaltender': 'G' }[position.to_sym]

      handedness = rows.first['playerShoots'].downcase

      player.assign_attributes(
        position: position,
        handedness: handedness,
        birthdate: Date.parse(rows.first['playerBorn'])
      )

      player.save

      contract = Contract.new(
        universe_id: 1,
        player: player,
        value: rows.first['contractValue'].gsub(/[^0-9]/, '').to_i,
        avg_performance_bonuses: rows.sum { |row| row['performanceBonuses'].gsub(/[^0-9]/, '').to_i } / rows.length
      )
      
      contract.is_entry_level = rows.first['contractType'] == 'ENTRY-LEVEL CONTRACT'
      # contract.is_35_plus = true # TODOTODOTODO

      contract.is_two_way = !rows.all? do |row|
        row['nhlSalary'] == row['ahlSalary']
      end

      rows.each do |row|
        contract_year = ContractYear.new(
          league_year_id: row['season'].split('-')[0],
          has_nmc: row['clause'] == 'NMC',
          has_ntc: row['clause'] == 'NTC' || row['clause'] == 'Modified NTC',
          signing_bonus: row['signingBonuses'].gsub(/[^0-9]/, '').to_i,
        )

        if row['ahlSalary'] == 'ENTRY-LEVEL SLIDE'
          contract_year.assign_attributes(
            slidden: true,
            avg_value: row['AAV'].gsub(/[^0-9]/, '').to_i
          )
        else
          contract_year.assign_attributes(
            nhl_salary: row['nhlSalary'].gsub(/[^0-9]/, '').to_i - row['signingBonuses'].gsub(/[^0-9]/, '').to_i,
            minor_salary: row['ahlSalary'].gsub(/[^0-9]/, '').to_i,
            max_performance_bonuses: row['performanceBonuses'].gsub(/[^0-9]/, '').to_i,
            avg_value: row['AAV'].gsub(/[^0-9]/, '').to_i
          )
        end

        contract.contract_years.push(contract_year)
      end

      contract.save
    end
  end
end