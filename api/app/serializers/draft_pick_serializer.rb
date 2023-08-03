class DraftPickSerializer < ApplicationSerializer
  attributes :round
  naive_belongs_to :club
  naive_belongs_to :league_year
end
