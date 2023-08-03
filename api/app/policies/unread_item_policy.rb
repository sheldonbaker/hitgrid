class UnreadItemPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.for_profile(profile)
    end
  end
end
