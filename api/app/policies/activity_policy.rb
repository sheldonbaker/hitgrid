class ActivityPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where('activities.created_at IS NOT NULL')
    end
  end
end
