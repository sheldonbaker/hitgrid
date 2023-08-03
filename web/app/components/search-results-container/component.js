import Ember from 'ember';
const { get, computed, observer, run, $ } = Ember;

export default Ember.Component.extend({
  classNames: ['search-results'],

  isOpen: null,
  clickedOutside: null,

  query: null,
  results: null,

  target: null,
  attachment: null,
  attachmentTarget: null,

  showDialog: computed.and('isOpen', 'query'),

  // Because ember-component-css won't let us target
  // an element outside of this element
  willInsertDialog: observer('isOpen', 'query', function() {
    if (get(this, 'showDialog')) {
      run.next(() => {
        var dialog = $('.search-results-container--element');
        var properties = {};

        if (get(this, 'media.isDesktop')) {
          properties = {
            'min-height': '4em',
            'max-height': '24em',
            'width': '12em',
            'overflow-y': 'auto',
          };
        } else {
          properties = {
            'width': '100%'
          };
        }

        dialog.css(properties);
      });
    }
  }),

  actions: {
    clickedOutside(e) {
      this.sendAction('clickedOutside', e);
    }
  }
});
