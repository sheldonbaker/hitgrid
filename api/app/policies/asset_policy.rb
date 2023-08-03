class AssetPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      Asset.where('assets.id IS NOT NULL')
    end
  end
end
