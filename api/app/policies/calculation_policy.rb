class CalculationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end
end
