class NegotiableIngredientSerializer < ApplicationSerializer
  naive_belongs_to :participation
  
  belongs_to :assetable
  belongs_to :provisionable

  belongs_to :allocation
end
