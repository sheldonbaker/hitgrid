import Ember from 'ember';
import authenticatedAction from 'hitgrid/utils/authenticated-action';
import returnPromise from 'hitgrid/utils/deferred-receive-action';

const { get, setProperties, RSVP, $ } = Ember;

export default Ember.Route.extend({
  queryParams: {
    searchQuery: { replace: true }
  },

  setupController(controller, hash) {
    controller.setProperties(hash);
  },

  beforeModel() {
    this.session.start(); // TODO - refresh token
  },

  model() {
    return RSVP.hash({
      clubs: this.store.peekAll('club')
    });
  },

  afterModel() {
    $.getScript('https://platform.twitter.com/widgets.js');
  },

  require(state) {
    var foo = function() {
      var deferred = Ember.RSVP.defer();
      var promise = deferred.promise;

      setProperties(this.controllerFor('application'), {
        require: state,
        requireDeferred: deferred
      });

      return promise;
    };

    return this.session.fetchUser().then((user) => {
      if (state === 'claimedUser' && get(user, 'claimed')) {
        return RSVP.resolve(user);
      } else if (state === 'publishedProfile' && get(user, 'profile.published')) {
        return RSVP.resolve(user);
      }

      return foo.call(this);
    }).catch(() => {
      return foo.call(this);
    });
  },

  actions: {
    havePublishedProfile: authenticatedAction('publishedProfile', function(user, profile) {
      this.transitionTo('profile', profile);
    }),

    signUserUp: returnPromise(function(user) {
      return user.save();
    }),

    signUserUpWithProvider: returnPromise(function(provider, user) {
      return get(this, 'torii').open(provider).then((authorization) => {
        user.handleAuthorization(authorization);
      }).then(() => {
        return user.save();
      });
    }),

    logUserInWithAccessToken: returnPromise(function(accessToken) {
      return this.session.open(accessToken);
    }),

    logUserInWithProvider: returnPromise(function(provider, accessToken) {
      return get(this, 'torii').open(provider).then((authorization) => {
        accessToken.handleAuthorization(authorization);
      }).then(() => {
        return this.session.open(accessToken);
      });
    }),

    logUserIn: returnPromise(function(user) {
      return this.session.openFromUser(user);
    }),

    publishProfile: returnPromise(function(profile, attrs) {
      profile.setProperties(attrs);
      
      return profile.save().then((profile) => {
        return RSVP.resolve(profile);
      }, (reason) => {
        profile.rollbackAttributes();
        return RSVP.reject(reason);
      });
    }),

    require: returnPromise(function(state) {
      return this.require(state).then(null, () => {
        this.send('flash', "Couldn't do that - please try again");
        return RSVP.reject();
      });
    }),

    createComment: authenticatedAction('publishedProfile', function(commentable, body) {
      var comment = this.store.createRecord('comment', {
        profile: null, // TODO
        body: body,
        commentable: commentable
      });

      return comment.save();
    }),

    flash(message) {
      alert(message); // TODO
    },

    transitionToLogin() {
      return this.transitionTo('login');
    },

    transitionToSignup() {
      return this.transitionTo('signup');
    }
  }
});
