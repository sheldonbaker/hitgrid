import Ember from 'ember';
const { Controller, get, set } = Ember;

export default Controller.extend({
  team: null,
  otherTeam: null,

  newMessageBody: null,

  actions: {
    createMessage(body) {
      var message = this.store.createRecord('message', {
        body: body,
        sender: get(this, 'team'),
        receiver: get(this, 'otherTeam')
      });

      return message.save().then(() => {
        Ember.run.next(() => {
          var list = $('.messages-with-team__new-message-container').prev()[0];
          list.scrollTop = list.scrollHeight;
        });
        set(this, 'newMessageBody', null);
      });
    }
  }
});
