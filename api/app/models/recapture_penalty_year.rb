class RecapturePenaltyYear < ActiveRecord::Base
  include Obligatable

  belongs_to :recapture_penalty
  validates_presence_of :recapture_penalty

  def start_date
    league_year.season_start_date
  end

  def end_date
    league_year.season_end_date
  end

  def self.for_team(team, all = false)
    RecapturePenalty.for_team(team, all).includes(:recapture_penalty_years).map(&:recapture_penalty_years).flatten
  end
end
