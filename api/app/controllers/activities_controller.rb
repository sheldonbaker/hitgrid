class ActivitiesController < ApplicationController
  def index
    @activities = policy_scope(Activity)
    
    @activities.where!(featured: params[:featured]) if params[:featured]
    @activities.where!(trade_deadline_id: params[:trade_deadline_id]) if params[:trade_deadline_id]
    @activities.limit!(params[:limit]) if params[:limit]

    render json: @activities
  end
end
