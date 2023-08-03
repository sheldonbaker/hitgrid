class ProposalPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.for_profile_id(User.find(token[:user_id]).profile_id)
    end
  end

  def show?
    true # TODO
  end

  def create?
    profile.has_claimed_team?(record.trade_deadline_id) && (profile.teams & record.participations.map(&:team)).count
  end

  def update?
    record.participations.any? { |p| p.team.profile_id == user.profile_id }
  end

  def permitted_attributes(action)
    if action == 'update'
      [:unread]
    elsif action == 'create'
      [
        :trade_deadline_id, :countered_id,
        messages_attributes: [:body],
        participations_attributes: [
          :team_id, ingredients_attributes: [
            assetable_attributes: [
              :type, :id
            ],
            provisionable_attributes: [
              :type, :absolute_pct, :condition, draft_pick_ids: []
            ]
          ]
        ]
      ]
    end
  end
end