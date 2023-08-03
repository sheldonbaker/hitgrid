import Ember from 'ember';
import deferredSendAction from 'hitgrid/utils/deferred-send-action';

const { get } = Ember;

export default Ember.Component.extend({
  classNames: ['signup-form'],
  autofocus: false,

  user: null,

  signUp: null,
  signUpWithProvider: null,

  submit(e) {
    e.preventDefault();

    deferredSendAction(this, 'signUp', get(this, 'user'));
  },

  actions: {
    logIn() {
      this.sendAction('logIn');
    },

    signUpWithEmail() {
      deferredSendAction(this, 'signUp', get(this, 'user'));
    },

    signUpWithFacebook() {
      deferredSendAction(this, 'signUpWithProvider', 'facebook', get(this, 'user'));
    },

    signUpWithTwitter() {
      deferredSendAction(this, 'signUpWithProvider', 'twitter', get(this, 'user'));
    }
  }
});
