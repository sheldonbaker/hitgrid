class AccessTokenGranter
  include Virtus.model
  include ActiveModel::Validations

  attribute :user_email
  attribute :user_password

  attribute :user_id
  attribute :user_secret

  attribute :provider
  attribute :request_token
  attribute :request_token_verifier
  attribute :authorization_code
  attribute :redirect_uri

  attribute :access_token

  validate :credentials_exist

  def execute
    if valid?
      if !user_email.blank?
        user = User.find_by_email(user_email)

        if user && user.authenticate(user_password)
          AccessToken.new({ user: user })
        else
          errors.add(:base, 'No such email/password combination')
          false
        end
      elsif user_id
        user = User.find(user_id)

        if user && user.authenticate_with_secret(user_secret)
          AccessToken.new({ user: user })
        else
          errors.add(:base, 'No such id/secret combination')
          false
        end
      elsif provider
        profile = Identity.find(provider, attributes.slice(:authorization_code, :redirect_uri, :request_token, :request_token_verifier))
        
        if profile && user = User.find_by_identity(provider, profile[:id])
          AccessToken.new({ user: user })
        else
          errors.add(:base, 'No such user exists')
          false
        end
      elsif access_token
        # TODO
      end
    end
  end

  private

  def credentials_exist
    unless (user_email && user_password) || (user_id && user_secret) || (provider) || (access_token)
      errors.add(:base, 'Credentials must be supplied')
    end
  end
end