class Notice
  include ActiveModel::Model
  include ActiveModel::Serialization

  attr_reader :event

  def id
    SecureRandom.uuid
  end

  def initialize(event)
    @event = event
  end

  def self.best(profile, ip)
    self.new(SeatGeek.new(ip, profile.favourite_club).best_event)
  end
end