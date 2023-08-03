import Ember from 'ember';
const { get, observer, computed, $ } = Ember;
const { alias } = computed;

export default Ember.Component.extend({
  focusKey: alias('application.focusKey'),

  focusKeyDidChange: observer('focusKey', function() {
    if (get(this, 'focusKey') === get(this, 'key')) {
      this.scrollToElement();
    }
  }),

  scrollToElement() {
    var scrollTop = this.$().offset().top;

    $('html, body').animate({ scrollTop }, 500);
  }
});
