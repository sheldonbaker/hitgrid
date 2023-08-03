class BonusOverageSerializer < ApplicationSerializer
  naive_belongs_to :league_year
  attributes :cap_cost
end
