class BlogPostPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where('blog_posts.created_at IS NOT NULL')
    end
  end
end
