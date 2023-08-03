import Ember from 'ember';
const { Component, get, set, getProperties, computed } = Ember;
const { oneWay } = computed;

export default Component.extend({
  ingredient: null,
  participation: null,

  condition: oneWay('ingredient.provisionable.condition'),
  draftPicks: null,

  didReceiveAttrs() {
    set(this, 'draftPicks', get(this, 'ingredient.provisionable.draftPicks').toArray());
  },

  actions: {
    commit() {
      this.sendAction('update', get(this, 'ingredient'), get(this, 'participation'), getProperties(this, ['condition', 'draftPicks']));
      this.sendAction('dismiss');
    }
  }
});