class ChatPost < ActiveRecord::Base
  belongs_to :trade_deadline
  belongs_to :team

  validates_presence_of :trade_deadline, :team, :body
  validate :team_must_be_in_trade_deadline

  private

  def team_must_be_in_trade_deadline
    if trade_deadline && team
      errors.add(:team) unless trade_deadline.teams.include?(team)
    end
  end
end
