class TeamClaim
  include ActiveModel::Model
  include ActiveModel::Serialization

  attr_reader :profile
  
  validates_presence_of :profile, :team
  validate :team_must_be_claimable
  validate :profile_cannot_claim_multiple

  def initialize(attrs = {})
    assign_attributes(attrs)
  end

  def assign_attributes(attrs = {})
    @profile = attrs[:profile]
    @team_id = attrs[:team_id]
  end

  def team
    @team ||= Team.find(@team_id)
  end

  def id
    SecureRandom.uuid
  end

  def save
    if valid?
      begin
        ActiveRecord::Base.transaction do
          team.update_attributes! profile: @profile
          team.trade_deadline.update_attributes! claimed_teams_count: team.trade_deadline.teams.claimed.count
        end

        true
      rescue
        false
      end
    end
  end

  private

  def team_must_be_claimable
    unless team.claimable?
      errors.add(:team_id, "is already claimed")
      false
    end
  end

  def profile_cannot_claim_multiple
    if team.trade_deadline.teams.where(profile_id: @profile.id).count > 0
      errors.add(:profile_id, "has already claimed a team for this trade deadline")
      false
    end
  end
end