class RecapturePenaltySerializer < ApplicationSerializer
  has_one :contract
  has_many :recapture_penalty_years
end
