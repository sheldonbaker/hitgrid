class ContractSerializer < ApplicationSerializer
  has_one :player
  has_many :contract_years

  attributes :is_entry_level, :is_35_plus, :is_two_way
  attributes :value, :avg_performance_bonuses
end
