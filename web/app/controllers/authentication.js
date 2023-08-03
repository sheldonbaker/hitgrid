import Ember from 'ember';
const { get } = Ember;

export default Ember.Controller.extend({
  queryParams: [{ previousTransitionTarget: 'redirect_to' }],
  previousTransitionTarget: null,

  actions: {
    foo() {
      this.transitionToRoute(get(this, 'previousTransitionTarget') || 'home');
    }
  }
});
