class Buyout < ActiveRecord::Base
  belongs_to :contract
  has_many :buyout_years
end
