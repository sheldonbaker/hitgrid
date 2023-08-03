class NoticesController < ApplicationController
  def create
    @notice = Notice.best(current_user.try(:profile), request.remote_ip)
    authorize @notice

    if @notice
      render json: @notice, status: :created
    else
      head :not_found
    end
  end
end
