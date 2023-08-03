export default {
  name: 'service-worker',

  initialize: function() {
    if ('serviceWorker' in navigator) {
      // navigator.serviceWorker.register('./service-worker.js'); // TODO (temp)
    }
  }
};
