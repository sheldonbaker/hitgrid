class Calculator
  def execute!(team_id, date)
    ActiveRecord::Base.transaction do
      league_year = LeagueYear.find(2015)

      team = Team.find(team_id)
      obligatables = Obligation.for_team(team_id).map &:obligatable

      dates = [date, Date.parse('2016-02-29'), Date.parse('2016-04-09') - 1.day]
      calcs = dates.map do |date|
        for_date(date, obligatables, league_year)
      end

      # Keep these - useful for potentially seeing what a team's calculation looked like
      # *when* a proposal was made
      # Calculation.where(universe_id: team.universe_id, club_id: team.club_id, date: date).destroy_all

      Calculation.create!(
        universe_id: team.universe_id,
        club_id: team.club_id,
        date: date,

        contracts_count: calcs[0][:contracts_count],
        cap_usage: calcs[0][:cap_usage],
        cap_space: calcs[0][:cap_space],
        absorbable_cap_hit: calcs[0][:absorbable_cap_hit],

        trade_deadline_cap_usage: calcs[1][:cap_usage],
        trade_deadline_cap_space: calcs[1][:cap_space],
        trade_deadline_absorbable_cap_hit: calcs[1][:absorbable_cap_hit],

        season_end_cap_usage: calcs[2][:cap_usage],
        season_end_cap_space: calcs[2][:cap_space]
      )
    end
  end

  private

  def for_date(date, obligatables, league_year)
    usage = obligatables.reduce(0) do |memo, ob|
      intersection = (ob.start_date..ob.end_date).to_a & (league_year.season_start_date..date).to_a

      memo + intersection.reduce(0) do |m, date|
        m + ob.daily_cap_cost
      end
    end

    space = league_year.upper_limit - usage
    absorbable = space * (1 / ((league_year.season_end_date - date) / league_year.season_days))

    counting_contracts = obligatables.select do |ob|
      (ob.start_date <= date && ob.end_date >= date) && ob.is_a?(Allocation) && !ob.exempt_from_50_limit
    end

    { contracts_count: counting_contracts.count, cap_usage: usage.round, cap_space: space.round, absorbable_cap_hit: absorbable.round }
  end
end