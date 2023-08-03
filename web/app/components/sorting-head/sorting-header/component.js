import Ember from 'ember';
const { Component, get, computed } = Ember;

export default Component.extend({
  sort: null,
  by: null,
  iconFamily: 'amount',

  isSortedAsc: computed('sort', 'by', function() {
    return get(this, 'sort') === get(this, 'by');
  }),

  isSortedDesc: computed('sort', 'by', function() {
    return get(this, 'sort') === ['-', get(this, 'by')].join('');
  }),

  click() {
    this.sendAction('sortBy', get(this, 'by'));
  }
});
