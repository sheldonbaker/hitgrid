export default {
  name: 'toriii',
  after: 'store',

  initialize: function(application) {
    application.inject('component:signup-form', 'torii', 'service:torii');
    application.inject('component:login-form', 'torii', 'service:torii');
  }
};
