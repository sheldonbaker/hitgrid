class TeamClaimsController < ApplicationController
  def create
    @claim = TeamClaim.new
    authorize @claim

    @claim.assign_attributes(permitted_attributes(@claim).merge(profile: current_profile))

    if @claim.save
      render json: @claim, include: 'team', status: :ok
    else
      render json: format_errors(@claim), status: :unprocessable_entity
    end
  end
end
