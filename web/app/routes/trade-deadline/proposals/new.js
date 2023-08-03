import Ember from 'ember';
const { Route, RSVP, get, setProperties } = Ember;

export default Route.extend({
  setupController(controller, hash) {
    setProperties(controller, hash);
  },

  model(params) {
    var { tradeDeadline, team } = this.modelFor('tradeDeadline');
      
    return get(tradeDeadline, 'teams').then((teams) => {
      var proposal = this.store.createRecord('proposal', {
        tradeDeadline: tradeDeadline,
        date: get(team, 'date'),
        read: true
      });

      get(proposal, 'participations').createRecord({
        negotiable: proposal,
        initiating: true,
        team: team
      });

      get(proposal, 'participations').createRecord({
        negotiable: proposal,
        team: params.clubAbbr ? teams.findBy('club.abbr', params.clubAbbr) : null
      });
      
      return new RSVP.hash({
        proposal: proposal,
        team: team
      });
    });
  }
});
