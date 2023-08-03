import Ember from 'ember';
const { Component, get, computed } = Ember;

export default Component.extend({
  ingredients: null,
  allocations: null,
  date: null,

  joined: computed('ingredients.[]', 'allocations.[]', function() {
    var { ingredients, allocations, date } = this.getProperties(['ingredients', 'allocations', 'date']);

    var indexedAllocations = {};
    allocations.forEach(function(allocation) {
      if (allocation.occursOn(date)) {
        indexedAllocations[get(allocation, 'contract.id')] = allocation;
      }
    });

    return ingredients.map(function(ingredient) {
      return { ingredient: ingredient, allocation: indexedAllocations[get(ingredient, 'contract.id')] };
    });
  })
});