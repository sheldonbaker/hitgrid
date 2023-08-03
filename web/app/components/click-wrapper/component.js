import Ember from 'ember';
const { get, computed, run, $ } = Ember;

export default Ember.Component.extend({
  clickedOutside: null,

  didInsertElement() {
    run.later(() => {
      $(document).on(get(this, 'namespacedEvent'), this.handleClick.bind(this));
    });
  },

  willDestroyElement() {
    $(document).off(get(this, 'namespacedEvent'));
  },

  namespacedEvent: computed(function() {
    return 'click.' + get(this, 'elementId');
  }),

  handleClick(e) {
    var element = this.$();

    if (!element.is(e.target) && element.has(e.target).length === 0) {
      this.sendAction('clickedOutside', e);
    }

    return false;
  }
});