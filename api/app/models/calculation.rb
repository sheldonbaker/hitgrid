class Calculation < ActiveRecord::Base
  include Universable
  
  belongs_to :team

  def self.universable_clause
    "to_char(#{table_name}.club_id, '99') || to_char(#{table_name}.date, 'YYYY-MM-DD')"
  end

  scope :latest_by_team, -> { select("DISTINCT ON (club_id) calculations.*").order("club_id, #{table_name}.created_at DESC") }

  validates_presence_of :universe, :club, :date

  before_save :assign_team

  def trade_deadline
    team.try(:trade_deadline)
  end

  def pusher_channels
    ["private-trade-deadline-#{team.trade_deadline_id}"] if team && team.trade_deadline_id
  end

  private

  def assign_team
    self.team = Team.where(universe_id: universe.id, club_id: club.id).first
  end
end
