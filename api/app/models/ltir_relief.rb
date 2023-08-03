class LtirRelief < ActiveRecord::Base
  include Universable

  belongs_to :contract_year

  validates_presence_of :contract_year
  before_save :set_season_days

  def self.universable_clause
    "#{table_name}.contract_year_id"
  end

  def league_year
    @league_year ||= LeagueYear.find(2015) # HACK
  end

  private

  def set_season_days
    self.start_season_day = league_year.season_day_at(start_date)
    self.end_season_day = league_year.season_day_at(end_date)
  end
end
