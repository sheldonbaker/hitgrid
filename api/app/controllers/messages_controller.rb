class MessagesController < ApplicationController
  def index
    @messages = policy_scope(Message)
    @messages = @messages.with_read_marks_for(current_profile) if current_profile

    @messages.where!('messages.sender_id = ?', params[:sender_id]) if params[:sender_id]
    @messages.where!('messages.receiver_id = ?', params[:receiver_id]) if params[:receiver_id]
    @messages.where!('messages.sender_id = ? OR messages.receiver_id = ?', params[:team_id], params[:team_id]) if params[:team_id]
    @messages.where!(proposal_id: params[:proposal_id]) if params[:proposal_id]

    @messages.includes!(:sender, :receiver)

    render json: @messages, include: 'sender,receiver'
  end

  def create
    @message = Message.new
    @message.assign_attributes(permitted_attributes(@message))

    authorize @message
    
    if @message.save
      render json: @message, status: :created
    else
      render json: { errors: @message.errors }, status: :unprocessable_entity
    end
  end

  def update
    @message = Message.find(params[:id])
    authorize @message

    unread = permitted_attributes(@message).delete(:unread)

    if unread == false
      @message.mark_as_read!(for: current_profile)

      render json: @message, status: :ok
    else
      render json: { errors: @message.errors }, status: :unprocessable_entity
    end
  end
end
