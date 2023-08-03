class Contingency < ActiveRecord::Base
  has_and_belongs_to_many :draft_picks

  # HACK
  # `accepts_nested_attributes_for :draft_picks` raises RecordNotFound?
  # implementing replacement here
  def draft_picks_attributes=(attrs_ary)
    attrs_ary.each do |attrs|
      draft_picks.push(DraftPick.find(attrs[:id]) || attrs['id'])
    end
  end
end
