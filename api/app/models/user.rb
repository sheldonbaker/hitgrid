class User < ActiveRecord::Base
  has_secure_password validations: false

  belongs_to :profile
  has_many :email_confirmations
  has_many :notification_subscriptions

  before_create :set_secret
  before_save :set_confirmed

  validates :email, format: /@/, uniqueness: true, allow_blank: true
  validates :password, length: { minimum: 5 }, allow_blank: true
  validates_presence_of :password, if: :email?

  validates :twitter_id, uniqueness: true, allow_blank: true
  validates :facebook_id, uniqueness: true, allow_blank: true

  validate :must_have_email_or_identity

  def claimed
    !!((email && password_digest) || twitter_id || facebook_id)
  end

  def self.find_by_identity(provider, id)
    where = {}
    where[provider + '_id'] = id

    self.where(where).first
  end

  def confirm!
    update_attributes(confirmed: true)
  end

  def authenticate_with_secret(secret)
    if self.secret && self.secret == secret
      self.update_attributes secret: generate_secret
      true
    end
  end

  private

  def must_have_email_or_identity
    if email.blank? && twitter_id.blank? && facebook_id.blank?
      errors.add(:base, "Must have an identity")
    end
  end

  def set_secret
    self.secret = generate_secret
  end

  def generate_secret
    SecureRandom.hex
  end

  def set_confirmed
    if has_identity?
      self.confirmed = true
    end
  end

  def has_identity?
    !twitter_id.nil? || !facebook_id.nil?
  end
end
