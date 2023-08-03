import Ember from 'ember';
import deferredSend from 'hitgrid/utils/deferred-send-action';

export default Ember.Route.extend({
  beforeModel() {
    return this.session.fetchClaimedUser().then(() => {
      this.transitionTo('profile');
    }).catch(() => {});
  },

  model() {
    return this.session.fetchUser().then((user) => {
      return user;
    }, () => {
      return this.store.createRecord('user');
    });
  },

  actions: {
    signUpAndLogIn(user) {
      deferredSend(this, 'signUserUp', user).then((user) => {
        deferredSend(this, 'logUserIn', user).then(() => {
          this.transitionTo('home');
        });
      });
    },

    signUpWithProviderAndLogIn(provider, user) {
      deferredSend(this, 'signUserUpWithProvider', provider, user).then((user) => {
        deferredSend(this, 'logUserIn', user).then(() => {
          this.transitionTo('home');
        });
      });
    }
  }
});
