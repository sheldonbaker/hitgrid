class RetentionYear < ActiveRecord::Base
  before_save :compute_cap_hit

  include Obligatable

  belongs_to :retention
  belongs_to :contract_year

  validates_presence_of :retention, :contract_year

  private

  def compute_cap_hit
    self.cap_hit = contract_year.avg_value * (retention.absolute_pct.to_f / 100)
  end
end
