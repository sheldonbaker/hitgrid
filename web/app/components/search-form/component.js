import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

const { get, set, observer, run } = Ember;

export default Ember.Component.extend(KeyboardShortcuts, {
  classNames: ['search-form'],

  blurred: null,

  query: null,
  isOpen: null,

  didInsertElement() {
    run.next(() => {
      if (get(this, 'isOpen')) {
        this.$('input').focus();
      }
    });

    this.$('input').on('focus', () => {
      if (get(this, 'query') === null) {
        set(this, 'query', '');
      }
    });
  },

  isOpenDidChange: observer('isOpen', function() {
    var isOpen = get(this, 'isOpen');

    if (isOpen === true) {
      run.next(() => {
        this.$('input').focus();
      });
    }

    if (isOpen === false) {
      this.$('input').blur();
    }
  }),

  keyboardShortcuts: {
    'esc': 'close',
    'tab': {
      action: 'close',
      preventDefault: false
    }
  },

  actions: {
    close() {
      this.sendAction('blurred');
    }
  }
});
