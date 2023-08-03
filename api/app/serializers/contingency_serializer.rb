class ContingencySerializer < ApplicationSerializer
  attributes :condition
  has_many :draft_picks
end
