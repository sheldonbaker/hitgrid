class RetentionYearSerializer < ApplicationSerializer
  has_one :retention
  
  naive_belongs_to :league_year
  attributes :cap_cost, :start_date, :end_date
end
