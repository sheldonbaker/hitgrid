class SmsNotification
  def self.create!(attrs)
    Twilio::REST::Client.new.messages.create(attrs)
  end
end