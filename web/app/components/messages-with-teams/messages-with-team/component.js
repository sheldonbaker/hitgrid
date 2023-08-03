import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  team: null,
  messages: null,

  messagesWithTeam: computed('team', 'messages.[]', function() {
    var team = get(this, 'team');

    return get(this, 'messages').filter((message) => {
      return message.isWith(team);
    });
  }),

  receivedMessagesWithTeam: computed('team', 'messagesWithTeam.[]', function() {
    var team = get(this, 'team');

    return get(this, 'messagesWithTeam').filter((message) => {
      return get(message, 'sender') === team;
    });
  }),

  unseenReceivedMessagesWithTeam: computed.filterBy('receivedMessagesWithTeam', 'seen', false),
  lastMessageWithTeam: computed.alias('messagesWithTeam.lastObject')
});
