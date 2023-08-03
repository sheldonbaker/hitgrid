import Ember from 'ember';
const { get, set, setProperties } = Ember;

export default Ember.Route.extend({
  updateContractIngredient(ingredient, participation, attrs) {
    var retainer = attrs.retainer;

    if (+get(retainer, 'absolutePct') <= 0) {
      retainer = null;
    }

    set(ingredient, 'provisionable', retainer);

    return ingredient;
  },

  updateDraftPickIngredient(ingredient, participation, attrs) {
    var ingredients = get(participation, 'ingredients');
    var index = ingredients.indexOf(ingredient);

    var conditionalIngredient = this.store.createRecord('negotiableIngredient', {
      provisionable: attrs.contingency
    });
    
    ingredients.insertAt(index, conditionalIngredient);
    ingredients.removeObject(ingredient);

    return conditionalIngredient;
  },

  updateContingencyIngredient(ingredient, participation, attrs) {
    set(ingredient, 'provisionable.condition', attrs.condition);

    get(ingredient, 'provisionable.draftPicks').clear();
    get(ingredient, 'provisionable.draftPicks').addObjects(attrs.draftPicks);

    return ingredient;
  },

  allocationForAssetable(assetable, allocations) {
    if (assetable.constructor.modelName === 'contract') {
      var assetableContractYear = get(assetable, 'contractYear2015'); // HACK

      return allocations.find((allocation) => {
        return get(allocation, 'contractYear') === assetableContractYear;
      });
    } else {
      return null;
    }
  },

  actions: {
    createProposal(proposal) {
      return proposal.save().then((proposal) => {
        this.replaceWith('trade-deadline.proposals.proposal', proposal.belongsTo('tradeDeadline').id(), get(proposal, 'id'));
      });
    },
    
    createIngredient(participation, assetable) {
      get(participation, 'ingredients').createRecord({ assetable: assetable, allocation: this.allocationForAssetable(assetable, get(participation, 'team.allocations')) });
      participation.recomputeEngagedAssetables();
    },

    createAndEditIngredient(participation, assetable) {
      setProperties(this.controller, {
        ingredientToEdit: this.store.createRecord('negotiableIngredient', { assetable: assetable, allocation: this.allocationForAssetable(assetable, get(participation, 'team.allocations')) }),
        participationToEdit: participation
      });
    },

    editIngredient(ingredient, participation) {
      setProperties(this.controller, {
        ingredientToEdit: ingredient,
        participationToEdit: participation
      });
    },

    updateIngredient(ingredient, participation, attrs) {
      var assetableModelName = get(ingredient, 'assetable.constructor.modelName');
      var provisionableModelName = get(ingredient, 'provisionable.constructor.modelName');
      var updatedIngredient;

      if (assetableModelName === 'contract') {
        updatedIngredient = this.updateContractIngredient(ingredient, participation, attrs);
      } else if (assetableModelName === 'draft-pick') {
        updatedIngredient = this.updateDraftPickIngredient(ingredient, participation, attrs);
      } else if (provisionableModelName === 'contingency') {
        updatedIngredient = this.updateContingencyIngredient(ingredient, participation, attrs);
      }

      set(updatedIngredient, 'participation', participation);
      participation.recomputeEngagedAssetables();
    },

    removeIngredient(ingredient) {
      var participation = get(ingredient, 'participation');
      
      get(participation, 'ingredients').removeObject(ingredient);
      participation.recomputeEngagedAssetables();
    },

    addMessage() {
      debugger // TODO
    }
  }
});
