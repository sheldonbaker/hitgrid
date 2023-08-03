import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.modal('authentication-interstitial', {
    withParams: ['require', 'requireDeferred'],
    otherParams: {
      user: 'user'
    },
    dismissWithOutsideClick: false,
    dismissWithEscape: false,
    actions: {
      logUserIn: 'logUserIn',
      logUserInWithAccessToken: 'logUserInWithAccessToken',
      logUserInWithProvider: 'logUserInWithProvider',
      signUserUp: 'signUserUp',
      signUserUpWithProvider: 'signUserUpWithProvider',
      publishProfile: 'publishProfile'
    }
  });

  this.route('home', { path: '/' });
  this.route('about');
  
  this.route('teams', function() {
    this.route('team', { path: '/:clubAbbr' });
  });
  this.route('players', function() {
    this.route('player', { path: '/:id' });
  });

  this.route('profile', { path: '/profile/:handle' });
  this.route('settings', function() {
    this.route('email');
    
    // this.route('notifications', { resetNamespace: true }, function() {
    //   this.modal('sms-registry', {
    //     withParams: [{ editingSmsRegistration: 'registration' }],
    //   });
    // });
  });

  this.route('authentication');
  this.route('login');
  this.route('signup');
  this.route('logout');

  this.route('email-confirmation', { path: '/confirm_email' });
  this.route('email-confirmation-verification', { path: '/confirm_email/:id/:token' });

  this.route('trade-deadlines', function() {
    this.modal('trade-deadline-joiner', {
      withParams: { teamClaim: 'teamClaim' },
      actions: {
        claimTeam: 'claimTeam'
      }
    });

    this.route('trade-deadline', { path: '/:tradeDeadlineId', resetNamespace: true }, function() {
      this.route('proposals', function() {
        this.route('new');
        this.route('proposal', { path: '/:proposalId' }, function() {
          this.route('counter');
        });

        this.modal('ingredient-editor', {
          withParams: { ingredientToEdit: 'ingredient' },
          otherParams: { participationToEdit: 'participation' },
          actions: {
            update: 'updateIngredient'
          }
        });
      });

      this.route('messages', function() {
        this.route('with-team', { path: '/:clubAbbr' });
      });

      this.route('chat');

      this.route('teams', function() {
        this.route('team', { path: '/:clubAbbr' });
      });

      this.route('trades', function() {
        this.route('trade', { path: '/:id' });
      });
    });
  });
});

export default Router;
