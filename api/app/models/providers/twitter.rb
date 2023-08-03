class Providers::Twitter
  def initialize(credentials)
    @credentials = credentials
  end

  def identity
    handler = access_token(@credentials[:request_token], @credentials[:request_token_verifier])
    response = handler.request(:get, "https://api.twitter.com/1.1/account/verify_credentials.json")
    identity = JSON.parse(response.body)

    if response.code == '200'
      HashWithIndifferentAccess.new(identity)
    else
      nil
    end
  end

  private

  def access_token(token, token_secret)
    @access_token ||= OAuth::AccessToken.from_hash(consumer, { oauth_token: token, oauth_token_secret: token_secret })
  end

  def consumer
    @consumer ||= OAuth::Consumer.new(ENV['TWITTER_CONSUMER_KEY'], ENV['TWITTER_CONSUMER_SECRET'], { site: 'https://api.twitter.com', scheme: :header })
  end
end