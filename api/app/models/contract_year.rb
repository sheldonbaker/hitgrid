class ContractYear < ActiveRecord::Base
  belongs_to :contract
  belongs_to :league_year

  def non_performance_bonuses
    signing_bonuses
  end

  def start_date
    league_year.start_date
  end

  def end_date
    league_year.end_date
  end
end
