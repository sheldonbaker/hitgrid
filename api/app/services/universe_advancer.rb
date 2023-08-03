class UniverseAdvancer
  def initialize(universe)
    @universe = universe
  end

  def execute!
    ActiveRecord::Base.transaction do 
      @universe.update_attributes date: @universe.date + 1.day

      @universe.teams.each do |team|
        Calculator.new.execute!(team.id, @universe.date)
      end
    end
  end
end