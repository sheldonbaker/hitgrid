class ProposalsController < ApplicationController
  def index
    @proposals = policy_scope(Proposal)
    @proposals = @proposals.with_read_marks_for(current_profile) if current_profile

    @proposals = @proposals.for_team(params[:team_id]) if params[:team_id]
    
    includes = includes_for_proposals((params[:include].try(:split, ',') || []).map(&:to_sym))
    @proposals.includes!(includes)

    @proposals.order!('proposals.id DESC')
    @proposals.limit!(25)
    @proposals.where!('proposals.created_at <= ?', Time.zone.at(params[:created_by].to_i)) if params[:created_by]

    render json: @proposals, include: includes
  end

  def show
    @proposal = Proposal.find(params[:id])
    authorize @proposal

    render json: @proposal, include: includes_for_proposal
  end

  def create
    attrs = permitted_attributes(:proposal, polymorphic: [{ participations: [{ ingredients: [:assetable, :provisionable] }] }])
    factory = ProposalFactory.new(attrs, current_user.profile)

    authorize factory.proposal
  
    if factory.execute
      render json: factory.proposal, include: includes_for_proposal, status: :created
    else
      render json: { errors: factory.errors }, status: :unprocessable_entity
    end
  end

  def update
    @proposal = Proposal.find(params[:id])
    authorize @proposal

    unread = permitted_attributes(@proposal).delete(:unread)

    if unread == false
      @proposal.mark_as_read!(for: current_profile)
      
      render json: @proposal, status: :ok
    else
      render json: { errors: @proposal.errors }, status: :unprocessable_entity
    end
  end

  private

  def includes_for_proposals(requested)
    [
      participations: [
        { ingredients: [
          { assetable: [:contract_years, :player, :draft_picks] },
          { provisionable: [:draft_picks] },
          { allocation: { contract_year: { contract: [:player] } } }
        ]}
      ]
    ]
  end

  def includes_for_proposal
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
