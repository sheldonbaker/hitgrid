class TradeDeadlineCreator
  def initialize(attrs)
    @name = attrs[:name]
    @starts_at = attrs[:starts_at]
    @ends_at = attrs[:ends_at]
  end

  def execute!
    ActiveRecord::Base.transaction do
      date = Date.parse('2016-02-29')
      universe = Universe.new(league_year_id: 2015, date: date)
      
      td = TradeDeadline.new(name: @name, starts_at: @starts_at, ends_at: @ends_at, claimed_teams_count: 0)
      universe.trade_deadline = td

      Club.all.each do |club|
        td.teams.push(Team.new(universe: universe, club_id: club.id, trade_deadline: td))
      end

      td.save!
      universe.save!

      td.teams.each do |team|
        Calculator.new.execute(team.id, date: date)
      end
    end
  end
end