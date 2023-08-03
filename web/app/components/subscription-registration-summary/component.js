import Ember from 'ember';
const { get, computed } = Ember;

export default Ember.Component.extend({
  tagName: '',

  componentName: computed('registration', function() {
    return get(this, 'registration.constructor.modelName').dasherize() + '-summary';
  })
});
