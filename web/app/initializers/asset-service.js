export default {
  name: 'asset-service',

  initialize: function(application) {
    application.inject('component', 'assets', 'service:asset');
  }
};
