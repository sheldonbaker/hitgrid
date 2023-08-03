class SettlementYear < ActiveRecord::Base
  include Obligatable

  belongs_to :settlement
  validates_presence_of :settlement

  def start_date
    league_year.season_start_date
  end

  def end_date
    league_year.season_end_date
  end

  def self.for_team(team, all = false)
    Settlement.for_team(team, all).includes(:settlement_years).map(&:settlement_years).flatten
  end
end
