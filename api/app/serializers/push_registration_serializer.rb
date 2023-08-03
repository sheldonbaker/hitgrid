class PushRegistrationSerializer < ApplicationSerializer
  attributes :id, :enabled, :endpoint, :client_id, :user_agent
end
