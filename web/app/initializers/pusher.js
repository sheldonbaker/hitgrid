export default {
  name: 'pusher',

  initialize: function(application) {
    application.inject('service:pusher', 'store', 'service:store');
    application.inject('route', 'pusher', 'service:pusher');
  }
};
