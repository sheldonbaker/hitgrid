import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  message: null,
  team: null,

  wasSent: computed('message', 'team', function() {
    return get(this, 'message.sender') === get(this, 'team');
  })
});
