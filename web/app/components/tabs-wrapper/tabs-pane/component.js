import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  selectedTab: null,
  name: null,

  isVisible: computed('selectedTab', 'name', function() {
    return get(this, 'selectedTab') === get(this, 'name');
  })
});
