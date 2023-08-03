import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: '',

  items: null,
  selectedItems: null,

  map: computed('items.[]', 'selectedItems.[]', function() {
    var selectedItems = get(this, 'selectedItems');

    return get(this, 'items').map((item) => {
      return { item: item, isSelected: selectedItems.contains(item) };
    });
  }),

  actions: {
    toggleSelected(item, isSelected) {
      if (isSelected) {
        get(this, 'selectedItems').removeObject(item);
      } else {
        get(this, 'selectedItems').addObject(item);
      }
    }
  }
});
