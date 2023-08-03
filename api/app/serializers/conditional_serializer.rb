class ConditionalSerializer < ApplicationSerializer
  attributes :condition
  has_many :draft_picks
end
