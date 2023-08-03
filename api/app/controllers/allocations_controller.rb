class AllocationsController < ApplicationController
  def index
    @allocations = Allocation.universable.for_team(params.require(:team_id)).on_team_date(params.require(:team_id))
    @allocations = policy_scope(@allocations)

    @allocations.includes!(contract_year: { contract: [:player, :contract_years] })

    render json: @allocations, include: 'contract_year.contract.player'
  end
end
