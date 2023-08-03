export default {
  name: 'reading',
  after: 'pusher',

  initialize: function(application) {
    application.inject('service:reading', 'pusher', 'service:pusher');
    application.inject('route', 'reading', 'service:reading');
  }
};
