class ProposalSerializer < ApplicationSerializer
  belongs_to :counter
  belongs_to :countered
  has_one :trade

  belongs_to :trade_deadline
  has_many :participations

  attributes :date, :consented, :created_at

  attribute :unread?, key: :unread

  def unread?
    object.unread?(current_profile) if current_profile
  end

  has_many :messages do
    link :related do href routes.messages_url(proposal_id: object.id, only_path: true) end
    include_data false
  end
end
