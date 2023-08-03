class PushNotificationSerializer < ApplicationSerializer
  attributes :id, :icon, :title, :body, :target_path
end
