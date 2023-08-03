class PushKeyPolicy < ApplicationPolicy
  def create?
    return true # TODOTODOTODO

    if matches = /trade\-deadline\-([0-9]+)\-team-([0-9]+)/.match(record.channel_name)
      trade_deadline_id = matches[1]
      team_id = matches[2]

      profile && Team.find_by_id(team_id).try(:profile) == profile
    else
      true
    end
  end

  def permitted_attributes(action)
    [:socket_id, :channel_name]
  end
end