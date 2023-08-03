class PushNotificationReceiptPolicy < ApplicationPolicy
  def create?
    !token.nil?
  end

  def permitted_attributes(action)
    [:subscription_endpoint]
  end
end
