class TradeDeadline < ActiveRecord::Base
  has_many :teams
  has_one :universe

  has_many :comments, as: :commentable

  validates_presence_of :name, :starts_at, :ends_at

  def date
    universe.date
  end

  def teams_count
    30
  end

  def claimed_teams
    teams.claimed
  end

  def team_for_profile(profile)
    teams.where(profile_id: profile).first
  end

  def club_claimed?(club)
    teams.find { |t| t.club_id == club.id }.claimed?
  end

  def pusher_channels
    ["private-trade-deadlines"]
  end
end
