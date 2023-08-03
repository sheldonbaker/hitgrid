import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  clubs: computed(function() {
    return this.store.peekAll('club');
  })
});