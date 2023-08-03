class AccessTokenPolicy < ApplicationPolicy
  def create?
    token.try(:[], :user_id).nil?
  end

  def permitted_attributes(action)
    [:user_id, :user_secret, :user_email, :user_password, :provider, :request_token, :request_token_verifier, :authorization_code, :redirect_uri, :access_token]
  end
end
