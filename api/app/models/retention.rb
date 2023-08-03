class Retention < ActiveRecord::Base
  include Universable

  belongs_to :contract
  has_many :retention_years

  validates_presence_of :contract, :absolute_pct

  def self.obligatable_clause
    "contract_id"
  end
end
