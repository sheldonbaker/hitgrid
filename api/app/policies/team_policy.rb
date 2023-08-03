class TeamPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where('teams.created_at IS NOT NULL')
    end
  end

  def show?
    true
  end
end
