class SettlementYearSerializer < ApplicationSerializer
  has_one :settlement
  
  naive_belongs_to :league_year
  attributes :cap_cost
end
