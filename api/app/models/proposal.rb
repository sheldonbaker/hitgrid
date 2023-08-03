class Proposal < Negotiable
  acts_as_readable on: :updated_at

  belongs_to :counter, class_name: 'Proposal'
  belongs_to :countered, class_name: 'Proposal'
  belongs_to :trade

  has_many :messages

  scope :for_profile_id, -> (profile_id) {
    joins(participations: [:team]).where('teams.profile_id = ?', profile_id)
  }

  scope :participating_by, -> (team_ids) {
    joined_team_ids = team_ids.map(&:to_s).join(',')

    joins(:participations).
    group('proposals.id').
    having("ARRAY_AGG(negotiable_participations.team_id) = ARRAY[#{joined_team_ids}]")
  }
  
  def resolved?
    !consented.nil?
  end

  def resolvable?
    true
  end

  def pusher_channels
    participations.map(&:team_id).map do |team_id|
      "private-trade-deadline-#{trade_deadline_id}-team-#{team_id}"
    end
  end

  def pusher_includes
    [participations: [:team, { ingredients: [{ assetable: [:contract_years, :player, :draft_picks] }, { provisionable: [:draft_picks] }, :allocation] }]]
  end
end
