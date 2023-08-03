class TeamsController < ApplicationController
  def index
    @teams = policy_scope(Team)
    @teams.includes!(:profile)

    @teams.where!(universe_id: params[:universe_id]) if params[:universe_id]
    @teams.where!(trade_deadline_id: params[:trade_deadline_id]) if params[:trade_deadline_id]
    @teams.where!(profile_id: params[:profile_id]) if params[:profile_id]
    @teams.joins!(:club).where!('clubs.abbr = ?', params[:club_abbr]) if params[:club_abbr]

    render json: @teams, include: 'profile'
  end

  def show
    @team = Team.find(params[:id])
    authorize @team

    render json: @team, include: 'profile'
  end
end
