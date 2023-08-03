class UserSerializer < ApplicationSerializer
  attributes :id, :email, :secret, :twitter_id, :facebook_id, :claimed

  has_one :profile
end
