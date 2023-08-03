/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'hitgrid',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      ENABLE_DS_FILTER: true,
      
      FEATURES: {
        'ds-finder-include': true,
        'ds-references': true,
        'ds-pushpayload-return': true
      }
    },

    moment: {
      includeTimezone: 'none' // load timezones ourselves
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    
    API: {},
    PROXY: {}
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.API.url = 'http://127.0.0.1:3000';
    ENV.PROXY.url = 'http://127.0.0.1:3001';
    
    ENV.APP.PUSHER_KEY = 'a75542ce3e92901ebd79';  

    ENV.torii = {
      providers: {
        'facebook': {
          apiKey: '537396626424595'
        },
        'twitter': {
          requestTokenUri: ENV.PROXY.url + '/twitter'
        }
      }
    };

    ENV.assetsPath = 'assets';

    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'style-src': "'self' 'unsafe-inline'",
      'font-src': "'self'",
      'script-src': "'self' http://stats.pusher.com",
      'connect-src': "'self' http://127.0.0.1:3000 http://127.0.0.1:3001 ws://ws.pusherapp.com"
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
