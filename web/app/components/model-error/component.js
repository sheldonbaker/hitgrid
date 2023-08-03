import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: 'span',

  model: null,
  key: null,

  messages: computed('key', 'model.errors.[]', function() {
    var errors = get(this, 'model.errors');
    
    if (errors) {
      return errors.errorsFor(get(this, 'key')).mapBy('message');
    }
  }),

  actions: {
    
  }  
});
