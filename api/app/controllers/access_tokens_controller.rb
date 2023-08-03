class AccessTokensController < ApplicationController
  def create
    authorize :access_token

    granter = AccessTokenGranter.new(permitted_attributes(:access_token))
    token = granter.execute

    if token
      response.set_cookie :access_token, value: token.encode, path: push_notification_receipts_path
      render json: token, status: :created
    else
      render json: granter.errors, status: :unprocessable_entity
    end
  end
end
