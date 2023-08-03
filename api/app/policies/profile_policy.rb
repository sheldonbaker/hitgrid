class ProfilePolicy < ApplicationPolicy
  def show?
    record.published? || record.user.try(:id) == token[:user_id]
  end

  def update?
    record.user.try(:id) == token[:user_id]
  end

  def permitted_attributes(action)
    [:handle, :favourite_club_id, :raw_picture_id]
  end
end