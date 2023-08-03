import Ember from 'ember';
const { Component, get, computed } = Ember;
const { sort } = computed;

export default Component.extend({
  contracts: null,
  allocations: null,
  date: null,

  joined: computed('contracts.[]', 'allocations.[]', function() {
    var { date, contracts, allocations } = this.getProperties(['date', 'contracts', 'allocations']);

    var indexedAllocations = {};
    allocations.forEach(function(allocation) {
      if (allocation.occursOn(date)) {
        indexedAllocations[get(allocation, 'contract.id')] = allocation;
      }
    });

    return contracts.map(function(contract) {
      return { contract: contract, allocation: indexedAllocations[get(contract, 'id')] };
    });
  }),

  joinedSorting: ['contract.contractYear2015.avgValue:desc'],
  sortedJoined: sort('joined', 'joinedSorting')
});
