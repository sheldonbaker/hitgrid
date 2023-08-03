class TradeDeadlinesController < ApplicationController
  def index
    @deadlines = policy_scope(TradeDeadline)
    @deadlines = sort_scope(@deadlines) if params[:sort]

    @deadlines.includes!(:teams)
    render json: @deadlines
  end

  def show
    @deadline = TradeDeadline.find(params[:id])
    authorize @deadline

    render json: @deadline
  end
end
