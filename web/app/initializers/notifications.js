export default {
  name: 'notifications',

  initialize: function(application) {
    application.inject('service:notifications', 'store', 'service:store');
    application.inject('service:notifications', 'session', 'service:session');
    application.inject('component', 'notifications', 'service:notifications');
    application.inject('route', 'notifications', 'service:notifications');
  }
};
