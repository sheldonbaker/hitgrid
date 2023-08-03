import Ember from 'ember';
const { RSVP, get, setProperties } = Ember;

export default Ember.Route.extend({
  setupController(controller, hash) {
    setProperties(controller, hash);
  },

  model() {
    var { tradeDeadline, team } = this.modelFor('tradeDeadline');

    return new RSVP.hash({
      tradeDeadline: tradeDeadline,
      teams: get(tradeDeadline, 'teams').then((teams) => {
        return teams.without(team);
      }),
      team: team,
      messages: this.store.filter('message', { team_id: get(team, 'id') }, function(message) {
        return message.isWith(team) && !get(message, 'isNew');
      })
    });
  }
});


