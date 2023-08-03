class EmailConfirmationVerifier
  include ActiveModel::Validations

  attr_reader :email_confirmation

  validate :ensure_token_verification_matches
  validate :ensure_user_email_matches

  def initialize(email_confirmation, token_verification)
    @email_confirmation = email_confirmation
    @token_verification = token_verification
  end

  def execute
    if valid?
      @email_confirmation.user.confirm!
      @email_confirmation
    end
  end

  private

  def ensure_token_verification_matches
    unless @email_confirmation.compare_token(@token_verification)
      errors.add(:token_verification)
      false
    end
  end

  def ensure_user_email_matches
    unless @email_confirmation.user_email == @email_confirmation.user.email
      errors.add(:user_email)
      false
    end
  end
end