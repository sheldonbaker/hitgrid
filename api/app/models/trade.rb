class Trade < Negotiable
  acts_as_readable on: :created_at

  has_one :proposal

  has_many :comments, as: :commentable
  accepts_nested_attributes_for :comments

  def resolvable?
    false
  end

  def pusher_channels
    ["private-trade-deadline-#{trade_deadline_id}"]
  end

  def pusher_includes
    [participations: [:team, { ingredients: [{ assetable: [:contract_years, :player, :draft_picks] }, { provisionable: [:draft_picks] }] }]]
  end
end
