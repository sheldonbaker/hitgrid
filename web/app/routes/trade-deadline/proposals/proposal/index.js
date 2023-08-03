import Ember from 'ember';
const { Route, get, setProperties } = Ember;

export default Route.extend({
  setupController(controller, hash) {
    setProperties(controller, hash);
  },

  model() {
    return this.modelFor('tradeDeadline.proposals.proposal');
  },

  afterModel(hash) {
    var proposal = hash.proposal;
    var proposalId = get(hash.proposal, 'id');

    proposal.markAsRead();
    get(proposal, 'messages').forEach((message) => {
      message.markAsRead();
    });

    this.readProposalAndMessages = this.reading.start((record) => {
      if (record.constructor.modelName === 'proposal' && get(record, 'id') === proposalId) {
        return true;
      } else if (record.constructor.modelName === 'message' && record.belongsTo('proposal').id() === proposalId) {
        return true;
      }

      return false;
    });
  },

  deactivate() {
    this.reading.stop(this.readProposalAndMessages);
  },

  actions: {
    createMessage(body) {
      var message = this.store.createRecord('message', {
        proposal: get(this.controller, 'proposal'),
        body: body,

        sender: get(this.controller, 'team'),
        receiver: get(this.controller, 'proposal').otherTeam(get(this.controller, 'team'))
      });

      return message.save();
    }
  }
});
