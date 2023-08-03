class EmailConfirmation < ActiveRecord::Base
  belongs_to :user

  before_create :set_token
  before_create :set_user_email
  after_create :send_challenge

  validates :user, presence: true
  validate :user_must_not_be_confirmed
  validate :user_must_have_email

  def compare_token(value)
    bcrypt = ::BCrypt::Password.new(self.hashed_token)
    value = ::BCrypt::Engine.hash_secret("#{value}#{self.class.token_pepper}", bcrypt.salt)
    
    ActiveSupport::SecurityUtils.secure_compare(value, hashed_token)
  end

  private

  def self.generate_token
    loop do
      token = SecureRandom.hex
      hashed_token = hash_token(token)

      break token unless self.where(hashed_token: hashed_token).first
    end
  end

  def self.hash_token(value)
    ::BCrypt::Password.create("#{value}#{self.token_pepper}", :cost => token_cost).to_s
  end

  private

  def user_must_have_email
    unless user.email
      errors.add(:user, "User has no email")
      false
    end
  end

  def user_must_not_be_confirmed
    if user.confirmed?
      errors.add(:user, "User is already confirmed")
      false
    end
  end

  def set_token
    @token = self.class.generate_token
    self.hashed_token = self.class.hash_token(@token)
  end

  def set_user_email
    self.user_email = user.email
  end

  def send_challenge
    ConfirmationMailer.challenge(id, @token).deliver_later
  end

  private

  def self.token_pepper
    ENV['EMAIL_CONFIRMATION_TOKEN_PEPPER']
  end

  def self.token_cost
    Rails.env.test? ? 1 : 10
  end
end
