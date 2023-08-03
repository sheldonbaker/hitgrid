class CommentsController < ApplicationController
  def index
    @comments = policy_scope(Comment)
    @comments.limit(100)

    @comments.where!(commentable_type: 'Trade', commentable_id: params[:trade_id]) if params[:trade_id]
    @comments.where!(commentable_type: 'Proposal', commentable_id: params[:proposal_id]) if params[:proposal_id]
    @comments.where!(commentable_type: 'TradeDeadline', commentable_id: params[:trade_deadline_id]) if params[:trade_deadline_id]

    @comments.limit!(100)
    render json: @comments, include: 'profile,team'
  end

  def create
    @comment = Comment.new
    @comment.assign_attributes(permitted_attributes(@comment, polymorphic: [:commentable]).merge(profile: current_user.profile))

    authorize @comment
    
    if @comment.save
      render json: @comment, include: 'profile.team', status: :created
    else
      render json: { errors: @comment.errors }, status: :unprocessable_entity
    end
  end
end
