class BuyoutYear < ActiveRecord::Base
  include Universable
  include Obligatable

  belongs_to :buyout
  belongs_to :contract_year

  validates_presence_of :buyout

  def self.universable_clause
    "#{table_name}.contract_id"
  end

  def start_date
    league_year.season_start_date
  end

  def end_date
    league_year.season_end_date
  end

  def self.for_team(team, all = false)
    Buyout.for_team(team, all).includes(:buyout_years).map(&:buyout_years).flatten
  end
end
