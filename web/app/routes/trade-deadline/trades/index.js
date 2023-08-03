import Ember from 'ember';
const { Route, get, $ } = Ember;

export default Route.extend({
  model() {
    return get(this.modelFor('tradeDeadline').tradeDeadline, 'trades');
  },

  actions: {
    fetchMore(sortedProposals) {
      var earliestCreatedAt = get(sortedProposals, 'lastObject.createdAtUnix');
      var query = $.extend(true, { created_by: earliestCreatedAt }, get(this.controller, 'model.query'));

      return this.store.query('trade', query);
    }
  }
});
