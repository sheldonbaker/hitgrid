class Asset < ActiveRecord::Base
  include Universable

  belongs_to :assetable, polymorphic: true

  belongs_to :league_year

  belongs_to :assetable_player, class_name: 'Player'

  # validates_presence_of :league_year, :start_date, :end_date
  # validate :dates_in_league_year

  before_save :set_assetable_player

  def date_range
    start_date..end_date
  end

  def self.universable_clause
    "#{table_name}.assetable_type || #{table_name}.assetable_id"
  end

  private

  def dates_in_league_year
    league_year && league_year.date_range.include?(date_range)
  end

  private

  def set_assetable_player
    self.assetable_player = assetable.try(:player)
  end
end
