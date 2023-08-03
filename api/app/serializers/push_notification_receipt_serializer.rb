class PushNotificationReceiptSerializer < ApplicationSerializer
  attributes :id
  has_one :push_notification
end
