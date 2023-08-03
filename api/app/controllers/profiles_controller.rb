class ProfilesController < ApplicationController
  def show
    @profile = Profile.find_by_id_or_handle(params[:id])
    authorize @profile

    render json: @profile
  end

  def update
    @profile = Profile.find(params[:id])
    authorize @profile

    if @profile.update_attributes(permitted_attributes(@profile))
      render json: @profile, status: :ok
    else
      render json: format_errors(@profile), status: :unprocessable_entity
    end
  end
end
