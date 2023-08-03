class NegotiableParticipationsController < ApplicationController
  def update
    @participation = NegotiableParticipation.find(params[:id])
    authorize @participation

    if @participation.update_attributes(permitted_attributes(@participation))
      render json: @participation, include: 'negotiable', status: :ok
    else
      render json: { errors: @participation.errors }, status: :unprocessable_entity
    end
  end
end
