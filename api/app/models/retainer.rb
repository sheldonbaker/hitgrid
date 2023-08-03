class Retainer < ActiveRecord::Base
  include Provisionable

  # EVENTUALLY: max should be <= 25% if player has been retained once already
  validates :absolute_pct, numericality: { greater_than: 0, less_than_or_equal_to: 50 }
end
