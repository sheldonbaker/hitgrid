import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['results.isFulfilled::loading'],

  results: null,

  actions: {
    selectResult(result) {
      debugger // TODO
    }
  }
});
