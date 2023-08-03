class LtirReliefPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where('ltir_reliefs.id IS NOT NULL')
    end
  end
end
