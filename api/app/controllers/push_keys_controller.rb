class PushKeysController < ApplicationController
  def create
    push_key = PushKey.new(permitted_attributes(:push_key)) 
    authorize push_key

    if push_key.authenticate
      render json: push_key, status: :ok
    else
      head :unauthorized
    end
  end
end
