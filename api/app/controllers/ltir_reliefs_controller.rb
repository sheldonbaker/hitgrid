class LtirReliefsController < ApplicationController
  def index
    @reliefs = LtirRelief.universable
    @reliefs = policy_scope(@reliefs)

    @reliefs = @reliefs.for_team(params.require(:team_id))
    @reliefs.includes!(contract_year: { contract: [:player] })

    render json: @reliefs, include: 'contract_year.contract.player'
  end
end
