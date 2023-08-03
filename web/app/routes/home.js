import Ember from 'ember';
const { get, RSVP } = Ember;

export default Ember.Route.extend({
  model() {
    var store = this.store;

    return RSVP.hash({
      featuredActivity: store.queryRecord('activity', { featured: true, limit: 1 }),
      activites: store.query('activity', { limit: 16 })
    }).then((hash) => {
      return {
        activities: get(hash.activites, 'content').map((p) => { return p.getRecord(); }).concat(hash.featuredActivity).uniq()
      };
    });
  }
});
