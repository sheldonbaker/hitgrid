class Club < ActiveRecord::Base
  validates_presence_of :abbr, :geographic_name, :distinctive_name
  validates_presence_of :conference, :division

  def seatgeek_slug
    [geographic_name, distinctive_name].map(&:downcase).join('-')
  end
end
