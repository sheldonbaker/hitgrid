class TeamSerializer < ApplicationSerializer
  attributes :id
  attribute :claimed?, key: :claimed

  attributes :date
  naive_belongs_to :league_year

  naive_belongs_to :club
  belongs_to :profile
  naive_belongs_to :trade_deadline

  has_many :calculations do
    link :related do href routes.calculations_url(team_id: object.id, only_path: true) end
    include_data false
  end

  has_many :assets do
    link :related do href routes.assets_url(team_id: object.id, only_path: true) end
    include_data false
  end

  has_many :allocations do
    link :related do href routes.allocations_url(team_id: object.id, only_path: true) end
    include_data false
  end

  has_many :obligations do
    link :related do href routes.obligations_url(team_id: object.id, only_path: true) end
    include_data false
  end

  has_many :reliefs do
    link :related do href routes.ltir_reliefs_url(team_id: object.id, only_path: true) end
    include_data false
  end

  has_many :sent_messages do
    link :related do href routes.messages_url(sender_id: object.id, only_path: true) end
    include_data false
  end

  has_many :received_messages do
    link :related do href routes.messages_url(receiver_id: object.id, only_path: true) end
    include_data false
  end
end
