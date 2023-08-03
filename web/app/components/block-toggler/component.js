import Ember from 'ember';

export default Ember.Component.extend({
  hidden: false,

  click() {
    this.toggleProperty('hidden');
  },

  actions: {
    toggleHidden() {
      this.toggleProperty('hidden');
    }
  }
});