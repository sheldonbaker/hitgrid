import Ember from 'ember';
const { Route, RSVP, get, setProperties } = Ember;

export default Route.extend({
  setupController(controller, hash) {
    setProperties(controller, hash);
  },

  model() {
    var model = this.modelFor('trade-deadline.proposals.proposal');
    model.proposal = model.proposal.buildCounter(model.proposal, model.team);

    return model;
  },

  afterModel(hash) {
    return RSVP.all([get(hash.proposal, 'counter'), get(hash.proposal, 'countered')]);
  }
});
