class Right < ActiveRecord::Base
  belongs_to :universe
  
  belongs_to :team
  belongs_to :player
end
