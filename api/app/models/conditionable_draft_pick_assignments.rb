class ConditionableDraftPickAssignment < ActiveRecord::Base
  belongs_to :conditionable, polymorphic: true
  belongs_to :draft_pick
end
