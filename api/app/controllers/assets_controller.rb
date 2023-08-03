class AssetsController < ApplicationController
  def index
    @assets = policy_scope(Asset)
    @assets = @assets.universable

    if params[:team_id]
      @assets = @assets.for_team(params[:team_id]).on_team_date(params[:team_id])
    end

    @assets.includes!(:club, assetable: [:contract_years, :player])

    @assets.where!(universe_id: params[:universe_id]) if params[:universe_id]
    @assets.where!(assetable_type: params[:assetable_type]) if params[:assetable_type]
    @assets.where!('assets.start_date <= ? AND assets.end_date >= ?', Date.parse(params[:date]), Date.parse(params[:date])) if params[:date]
    @assets.where!(assetable_player_id: params[:assetable_player_id]) if params[:assetable_player_id]

    if params[:sort]
      @assets.joins!(:assetable_player, :club)
      @assets = sort_scope(@assets)
    end

    # SMALLTODO
    if !params[:team_id]
      @assets = @assets.page(params[:page].try(:[], :number))
    end

    render json: @assets, include: 'assetable,assetable.player,assetable.contract_years,assetable.draft_picks'
  end
end
