class MessageSerializer < ApplicationSerializer
  belongs_to :sender
  belongs_to :receiver
  belongs_to :proposal

  attributes :body, :created_at

  attribute :unread?, key: :unread

  def unread?
    object.unread?(current_profile) if current_profile
  end
end
