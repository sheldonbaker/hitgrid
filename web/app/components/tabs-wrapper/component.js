import Ember from 'ember';
const { Component, set } = Ember;

export default Component.extend({
  selectedTab: null,

  actions: {
    selectTab(name) {
      set(this, 'selectedTab', name);
    }
  }
});
