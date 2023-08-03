import Ember from 'ember';

const { setProperties, RSVP } = Ember;
const { moment } = window;

export default Ember.Route.extend({
  queryParams: {
    sort: {
      refreshModel: true
    }
  },

  setupController(controller, hash) {
    setProperties(controller, hash);
  },

  model(params) {
    var date = moment.tz('America/New_York').format('YYYY-MM-DD');

    return new RSVP.hash({
      calculations: this.store.query('calculation', { universe_id: 1, date: date, sort: params.sort }),
      leagueYear: this.store.peekRecord('leagueYear', '2015')
    });
  }
});
