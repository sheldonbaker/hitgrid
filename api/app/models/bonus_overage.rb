class BonusOverage < ActiveRecord::Base
  include Universable
  include Obligatable

  def self.obligatable_clause
    "id"
  end

  def start_date
    league_year.season_start_date
  end

  def end_date
    league_year.season_end_date
  end
end
