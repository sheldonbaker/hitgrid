import Ember from 'ember';
const { Route, RSVP, get, setProperties } = Ember;
const { moment } = window;

export default Route.extend({
  queryParams: {
    sort: { refreshModel: true },
    page: { refreshModel: true },
  },

  setupController(controller, hash) {
    setProperties(controller, hash);
  },

  model(params) {
    // var date = moment.tz('America/New_York'); // TODO
    var date = moment();

    var assetsQuery = {
      universe_id: 1,
      date: date.format('YYYY-MM-DD'),
      assetable_type: 'Contract',
      assetable_player_id: params.id
    };

    return new RSVP.hash({
      asset: this.store.queryRecord('asset', assetsQuery).then((assets) => {
        return get(assets, 'firstObject');
      }),
      universe: this.store.createRecord('universe', { date: date }),
      leagueYear: this.store.peekRecord('leagueYear', '2015')
    });
  }
});
