import Ember from 'ember';
const { $ } = Ember;

export default {
  name: 'session',

  initialize: function(application) {
    application.inject('service:session', 'store', 'service:store');

    application.inject('authorizer:application', 'session', 'service:session');
    // var authorizer = application.__container__.lookup('authorizer:application');

    application.inject('adapter:application', 'authorizer', 'authorizer:application');
    application.inject('service:pusher', 'authorizer', 'authorizer:application');

    // $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    //   authorizer.authorize(options, originalOptions, jqXHR);
    // });

    application.inject('route', 'session', 'service:session');
    application.inject('controller', 'session', 'service:session');

    application.inject('component:authentication-interstitial', 'session', 'service:session');
  }
};
