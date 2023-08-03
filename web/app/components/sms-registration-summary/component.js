import Ember from 'ember';
const { get } = Ember;

export default Ember.Component.extend({
  actions: {
    registerSms() {
      this.sendAction('registerSms', get(this, 'registration'));
    }
  }
});
