class SettlementSerializer < ApplicationSerializer
  has_one :contract
  has_many :settlement_years  
end
