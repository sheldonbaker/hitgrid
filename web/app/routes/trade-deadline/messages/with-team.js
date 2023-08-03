import Ember from 'ember';
const { Route, RSVP, get, set, setProperties } = Ember;

export default Route.extend({
  setupController(controller, hash) {
    setProperties(controller, hash);
  },

  model(params) {
    var { teams, team, messages } = this.modelFor('tradeDeadline.messages');
    var otherTeam = teams.findBy('club.abbr', params.clubAbbr);

    return new RSVP.hash({
      messages: messages,
      team: team,
      otherTeam: otherTeam
    });
  },

  afterModel(hash) {
    var { team, otherTeam, messages } = hash;
    var filteredMessages = messages.filter((message) => {
      return message.isWith(otherTeam);
    });
    var receivedMessages = filteredMessages.filterBy('receiver', team);

    receivedMessages.filterBy('read', false).forEach((message) => {
      set(message, 'read', true);
      message.save();
    });

    this.readMessagesContinuously = this.reading.start((record) => {
      return record.constructor.modelName === 'message' && get(record, 'receiver') === team && get(record, 'sender') === otherTeam;
    });

    return null;
  },

  deactivate() {
    this.reading.stop(this.readMessagesContinuously);
  },
});
