class CalculationSerializer < ApplicationSerializer
  naive_belongs_to :club
  belongs_to :team
  belongs_to :trade_deadline

  attributes :date, :created_at

  attributes :contracts_count
  attributes :cap_usage, :cap_space, :ltir_relief, :bonus_cushion_usage, :absorbable_cap_hit
  
  attributes :trade_deadline_cap_usage, :trade_deadline_cap_space, :trade_deadline_absorbable_cap_hit
  attributes :trade_deadline_ltir_relief, :trade_deadline_bonus_cushion_usage

  attributes :season_end_cap_usage, :season_end_cap_space
  attributes :season_end_ltir_relief, :season_end_bonus_cushion_usage
end
