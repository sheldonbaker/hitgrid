class Message < ActiveRecord::Base
  acts_as_readable on: :created_at

  belongs_to :sender, class_name: 'Team'
  belongs_to :receiver, class_name: 'Team'
  belongs_to :proposal

  validates_presence_of :sender, :receiver, :body

  scope :for_profile_id, -> (profile_id) {
    joins('LEFT OUTER JOIN teams ON messages.sender_id = teams.id OR messages.receiver_id = teams.id').
    where('teams.profile_id = ?', profile_id)
  }

  def pusher_channels
    ["private-trade-deadline-#{receiver.trade_deadline_id}-team-#{receiver.id}"]
  end

  def pusher_includes
    [:sender, :receiver]
  end
end
