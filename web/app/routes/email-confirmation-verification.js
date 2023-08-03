import Ember from 'ember';
const { get } = Ember;
const { sprintf } = window;

export default Ember.Route.extend({
  model(params) {
    var confirmation = this.store.push({ data: { id: params.id, type: 'email-confirmation' }});
    confirmation.set('tokenVerification', params.token);
    
    return confirmation.save(); 
  },

  afterModel(model, transition) {
    transition.send('flash', sprintf("Email %s confirmed", get(model, 'userEmail')));
    this.transitionTo('/');
  }
});
