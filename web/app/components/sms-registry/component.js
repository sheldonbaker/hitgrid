import Ember from 'ember';
const { get } = Ember;

export default Ember.Component.extend({
  registration: null,

  actions: {
    save() {
      get(this, 'registration').save();
    }
  }
});
