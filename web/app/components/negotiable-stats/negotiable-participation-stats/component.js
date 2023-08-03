import Ember from 'ember';
const { Component, computed, get } = Ember;
const { alias } = computed;
const { _ } = window;

export default Component.extend({
  participation: null,
  ingredients: alias('participation.ingredients'),

  // assetables: mapBy('ingredients', 'assetable'),
  // contracts: filterBy('assetables', 'constructor.modelName', 'contract'),
  
  contractsOut: alias('contracts.length'),

  capHitOut: computed('ingredients.@each.{assetable,provisionable,allocation}', function() {
    var ingredients = get(this, 'ingredients').toArray();

    return _.reduce(ingredients, (memo, ingredient) => {
      var assetable = get(ingredient, 'assetable');

      if (assetable && assetable.constructor.modelName === 'contract') {
        var allocation = get(ingredient, 'allocation');
        var retainedPct = get(ingredient, 'retainer.absolutePct') || 0;
      
        var hit = retainedPct ? get(allocation, 'unretainedCapHit') * (Math.max(100 - retainedPct, 0) / 100) : get(allocation, 'capHit');

        return memo + hit;
      }
    }, 0);
  })
});
