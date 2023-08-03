class LtirReliefSerializer < ApplicationSerializer
  attributes :start_date, :end_date, :start_season_day, :end_season_day
  belongs_to :contract_year
end
