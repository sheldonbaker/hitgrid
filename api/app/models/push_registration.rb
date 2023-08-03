class PushRegistration < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :user, :client_id, :user_agent

  before_save :set_enabled

  def registration_id
    if enabled
      parts = endpoint.split('/')
      parts.last
    end
  end

  def send_notification_later
    PushNotification.create!
  end

  private

  def set_enabled
    self.enabled = !endpoint.nil?
    true
  end
end
