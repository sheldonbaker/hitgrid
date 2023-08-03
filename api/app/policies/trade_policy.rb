class TradePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where('trades.created_at IS NOT NULL')
    end
  end

  def show?
    true
  end

  def update?
    true
  end

  def permitted_attributes(action)
    if action == 'update'
      [:unread]
    end
  end
end
