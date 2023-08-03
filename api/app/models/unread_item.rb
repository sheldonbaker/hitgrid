class UnreadItem
  include ActiveModel::Model
  include ActiveModel::Serialization
  
  attr_reader :readable

  def initialize(readable)
    @readable = readable
  end

  def id
    [@readable.class.name.camelize, @readable.id].join('-')
  end

  def self.for_profile(profile)
    readables = [Trade, Proposal, Message].map { |klass|
      klass.with_read_marks_for(profile).unread_by(profile) 
    }.flatten
    
    readables.map { |r| self.new(r) }
  end
end
