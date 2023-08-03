class LeagueYear < ActiveRecord::Base
  has_many :contract_years

  validates_presence_of :start_date, :end_date, :trade_deadline_date
  validates_presence_of :season_start_date, :season_end_date, :season_days
  validates_presence_of :upper_limit, :lower_limit, :bonus_cushion
  validates_presence_of :minimum_salary

  def previous
    @previous ||= LeagueYear.find(id.to_i - 1)
  end

  # returns day number (i.e., between 0 and ~185)
  def season_day_at(date)
    if date < season_start_date
      0
    elsif date > season_end_date
      season_days # TODO - off-by-one?
    else
      (date - season_start_date).to_i
    end
  end
end
