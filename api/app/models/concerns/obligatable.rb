module Obligatable
  extend ActiveSupport::Concern

  included do
    belongs_to :league_year
    validates_presence_of :league_year

    before_save :set_season_days
    before_save :set_cap_cost
  end

  def season_days
    (end_season_day - start_season_day) + 1
  end

  def daily_cap_cost
    cap_hit.to_f / league_year.season_days
  end

  private

  def set_season_days
    self.start_season_day = league_year.season_day_at(start_date)
    self.end_season_day = league_year.season_day_at(end_date)
  end

  def set_cap_cost
    self.cap_cost = cap_hit * (season_days.to_f / league_year.season_days.to_f)
  end
end
