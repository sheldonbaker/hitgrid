import Ember from 'ember';
const { Component, computed } = Ember;
const { alias } = computed;

export default Component.extend({
  tradeDeadline: null,
  team: null,
  
  deadline: alias('tradeDeadline'),

  actions: {
    proposeTrade(team) {
      this.sendAction('proposeTrade', team);
    }
  }
});
