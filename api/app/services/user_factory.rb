class UserFactory
  include Virtus.model

  attr_reader :user

  attribute :email
  attribute :password

  attribute :provider
  attribute :request_token
  attribute :request_token_verifier
  attribute :authorization_code
  attribute :redirect_uri

  attribute :subscribed_to_updates

  def initialize(attributes = {})
    super(attributes)

    @user = User.new
    @user.build_profile
  end

  def execute
    if provider
      identity = Identity.find(provider, attributes.slice(:request_token, :request_token_verifier, :authorization_code, :redirect_uri))
      consume_identity(provider, identity)
    else
      user.assign_attributes(attributes.slice(:email, :password, :subscribed_to_updates))
      user.profile.consider_handle(email.split('@').first)
      user.email_confirmations.build
    end

    begin
      ActiveRecord::Base.transaction do
        user.save!
        user.profile.save!
      end

      true
    rescue
      false
    end
  end

  def errors
    user.errors
  end

  private

  def consume_identity(provider, identity)
    if provider == 'twitter'
      user.twitter_id = identity[:id]
      user.profile.consider_handle(identity[:screen_name])
    elsif provider == 'facebook'
      user.facebook_id = identity[:id]
      user.profile.consider_identity_picture(identity[:picture])
    end
  end
end