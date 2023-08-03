class ChatPostsController < ApplicationController
  def index
    @posts = policy_scope(ChatPost)
    @posts.limit!(100)

    @posts.includes!(:team)
    @posts.where!(trade_deadline_id: params.require(:trade_deadline_id))

    render json: @posts, include: 'team'
  end

  def create
    @chat_post = ChatPost.new
    @chat_post.assign_attributes(permitted_attributes(@chat_post))

    authorize @chat_post
    
    if @chat_post.save
      render json: @chat_post, include: 'team', status: :created
    else
      render json: { errors: @chat_post.errors }, status: :unprocessable_entity
    end
  end
end
