class Notifier
  def initialize(user)
    @user = user
  end

  def notify(channel)
    @user.notification_subscriptions.where(channel: channel, enabled: true).each do |sub|
      # sub.send_notification_later
    end
  end
end