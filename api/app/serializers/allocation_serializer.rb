class AllocationSerializer < ApplicationSerializer
  attributes :loaned, :suspended, :on_soir, :retained, :retained_pct
  attributes :start_date, :end_date, :season_days, :start_season_day, :end_season_day
  attributes :cap_hit, :cap_cost

  attributes :on_ir, :on_ltir

  has_one :contract_year
  naive_belongs_to :league_year
end
