class PushRegistrationPolicy < ApplicationPolicy
  def create?
    !token.nil?
  end

  def update?
    record.user_id == token[:user_id]
  end

  def permitted_attributes(action)
    [:endpoint, :client_id, :user_agent]
  end
end
