class RetentionSerializer < ApplicationSerializer
  has_one :contract
  has_many :retention_years  

  attributes :absolute_pct
end
