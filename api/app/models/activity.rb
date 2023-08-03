class Activity < ActiveRecord::Base
  validates_presence_of :key
  belongs_to :trade_deadline
end
