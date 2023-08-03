import Ember from 'ember';
const { Route, RSVP, setProperties } = Ember;
const { moment } = window;

export default Route.extend({
  queryParams: {
    sort: { refreshModel: true }
  },

  setupController(controller, hash) {
    setProperties(controller, hash);
  },
  
  model(params) {
    var date = moment.tz('America/New_York');
    var assetsQuery = {
      universe_id: 1,
      date: date.format('YYYY-MM-DD'),
      assetable_type: 'Contract'
    };

    if (params.sort) {
      assetsQuery.sort = this.keyForSort(params.sort);
    }

    return new RSVP.hash({
      assets: this.store.query('asset', assetsQuery),
      universe: this.store.createRecord('universe', { date: date }),
      leagueYear: this.store.peekRecord('leagueYear', '2015')
    });
  },

  // So we don't have to expose ugly keys in URL
  // e.g., assetable.player.first_name
  // we'll convert them as it they were respective to
  // 'players' instead of 'assets'

  keyForSort(sort) {
    var map = {
      name: 'players.first_name',
      position: 'players.position',
      age: 'players.birthdate',
      club: 'clubs.id',
      cap_hit: '' // TODO
    };

    var mapped = map[sort.replace(/^\-/, '')];

    if (mapped) {
      return sort[0] === '-' ? ['-', mapped].join('') : mapped;
    } else {
      return sort;
    }
  }
});
