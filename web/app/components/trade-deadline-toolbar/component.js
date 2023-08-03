import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: 'nav',
  team: null,

  // HACK: unread-ness is per profile, but we're naively assuming
  // for a team for now

  // HACK: naively assumes all loaded proposals belong to team
  teamUnreadProposals: computed('team', function() {
    return get(this, 'team') ? this.store.peekAll('proposal').filterBy('read', false, { live: true }) : [];
  }),

  unreadMessages: computed('team', function() {
    return get(this, 'team') ? this.store.peekAll('message').filterBy('read', false, { live: true }) : [];
  }),

  teamUnreadMessages: computed('team', 'unreadMessages.@each.receiver', function() {
    var team = get(this, 'team');

    return get(this, 'unreadMessages').filter((message) => {
      return message.belongsTo('receiver').id() === get(team, 'id');
    });
  }),

  teamUnreadTrades: computed('team', function() {
    return get(this, 'team') ? this.store.peekAll('trade').filterBy('read', false, { live: true }) : [];
  })
});
