import Ember from 'ember';

const { get, computed } = Ember;
const { alias } = computed;
const { _ } = window;

export default Ember.Component.extend({
  obligatables: null,
  allocations: alias('obligatables'),

  leagueYear: null,
  date: null,

  rows: computed('allocations.[]', 'leagueYear', 'date', function() {
    var allocations = get(this, 'allocations');
    var leagueYear = get(this, 'leagueYear');
    var date = get(this, 'date');

    if (leagueYear) {
      allocations = allocations.filterBy('leagueYear.id', get(leagueYear, 'id'));
    }

    var groupedAllocations = _.groupBy(allocations, function(allocation) {
      return get(allocation, 'contractYear.id');
    });

    var mapped = _.map(groupedAllocations, (allocations) => {
      let row = {
        date: date,
        contractYear: get(allocations, 'firstObject.contractYear'),
        allocations: allocations.sort((a, b) => {
          return get(a, 'startDate').unix() > get(b, 'startDate').unix();
        }),
        currentAllocation: allocations.find((a) => {
          return date.isBetween(get(a, 'startDate'), get(a, 'endDate')) || date.isSame(get(a, 'startDate')) || date.isSame(get(a, 'endDate'));
        })
      };

      ['fullDays', 'loanedDays', 'onSOIRDays', 'suspendedDays', 'capCost'].forEach((key) => {
        row[key] = _.reduce(allocations, (memo, allocation) => {
          return memo + get(allocation, key);
        }, 0);
      });

      return row;
    });

    return mapped.sort(function(a, b) {
      return get(b, 'contractYear.avgValue') - get(a, 'contractYear.avgValue');
    });
  }),

  groupKeyOrder: computed(function() {
    return ['On Roster', 'Loaned', 'Departed'];
  }),

  objectGrouper(obj) {
    var currentAllocation = get(obj, 'currentAllocation');

    if (!currentAllocation) {
      return 'Departed';
    } else if (get(currentAllocation, 'loaned')) {
      return 'Loaned';
    } else {
      return 'On Roster';
    }
  }
});
