class SmsRegistration < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :user, :phone_number

  validates_plausible_phone :phone_number
  phony_normalize :phone_number, default_country_code: 'US'

  before_save :init_verification
  before_save :record_verification
  after_save :send_challenge

  def enabled
    !verified_at.nil?
  end

  def self.send_notification(body)
    SmsNotification.create!({
      from: ENV['SMS_NOTIFICATIONS_FROM'],
      to: phone_number,
      body: body
    })
  end

  private

  def init_verification
    if phone_number_changed? && !phone_number.nil?
      self.verifiable_at = Time.zone.now
      self.verified_at = nil
      self.verification_code = sprintf('%04d', SecureRandom.random_number(9999))
    end
  end

  def record_verification
    if verification_code && verification_code == verification_code_was
      self.verified_at = Time.zone.now
      self.verification_code = nil
    end
  end

  def send_challenge
    if verification_code_changed? && !verification_code.nil?
      client = Twilio::REST::Client.new
      client.messages.create(
        from: ENV['SMS_NOTIFICATIONS_FROM'],
        to: phone_number,
        body: "#{verification_code} is your verification code"
      )
    end
  end
end
