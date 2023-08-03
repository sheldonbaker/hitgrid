class Player < ActiveRecord::Base
  has_many :contracts

  def full_name=(full_name)
    super(full_name)
    
    parts = full_name.split(' ')

    self.first_name = parts[0]
    self.last_name = parts[1..-1].join(' ')
  end

  # TODOTODOTODO
  def games_accrued_in_season(season)
    35
  end
end
