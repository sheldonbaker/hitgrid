class CalculationsController < ApplicationController
  def index
    if params[:trade_deadline_id]
      td = TradeDeadline.find(params[:trade_deadline_id])
      @calculations = Calculation.universable.for_universe(td.universe.id).on_date(td.universe.date).latest_by_team
    elsif !params[:team_id]
      @calculations = Calculation.universable.for_universe(params.require(:universe_id)).on_date(params.require(:date)).latest_by_team
    else
      team = Team.find(params[:team_id])
      @calculations = Calculation.universable.for_universe(team.universe_id).on_team_date(team.id).where(club: team.club)
      # NOTE: not using latest_by_team here
      # (only for previous two as faux pagination)
    end

    @calculations = policy_scope(@calculations)
    @calculations.includes!({ team: :profile })

    @calculations.where!(club_id: params[:club_id]) if params[:club_id]
    @calculations = sort_scope(@calculations, { 'club.id' => 'clubs.id' }) if params[:sort]

    render json: @calculations, include: 'team,team.profile'
  end
end
