import Ember from 'ember';
const { set } = Ember;

export default Ember.Route.extend({
  beforeModel() {
    set(this.controllerFor('application'), 'user', null);
    this.session.close();
    this.transitionTo('home');
  }
});
