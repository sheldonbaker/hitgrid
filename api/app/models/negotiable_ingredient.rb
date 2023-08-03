class NegotiableIngredient < ActiveRecord::Base
  belongs_to :participation, class_name: 'NegotiableParticipation', foreign_key: :negotiable_participation_id
  
  belongs_to :assetable, polymorphic: true
  accepts_nested_attributes_for :assetable

  belongs_to :provisionable, polymorphic: true
  accepts_nested_attributes_for :provisionable
  
  # refers to the allocation that the (Contract) assetable's ContractYear
  # was at the time of the proposal/trade
  belongs_to :allocation

  # http://stackoverflow.com/questions/3969025/accepts-nested-attributes-for-with-belongs-to-polymorphic
  def assetable_attributes=(attrs)
    self.assetable = attrs[:type].classify.constantize.find(attrs[:id])
  end

  def build_provisionable(attrs)
    self.provisionable = attrs[:type].classify.constantize.new(attrs.except(:type))
  end
end
