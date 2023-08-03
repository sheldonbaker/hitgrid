class DraftPick < ActiveRecord::Base
  belongs_to :club
  belongs_to :league_year
end
