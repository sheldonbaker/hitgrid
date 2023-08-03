class Comment < ActiveRecord::Base
  acts_as_readable on: :created_at

  belongs_to :commentable, polymorphic: true
  belongs_to :profile
  belongs_to :team # team for profile in deadline (if exists)
  belongs_to :trade_deadline

  validates_presence_of :body, :commentable, :profile

  before_save :set_cached_values

  private

  def set_cached_values
    if commentable.is_a? TradeDeadline
      self.trade_deadline = commentable
    elsif commentable.respond_to? :trade_deadline
      self.trade_deadline = commentable.trade_deadline
    end

    if trade_deadline
      self.team = trade_deadline.team_for_profile(profile)
    end
  end
end
