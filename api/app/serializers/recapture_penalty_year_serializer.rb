class RecapturePenaltyYearSerializer < ApplicationSerializer
  has_one :recapture_penalty
  
  naive_belongs_to :league_year
  attributes :cap_cost
end
