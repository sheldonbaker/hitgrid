class NotificationSubscriptionSerializer < ApplicationSerializer
  attributes :id, :channel, :enabled
  has_one :registerable
end
