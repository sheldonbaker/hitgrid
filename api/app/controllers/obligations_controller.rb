class ObligationsController < ApplicationController
  skip_after_action :verify_policy_scoped

  def index
    @obligations = Obligation.for_team(params.require(:team_id))
    render json: @obligations, include: includes
  end

  private

  def includes
    [
      'obligatable.contract_year.contract.player',
      'obligatable.retention.contract.player',
      'obligatable.buyout.contract.player',
      'obligatable.recapture_penalty.contract.player',
      'obligatable.settlement.contract.player'
    ]
  end
end
