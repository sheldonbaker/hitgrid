class SmsRegistrationPolicy < ApplicationPolicy
  def create?
    !token.nil?
  end

  def update?
    record.user_id == token[:user_id]
  end

  def permitted_attributes(action)
    if action.to_sym == :create
      [:phone_number]
    else
      [:verification_code]
    end
  end
end
