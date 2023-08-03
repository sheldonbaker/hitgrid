import Ember from 'ember';
const { get, computed } = Ember;

export default Ember.Component.extend({
  tagName: 'p',

  string: null,
  limit: null,

  limited: computed('string', 'limit', function() {
    return get(this, 'string.length') > get(this, 'limit');
  }),

  didInsertElement() {
    if (get(this, 'limited')) {
      this.$('abbr').tooltip();
    }
  },

  willDestroyElemet() {
    this.$('abbr').tooltip('dispose');
  }
});
