class Allocation < ActiveRecord::Base
  include Universable
  include Obligatable

  before_save :compute_cap_hit

  belongs_to :contract_year

  validates_presence_of :contract_year
  validates_presence_of :start_date, :end_date

  def self.universable_clause
    "#{table_name}.contract_year_id"
  end

  def contract
    contract_year.contract
  end

  def on_soir
    on_ir && start_date == league_year.start_date
  end

  # I guess `retained_pct` should actually be `unretained_pct`...oh well
  def effective_retained_pct
    retained ? retained_pct : 0
  end

  private

  def compute_cap_hit
    cap_hit = if suspended
      0
    elsif loaned
      # TODO - second year or more - article 50.2 - ???
      if contract_year.contract.is_35_plus
        contract_year.avg_value - 100000
      elsif contract.is_one_way
        [contract_year.avg_value - (league_year.minimum_salary + 375000), 0].max
      elsif contract.is_two_way
        # performance bonuses on two-ways don't count in the minors *unless earned*
        # but we generally calculate bonuses as if they are all earned, so...
        # wtf?
        [contract_year.avg_value - contract_year.max_performance_bonuses - (league_year.minimum_salary + 375000), 0].max
      end
    elsif on_ir && start_date == league_year.season_start_date
      # TODO - when we have accrued_games stats
      # accrued_games = contract_year.contract.player.games_accrued_in_season(league_year.previous)

      # if contract_year.contract.is_one_way || accrued_games > 50
      #   contract_year.avg_value
      # elsif contract_year.contract.is_two_way && (1..49).include?(accrued_games)
      #   contract_year.avg_value * (accrued_games / league_year.previous.season_days)
      # elsif contract_year.contract.is_two_way && accrued_games == 0
      #   0
      # end

      contract_year.avg_value
    else
      contract_year.avg_value
    end

    if retained
      cap_hit = cap_hit * (retained_pct.to_f / 100)
    end

    self.cap_hit = cap_hit
  end
end
