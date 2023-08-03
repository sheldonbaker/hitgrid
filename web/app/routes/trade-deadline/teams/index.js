import Ember from 'ember';
const { Route, get, setProperties } = Ember;

export default Route.extend({
  setupController(controller, hash) {
    setProperties(controller, hash);
  },

  model() {
    var hash = this.modelFor('trade-deadline');
    
    return {
      tradeDeadline: get(hash, 'tradeDeadline'),
      team: get(hash, 'team')
    };
  },
});
