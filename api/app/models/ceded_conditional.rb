class CededConditional < ActiveRecord::Base
  belongs_to :universe
  belongs_to :club
  belongs_to :conditional

  validates_presence_of :universe, :club, :start_date
  validates_presence_of :conditional

  def draft_picks
    conditional.draft_picks
  end
end
