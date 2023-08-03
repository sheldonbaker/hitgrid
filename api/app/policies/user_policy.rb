class UserPolicy < ApplicationPolicy
  def show?
    token[:user_id] == record.id
  end

  def create?
    token.nil?
  end

  def update?
    record.id == token[:user_id]
  end

  def permitted_attributes(action)
    if action.to_sym == :create
      [:email, :password, :provider, :request_token, :request_token_verifier, :authorization_code, :redirect_uri, :subscribed_to_updates]
    else
      [:subscribed_to_updates]
    end
  end
end
