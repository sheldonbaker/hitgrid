class PushKey
  include ActiveModel::Model
  include ActiveModel::Serialization

  attr_reader :channel_name, :socket_id
  attr_reader :auth

  def initialize(attrs = {})
    @channel_name = attrs[:channel_name]
    @socket_id = attrs[:socket_id]
  end

  def id
    @id ||= SecureRandom.uuid
  end

  def authenticate
    @auth ||= Pusher[@channel_name].authenticate(@socket_id)
  end
end
