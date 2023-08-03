import Ember from 'ember';
const { computed, get } = Ember;
const { _ } = window;

export default Ember.Component.extend({
  calculations: null,
  latestTeamCalculations: computed('calculations.[]', function() {
    var sortedCalculations = get(this, 'calculations').sortBy('createdAt').reverse();

    return _.map(_.groupBy(sortedCalculations, function(calc) {
      return get(calc, 'club.id');
    }), function(calcs /*, clubId */) {
      return calcs[0];
    });
  }),

  actions: {
    proposeTrade(team) {
      this.sendAction('proposeTrade', team);
    }
  }
});
