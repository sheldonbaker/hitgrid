import Ember from 'ember';
import deferredSendAction from 'hitgrid/utils/deferred-send-action';

const { get } = Ember;

export default Ember.Component.extend({
  classNames: ['login-form'],

  autofocus: false,
  accessToken: null,

  submit(e) {
    e.preventDefault();
    this.sendAction('logIn', get(this, 'accessToken'));
  },

  actions: {
    signUp() {
      this.sendAction('signUp');
    },

    logInWithTwitter() {
      deferredSendAction(this, 'logInWithProvider', 'twitter', get(this, 'accessToken'));
    },

    logInWithFacebook() {
      deferredSendAction(this, 'logInWithProvider', 'facebook', get(this, 'accessToken'));
    }
  }
});
