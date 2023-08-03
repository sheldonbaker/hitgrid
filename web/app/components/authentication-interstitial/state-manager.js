import Ember from 'ember';
import StateManager from 'ember-states';
import { State } from 'ember-states';
import deferredSendAction from 'hitgrid/utils/deferred-send-action';

const { get, set, computed, RSVP } = Ember;

export default StateManager.extend({
  component: null,
  user: null,
  require: null,

  requireUser: computed.equal('require', 'user'),
  requireClaimedUser: computed.equal('require', 'claimedUser'),
  requirePublishedProfile: computed.equal('require', 'publishedProfile'),

  initialState: computed(function() {
    var user = get(this, 'user');

    if (user && get(user, 'claimed')) {
      return 'profile';
    } else if (user) {
      return 'signup';
    } else {
      if (get(this, 'requireUser')) {
        return 'start';
      } else {
        return 'signup';
      }
    }
  }),

  start: State.create({
    signUpNow(manager) {
      manager.transitionTo('signup');
    }
  }),

  signup: State.create({
    enter(manager) {
      set(this, 'newUser', manager.store.createRecord('user'));
    },

    signUpAndLogIn(manager) {
      var component = manager.component;
      var promise = deferredSendAction(component, 'signUserUp', get(this, 'newUser')).then((user) => {
        return deferredSendAction(component, 'logUserIn', user).then(() => {
          return RSVP.resolve(user);
        });
      }).then((user) => {
        manager.send('completedStep', user);
      });
      
      manager.send('fulfilling', promise);
    },

    signUpWithProviderAndLogIn(manager, provider) {
      var component = manager.component;

      var promise = deferredSendAction(component, 'signUserUpWithProvider', provider, get(this, 'newUser')).then((user) => {
        return deferredSendAction(component, 'logUserIn', user).then(() => {
          return RSVP.resolve(user);
        });
      }).then((user) => {
        manager.send('completedStep', user);
      });

      manager.send('fulfilling', promise);
    }
  }),

  login: State.create({
    enter(manager) {
      set(this, 'accessToken', manager.store.createRecord('accessToken'));
    },

    logIn(manager) {
      var component = manager.component;
      var accessToken = get(this, 'accessToken');

      var promise = deferredSendAction(component, 'logUserInWithAccessToken', accessToken).then(() => {
        return manager.store.findRecord('user', get(accessToken, 'userId'));
      }).then((user) => {
        manager.send('completedStep', user);
      });

      manager.send('fulfilling', promise);
    },

    logInWithProvider(manager, provider) {
      var component = manager.component;
      var accessToken = get(this, 'accessToken');

      var promise = deferredSendAction(component, 'logUserInWithProvider', provider, accessToken).then(() => {
        return manager.store.findRecord('user', get(accessToken, 'userId'));
      }).then((user) => {
        manager.send('completedStep', user);
      });

      manager.send('fulfilling', promise);
    },

    signUp(manager) {
      manager.transitionTo('signup');
    }
  }),

  profile: State.create({
    enter(manager) {
      set(this, 'profile', get(manager, 'user.profile'));
    },

    publishProfile(manager, profile, attrs) {
      var component = manager.component;

      var promise = deferredSendAction(component, 'publishProfile', profile, attrs).then(() => {
        return RSVP.resolve(get(manager, 'user'));
      }).then((user) => {
        manager.send('completedStep', user);
      });

      manager.send('fulfilling', promise);
    }
  }),

  logIn(manager) {
    manager.transitionTo('login');
  },

  signUpLater(manager) {
    var component = manager.component;
    var promise = deferredSendAction(component, 'signUserUp', manager.store.createRecord('user')).then((user) => {
      return deferredSendAction(component, 'logUserIn', user).then(() => {
        return user;
      });
    }).then((user) => {
      manager.send('completedStep', user);
    });
    
    manager.send('fulfilling', promise);
  },

  fulfilling(manager, promise) {
    var component = get(manager, 'component');
    set(component, 'isFulfilling', true);
    
    promise.then(() => {
      set(component, 'isFulfilling', false);
    });
  },

  completedStep(manager, user) {
    if (get(this, 'requirePublishedProfile')) {
      if (get(user, 'profile.published')) {
        this.send('requirementFulfilled');
      } else {
        set(manager, 'user', user);
        this.transitionTo('profile');
      }
    } else if (get(this, 'requireClaimedUser')) {
      if (get(user, 'claimed')) {
        this.send('requirementFulfilled');
      } else {
        this.transitionTo('signup');
      }
    } else {
      this.send('requirementFulfilled');
    }
  },

  requirementFulfilled(manager) {
    manager.component.requirementFulfilled();
  }
});