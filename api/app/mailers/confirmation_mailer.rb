class ConfirmationMailer < ActionMailer::Base
  default from: ENV['MAILER_FROM']

  def challenge(confirmation_id, confirmation_token)
    confirmation = EmailConfirmation.find(confirmation_id)

    @profile_handle = confirmation.user.profile.handle
    @confirmation_verification_url = ENV['WEB_URI'] + "/confirm/#{confirmation.id}/#{confirmation_token}"

    mail to: confirmation.user.email
  end
end