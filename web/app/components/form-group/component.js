import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: 'fieldset',
  classNames: ['form-group'],
  classNameBindings: ['isInvalid:has-error'],

  isInvalid: computed('model.errors.[]', function() {
    return get(this, 'model.errors').errorsFor(get(this, 'key')).length > 0;
  }),

  model: null,
  key: null
});
