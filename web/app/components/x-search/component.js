import Ember from 'ember';
const { get, set, observer } = Ember;

export default Ember.Component.extend({
  query: null,
  results: null,

  isOpen: null,

  didInsertElement() {
    set(this, 'isOpen', get(this, 'query') !== null);
  },

  queryDidChange: observer('query', function() {
    if (get(this, 'query')) {
      set(this, 'isOpen', true);
    }
  }),

  close() {
    set(this, 'isOpen', false);
    set(this, 'query', null);
  },

  actions: {
    handleBlur(e) {
      if (e) {
        if (this) {
          
        }
      } else {
        this.close();
      }
    },

    handleOutsideClick(e) {
      if (!this.$('input').is(e.target)) {
        this.close();
      }
    }
  }
});
