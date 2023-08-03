import Ember from 'ember';
const { get } = Ember;

export default Ember.Route.extend({
  model(params) {
    var { tradeDeadline } = this.modelFor('tradeDeadline');
    var tradeDeadlineId = get(tradeDeadline, 'id');

    return this.store.queryRecord('team', { trade_deadline_id: tradeDeadlineId, club_abbr: params.clubAbbr }).then((records) => {
      return get(records, 'firstObject');
    });
  },
});
