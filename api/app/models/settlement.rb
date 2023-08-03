class Settlement < ActiveRecord::Base
  include Universable

  belongs_to :contract
  has_many :settlement_years

  validates_presence_of :contract

  def self.obligatable_clause
    "contract_id"
  end
end
