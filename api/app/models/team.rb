class Team < ActiveRecord::Base
  belongs_to :universe
  belongs_to :trade_deadline
  belongs_to :club
  belongs_to :profile

  scope :claimed, -> { where('profile_id IS NOT NULL') }

  validates_presence_of :universe, :club
  validate :cannot_be_reclaimed

  def claimable?
    !trade_deadline.nil?
  end

  def claimed?
    !profile_id.nil?
  end

  def claimed_was?
    !profile_id_was.nil?
  end

  def date
    universe.date
  end

  def league_year
    universe.league_year
  end

  private

  def cannot_be_reclaimed
    if claimed? && claimed_was?
      errors.add(:profile)
      false
    end
  end
end
