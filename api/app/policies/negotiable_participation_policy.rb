class NegotiableParticipationPolicy < ApplicationPolicy
  def update?
    record.team.profile_id == profile.id
  end

  def permitted_attributes(action)
    [:consenting]
  end
end
