class BuyoutSerializer < ApplicationSerializer
  has_one :contract
  has_many :buyout_years
end
