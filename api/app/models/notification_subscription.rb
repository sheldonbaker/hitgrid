class NotificationSubscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :registerable, polymorphic: true
  
  validates_presence_of :user, :registerable
end
