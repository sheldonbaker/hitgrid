class PushRegistrationsController < ApplicationController
  def create
    @registration = PushRegistration.new(user_id: current_token[:user_id])
    authorize @registration

    @registration.assign_attributes(permitted_attributes(@registration))

    if @registration.save
      render json: @registration, status: :created
    else
      render json: { errors: @registration.errors }, status: :unprocessable_entity
    end
  end

  def update
    @registration = PushRegistration.find(params[:id])
    authorize @registration

    if @registration.update_attributes(permitted_attributes(@registration))
      render json: @registration, status: :ok
    else
      render json: { errors: @registration.errors }, status: :unprocessable_entity
    end
  end
end
