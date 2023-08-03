class TradeDeadlinePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where('trade_deadlines.created_at IS NOT NULL')
    end
  end

  def show?
    true
  end
end
