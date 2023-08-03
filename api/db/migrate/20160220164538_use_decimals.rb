class UseDecimals < ActiveRecord::Migration
  def change
    change_table :allocations do |t|
      t.change :retained_pct, :decimal, precision: 4, scale: 2
      t.change :cap_hit, :decimal, precision: 10, scale: 2
      t.change :cap_cost, :decimal, precision: 12, scale: 4
    end

    change_column :bonus_overages, :cap_cost, :decimal, precision: 12, scale: 4
    change_column :buyout_years, :cap_cost, :decimal, precision: 12, scale: 4
  
    change_table :calculations do |t|
      t.change :cap_space, :decimal, precision: 10, scale: 2
      t.change :cap_usage, :decimal, precision: 10, scale: 2
      t.change :ltir_relief, :decimal, precision: 10, scale: 2
      t.change :bonus_cushion_usage, :decimal, precision: 10, scale: 2
      t.change :absorbable_cap_hit, :decimal, precision: 11, scale: 2

      t.change :trade_deadline_cap_space, :decimal, precision: 10, scale: 2
      t.change :trade_deadline_cap_usage, :decimal, precision: 10, scale: 2
      t.change :trade_deadline_ltir_relief, :decimal, precision: 10, scale: 2
      t.change :trade_deadline_bonus_cushion_usage, :decimal, precision: 10, scale: 2
      t.change :trade_deadline_absorbable_cap_hit, :decimal, precision: 11, scale: 2

      t.change :season_end_cap_space, :decimal, precision: 10, scale: 2
      t.change :season_end_cap_usage, :decimal, precision: 10, scale: 2
      t.change :season_end_ltir_relief, :decimal, precision: 10, scale: 2
      t.change :season_end_bonus_cushion_usage, :decimal, precision: 10, scale: 2
    end

    change_table :contract_years do |t|
      t.change :max_performance_bonuses, :decimal, precision: 10, scale: 2
      t.change :signing_bonus, :decimal, precision: 10, scale: 2
      t.change :minor_salary, :decimal, precision: 10, scale: 2
      t.change :nhl_salary, :decimal, precision: 10, scale: 2
      t.change :avg_value, :decimal, precision: 10, scale: 2
    end

    change_table :contracts do |t|
      t.change :value, :decimal, precision: 10, scale: 2
      t.change :avg_performance_bonuses, :decimal, precision: 10, scale: 2
    end

    change_column :recapture_penalty_years, :cap_cost, :decimal, precision: 12, scale: 4

    change_column :retainers, :absolute_pct, :decimal, precision: 4, scale: 2
    change_column :retentions, :absolute_pct, :decimal, precision: 4, scale: 2

    change_column :retention_years, :cap_hit, :decimal, precision: 10, scale: 2
    change_column :retention_years, :cap_cost, :decimal, precision: 12, scale: 4

    change_column :settlement_years, :cap_cost, :decimal, precision: 12, scale: 4

    change_column :trades, :compensation_involved, :decimal, precision: 12, scale: 2
  end
end
