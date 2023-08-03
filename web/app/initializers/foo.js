export default {
  name: 'foo',
  after: 'store',

  initialize: function(application) {
    application.inject('component', 'store', 'service:store');
  }
};
