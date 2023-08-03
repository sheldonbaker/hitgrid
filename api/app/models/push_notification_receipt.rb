class PushNotificationReceipt
  include ActiveModel::Model
  include ActiveModel::Serialization

  attr_reader :push_notification

  def initialize(attrs = {})
    assign_attributes(attrs)
  end

  def assign_attributes(attrs = {})
    @subscription_endpoint = attrs[:subscription_endpoint]
  end

  def id
    @id ||= SecureRandom.uuid
  end

  def save
    @push_notification = PushNotification.pluck_last_for_endpoint!(@subscription_endpoint)
    !@push_notification.nil?
  end
end