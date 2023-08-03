import Ember from 'ember';

const { get, RSVP } = Ember;

export default Ember.Route.extend({
  // TODO
  model() {
    var profileTeams;

    if (get(this.session, 'accessToken')) {
      profileTeams = this.session.fetchUser().then((user) => {
        return this.store.query('team', { profile_id: get(user, 'profile.id') });
      });
    } else {
      profileTeams = RSVP.resolve([]);
    }

    return RSVP.hash({
      tradeDeadlines: this.store.query('tradeDeadline', { sort: '-starts_at' }),
      // profileTeams: get(user, 'profile.teams') // TODO
      profileTeams: profileTeams
    });
  }
});


