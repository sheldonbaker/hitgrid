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
      team: team,
      chatPosts: get(tradeDeadline, 'chatPosts')
    });
  },

  actions: {
    createChatPost(body) {
      var chatPost = this.store.createRecord('chatPost', {
        tradeDeadline: get(this.controller, 'tradeDeadline'),
        team: get(this.controller, 'team'),
        body: body
      });

      return chatPost.save();
    }
  }
});
