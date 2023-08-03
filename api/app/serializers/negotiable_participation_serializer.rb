class NegotiableParticipationSerializer < ApplicationSerializer
  attributes :initiating, :consenting

  has_one :negotiable
  has_one :team
  has_many :ingredients
end
