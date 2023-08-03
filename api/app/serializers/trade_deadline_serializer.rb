class TradeDeadlineSerializer < ApplicationSerializer
  attributes :id, :name, :starts_at, :ends_at
  attributes :teams_count, :claimed_teams_count

  attributes :favourite_club_claimed

  def favourite_club_claimed
    if club = current_profile.try(:favourite_club)
      object.club_claimed?(club)
    else
      nil
    end
  end

  has_many :news_items do
    link :related do
      href routes.news_items_url(trade_deadline_id: object.id, only_path: true)
    end

    include_data false
  end

  has_many :chat_posts do
    link :related do
      href routes.trade_deadline_chat_posts_url(trade_deadline_id: object.id, only_path: true)
    end

    include_data false
  end

  has_many :teams do
    link :related do
      href routes.trade_deadline_teams_url(trade_deadline_id: object.id, only_path: true)
    end

    include_data false
  end

  has_many :trades do
    link :related do
      href routes.trades_url(trade_deadline_id: object.id, include: 'participations.*', only_path: true)
    end

    include_data false
  end

  has_many :calculations do
    link :related do
      href routes.calculations_url(trade_deadline_id: object.id, only_path: true)
    end

    include_data false
  end

  has_many :comments do
    link :related do
      href routes.trade_deadline_comments_url(trade_deadline_id: object.id, only_path: true)
    end

    include_data false
  end
end
