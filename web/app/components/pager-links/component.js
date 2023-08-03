import Ember from 'ember';
const { Component, get, set, computed } = Ember;

export default Component.extend({
  tagName: 'nav',

  collection: null,
  links: null,

  loading: false,

  hasPrevPage: computed.bool('links.prev'),
  hasNextPage: computed.bool('links.next'),

  actions: {
    prevPage() {
      if (get(this, 'hasPrevPage')) {
        set(this, 'loading', true);

        this.attrs.prevPage(get(this, 'collection')).then(() => {
          set(this, 'loading', false);
        });
      }
    },

    nextPage() {
      if (get(this, 'hasNextPage')) {
        set(this, 'loading', true);

        this.attrs.nextPage(get(this, 'collection')).then(() => {
          set(this, 'loading', false);
        });
      }
    }
  }
});
