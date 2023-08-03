class PlayerPolicy < ApplicationPolicy
  def show?
    !token.nil?
  end
end