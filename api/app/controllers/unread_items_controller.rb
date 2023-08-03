class UnreadItemsController < ApplicationController
  def index
    @unreads = policy_scope(UnreadItem)

    render json: @unreads, include: 'readable'
  end
end
