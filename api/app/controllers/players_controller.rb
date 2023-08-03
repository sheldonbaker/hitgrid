class PlayersController < ApplicationController
  def show
    @player = Player.find(params[:id])
    authorize @player

    render json: @player
  end
end
