class TradesController < ApplicationController
  def index
    @trades = policy_scope(Trade)
    @trades.where!(trade_deadline_id: params[:trade_deadline_id]) if params[:trade_deadline_id]

    @trades.includes!(includes_for_trades)
    
    @trades.order!('trades.id DESC')
    @trades.limit!(25)
    @trades.where!('trades.created_at <= ?', Time.zone.at(params[:created_by].to_i)) if params[:created_by]

    render json: @trades, include: includes_for_trades
  end

  def show
    @trade = Trade.find(params[:id])
    authorize @trade

    render json: @trade, include: includes_for_trades
  end

  def update
    @trade = Trade.find(params[:id])
    authorize @trade

    unread = permitted_attributes(@trade).delete(:unread)

    if unread == false
      @trade.mark_as_read!(for: current_profile)

      render json: @trade, status: :ok
    else
      render json: { errors: @trade.errors }, status: :unprocessable_entity
    end
  end

  private

  def includes_for_trades
    [
      participations: [
        :team,
        
        { ingredients: [
          { assetable: [:contract_years, :player, :draft_picks] },
          { provisionable: [:draft_picks] },
          { allocation: { contract_year: { contract: [:player] } } }
        ]}
      ]
    ]
  end
end
