class ContractYearSerializer < ApplicationSerializer
  belongs_to :contract
  naive_belongs_to :league_year

  attributes :avg_value, :nhl_salary, :minor_salary, :signing_bonus, :max_performance_bonuses
  attributes :has_ntc, :has_nmc
end
