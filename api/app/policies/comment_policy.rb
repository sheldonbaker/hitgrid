class CommentPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where('comments.created_at IS NOT NULL')
    end
  end

  def create?
    true # TODO
  end

  def permitted_attributes(action)
    [:body, :commentable_type, :commentable_id]
  end
end
