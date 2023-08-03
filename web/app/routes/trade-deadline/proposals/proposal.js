import Ember from 'ember';
const { Route, RSVP, get, set, setProperties } = Ember;

export default Route.extend({
  setupController(controller, hash) {
    setProperties(controller, hash);
  },

  model(params) {
    var { team } = this.modelFor('tradeDeadline');

    return new RSVP.hash({
      proposal: this.store.findRecord('proposal', params.proposalId),
      team: team
    });
  },

  actions: {
    participationConsenting(particpation) {
      set(particpation, 'consenting', true);
      return particpation.save();
    },

    participationNotConsenting(particpation) {
      set(particpation, 'consenting', false);
      return particpation.save();
    },

    counter(proposal) {
      return this.transitionTo('trade-deadline.proposals.proposal.counter', proposal.belongsTo('tradeDeadline').id(), get(proposal, 'id'));
    }
  }
});
