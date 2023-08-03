class Universe < ActiveRecord::Base
  belongs_to :trade_deadline
  belongs_to :league_year

  has_many :teams
end
