class NewsItemPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where('id IS NOT NULL')
    end
  end
end
