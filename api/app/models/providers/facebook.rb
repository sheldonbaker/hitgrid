class Providers::Facebook
  def initialize(credentials)
    @credentials = credentials
  end

  def identity
    graph = Koala::Facebook::API.new(access_token)
    profile = graph.get_object('me')
    picture = graph.get_picture(profile['id'])

    HashWithIndifferentAccess.new(profile.merge(picture: picture))
  end

  private

  def access_token
    http = Net::HTTP.new "graph.facebook.com", 443
    url = "/oauth/access_token?client_id=#{client_id}&client_secret=#{client_secret}&redirect_uri=#{redirect_uri}&code=#{authorization_code}"
    request = Net::HTTP::Get.new(url)
    http.use_ssl = true
    response = http.request(request)
    CGI.parse(response.body)['access_token'][0]
  end

  def authorization_code
    @credentials[:authorization_code]
  end

  def redirect_uri
    @credentials[:redirect_uri]
  end

  def client_id
    ENV['FACEBOOK_CLIENT_ID']
  end

  def client_secret
    ENV['FACEBOOK_CLIENT_SECRET']
  end
end