import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['disabled'],

  isSaving: false,

  disabled: computed.alias('isSaving'),

  click() {
    this.sendAction('action');
  }
});
