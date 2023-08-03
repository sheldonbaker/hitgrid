class EmailConfirmationsController < ApplicationController
  def create
    @confirmation = EmailConfirmation.new(user: current_user)
    authorize @confirmation

    if @confirmation.save
      render json: @confirmation, status: :created
    else
      render json: @confirmation.errors, status: :unprocessable_entity
    end
  end

  def update
    verifier = EmailConfirmationVerifier.new(EmailConfirmation.find(parsed_params[:id]), parsed_params[:token_verification])
    authorize verifier.email_confirmation

    if verifier.execute
      render json: verifier.email_confirmation, status: :ok
    else
      render json: verifier.errors, status: :unprocessable_entity
    end
  end
end
