class Contract < ActiveRecord::Base
  belongs_to :player
  has_many :contract_years, dependent: :destroy

  has_many :negotiable_assetables, as: :assetable

  validates_presence_of :player

  def is_one_way
    !is_two_way
  end

  def avg_value
    raise 'NotImplemented'
  end

  def contract_year_for(league_year_id)
    contract_years.find { |cy| cy.league_year_id == league_year_id }
  end
end
