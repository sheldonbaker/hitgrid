import Ember from 'ember';
const { Route, setProperties, get } = Ember;

export default Route.extend({
  setupController(controller, hash) {
    setProperties(controller, hash);
  },

  model() {
    return this.modelFor('tradeDeadline');
  },

  actions: {
    goToTrades() {
      return this.transitionTo('trade-deadline.trades.index', get(this.controller, 'tradeDeadline'));
    }
  }
});
