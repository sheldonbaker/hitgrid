class PushNotificationReceiptsController < ApplicationController
  def create
    @receipt = PushNotificationReceipt.new
    authorize @receipt
    
    @receipt.assign_attributes(permitted_attributes(@receipt))

    if @receipt.save
      render json: @receipt, include: 'push_notification', status: :created
    else
      render json: { errors: @receipt.errors }, status: :unprocessable_entity
    end
  end
end
