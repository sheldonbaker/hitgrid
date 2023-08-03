class TradeSerializer < ApplicationSerializer
  naive_belongs_to :trade_deadline
  has_many :participations

  attributes :players_involved, :draft_picks_involved, :compensation_involved
  attributes :created_at

  attribute :unread?, key: :unread

  def unread?
    object.unread?(current_profile) if current_profile
  end

  has_many :comments do
    link :related do
      href routes.trade_comments_url(trade_id: object.id, only_path: true)
    end

    include_data false
  end
end
