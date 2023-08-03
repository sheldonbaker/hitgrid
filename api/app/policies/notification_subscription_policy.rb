class NotificationSubscriptionPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user_id: token[:user_id])
    end
  end

  def create?
    !token.nil?
  end

  def update?
    record.user_id == token[:user_id]
  end

  def permitted_attributes(action)
    [:registerable_id, :registerable_type, :channel, :enabled]
  end
end
