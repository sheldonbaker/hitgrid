class ChatPostPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where('id IS NOT NULL')
    end
  end

  def create?
    record.team.profile_id == user.profile_id
  end

  def permitted_attributes(action)
    if action == 'create'
      [:trade_deadline_id, :team_id, :body]
    end
  end
end
