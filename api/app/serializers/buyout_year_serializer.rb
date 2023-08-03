class BuyoutYearSerializer < ApplicationSerializer
  has_one :buyout
  
  naive_belongs_to :league_year
  attributes :cap_cost
end
