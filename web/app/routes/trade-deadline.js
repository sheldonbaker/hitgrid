import Ember from 'ember';
const { get, RSVP, setProperties } = Ember;
const { sprintf } = window;

export default Ember.Route.extend({
  setupController(controller, hash) {
    setProperties(controller, hash);
  },

  serialize(model) {
    return { tradeDeadlineId: get(model, 'id') };
  },

  // TODO
  model(params) {
    return get(this.session, 'userPromise').then((user) => {
      var profileId = user.belongsTo('profile').id();
      var tradeDeadlineId = params.tradeDeadlineId;

      return new RSVP.hash({
        tradeDeadline: this.store.findRecord('tradeDeadline', tradeDeadlineId),
        teams: this.store.query('team', { trade_deadline_id: tradeDeadlineId, include: 'profile' }),
        team: this.store.query('team', { trade_deadline_id: tradeDeadlineId, profile_id: profileId }).then((teams) => {
          return get(teams, 'firstObject');
        })
      });
    });
  },

  // TODOTODOTODO
  // model(params) {
  //   var tradeDeadlineId = params.id;

  //   return new RSVP.hash({
  //     tradeDeadline: this.store.findRecord('tradeDeadline', tradeDeadlineId),
  //     team: null
  //   });
  // },

  afterModel(hash) {
    this.openPusherChannels(hash);

    // async get unread
    this.store.findAll('unreadItem');

    return get(hash.tradeDeadline, 'trades');
  },

  openPusherChannels(hash) {
    var tradeDeadlineId = get(hash.tradeDeadline, 'id');
    var teamId = get(hash, 'team.id');
    var channels = [];
    
    channels.push(sprintf("trade-deadline-%s", tradeDeadlineId));

    if (teamId) {
      channels.push([sprintf("trade-deadline-%s", tradeDeadlineId), sprintf("team-%s", teamId)].join('-'));
    }

    this.pusher.open(channels);
    this.channels = channels;
  },

  deactivate() {
    this.pusher.close(this.channels);
    this.channels = null;
  }
});
