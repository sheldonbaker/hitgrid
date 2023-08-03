class NotificationSubscriptionsController < ApplicationController
  def index
    @subscriptions = policy_scope(NotificationSubscription)
    @subscriptions.includes(:registerable)

    render json: @subscriptions, include: 'registerable'
  end

  def create
    @subscription = NotificationSubscription.new(user_id: current_token[:user_id])
    authorize @subscription

    @subscription.assign_attributes(permitted_attributes(@subscription, { polymorphic: [:registerable] }))

    if @subscription.save
      render json: @subscription, status: :created
    else
      render json: { errors: @subscription.errors }, status: :unprocessable_entity
    end
  end

  def update
    @subscription = NotificationSubscription.find(params[:id])
    authorize @subscription

    if @subscription.update_attributes(permitted_attributes(@subscription, { polymorphic: [:registerable] }))
      render json: @subscription, status: :ok
    else
      render json: { errors: @subscription.errors }, status: :unprocessable_entity
    end
  end
end
