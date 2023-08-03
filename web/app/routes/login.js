import Ember from 'ember';
import deferredSend from 'hitgrid/utils/deferred-send-action';

const { get } = Ember;

export default Ember.Route.extend({
  beforeModel() {
    if (get(this.session, 'user')) {
      this.transitionTo('profile');
    }
  },

  model() {
    return this.store.createRecord('accessToken');
  },

  actions: {
    logIn(accessToken) {
      deferredSend(this, 'logUserInWithAccessToken', accessToken).then(() => {
        this.session.fetchUser().then((user) => {
          if (get(user, 'profile.published')) {
            this.transitionTo('profile', get(user, 'profile'));
          } else {
            this.transitionTo('home');
          }
        });
      });
    },

    logInWithProvider(provider, accessToken) {
      deferredSend(this, 'logUserInWithProvider', provider, accessToken).then(() => {
        this.session.fetchUser().then((user) => {
          if (get(user, 'profile.published')) {
            this.transitionTo('profile', get(user, 'profile'));
          } else {
            this.transitionTo('home');
          }
        });
      });
    }
  }
});
