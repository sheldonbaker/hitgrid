class MessagePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.for_profile_id(user.profile_id)
    end
  end

  def create?
    record.sender.profile.id == user.profile_id
  end

  def update?
    record.receiver.profile.id == user.profile_id
  end

  def permitted_attributes(action)
    if action == 'create'
      [:sender_id, :receiver_id, :body, :proposal_id]
    elsif action == 'update'
      [:unread]
    end
  end
end
