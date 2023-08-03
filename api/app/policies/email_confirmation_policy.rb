class EmailConfirmationPolicy < ApplicationPolicy
  def create?
    !token.nil?
  end

  def update?
    true
  end
end
