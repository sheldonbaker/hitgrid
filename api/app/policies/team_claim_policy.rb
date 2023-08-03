class TeamClaimPolicy < ApplicationPolicy
  def create?
    !token.nil?
  end

  def permitted_attributes(action)
    [:team_id]
  end
end