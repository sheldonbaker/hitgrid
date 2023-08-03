class SmsRegistrationSerializer < ApplicationSerializer
  attributes :id, :phone_number, :verifiable_at, :verified_at, :enabled
end
