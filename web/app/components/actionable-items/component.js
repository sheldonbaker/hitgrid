// TODO - hover

import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

const { get, set, observer, computed } = Ember;

export default Ember.Component.extend(KeyboardShortcuts, {
  tagName: '',

  selectedItemIndex: -1,

  selectedItem: computed('selectedItemIndex', function() {
    return get(this, 'items').objectAt(get(this, 'selectedItemIndex'));
  }),

  itemsDidChange: observer('items.[]', function() {
    set(this, 'selectedItemIndex', -1);
  }),

  traverseItems(increment) {
    var items = get(this, 'items');
      
    if (items) {
      var index = get(this, 'selectedItemIndex');

      if (increment === 1 && index === get(items, 'length') - 1) {
        set(this, 'selectedItemIndex', -1);
      } else if (increment === -1 && index === -1) {
        set(this, 'selectedItemIndex', get(items, 'length') - 1);
      } else {
        set(this, 'selectedItemIndex', index + increment);
      }
    }
  },

  keyboardShortcuts: {
    up: 'prev',
    down: 'next',
    enter: 'submit'
  },

  actions: {
    prev() {
      this.traverseItems(-1);
    },

    next() {
      this.traverseItems(1);
    },

    submit() {
      var selectedItem = get(this, 'selectedItem');
      
      if (selectedItem) {
        this.sendAction('action', selectedItem);
      } else {
        this.send('next');
      }
    }
  }
});
