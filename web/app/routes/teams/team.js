import Ember from 'ember';
const { get } = Ember;

export default Ember.Route.extend({
  model(params) {
    return this.store.queryRecord('team', { universe_id: 1, club_abbr: params.clubAbbr }).then((records) => {
      return get(records, 'firstObject');
    });
  },
});
