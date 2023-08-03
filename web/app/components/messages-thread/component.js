import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  allMessages: null,
  team: null,
  otherTeam: null,

  messages: computed('otherTeam', 'allMessages.content.@each.{sender,receiver}', function() {
    var otherTeam = get(this, 'otherTeam');

    return get(this, 'allMessages').filter((message) => {
      return message.isWith(otherTeam);
    }).sortBy('createdAtUnix');
  }),

  didInsertElement() {
    this.scrollToBottom();
  },

  scrollToBottom() {
    var el = this.$();
    el.scrollTop(el.get(0).scrollHeight);
  }
});
