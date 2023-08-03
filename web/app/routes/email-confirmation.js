import Ember from 'ember';
import returnPromise from 'hitgrid/utils/deferred-receive-action';

export default Ember.Route.extend({
  actions: {
    createEmailConfirmation: returnPromise(function() {
      return this.store.createRecord('email-confirmation').save();
    })
  }
});
