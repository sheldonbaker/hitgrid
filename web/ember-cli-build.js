/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'bower_components/bootstrap/scss',
      ]
    },

    emberCliFontAwesome: {
      useScss: true
    },

    svg: {
      paths: ['public/assets/logos']
    }
  });

  app.import('bower_components/bootstrap/js/dist/util.js');
  app.import('bower_components/bootstrap/js/dist/dropdown.js');
  app.import('bower_components/bootstrap/js/dist/tooltip.js');

  app.import('bower_components/lodash/lodash.js');
  app.import('bower_components/moment-range/dist/moment-range.js');

  app.import('bower_components/store-js/store.js');
  app.import('bower_components/jwt-decode/build/jwt-decode.min.js');
  app.import('bower_components/headroom.js/dist/headroom.min.js');

  app.import('bower_components/js-cookie/src/js.cookie.js');

  app.import('bower_components/sprintf/src/sprintf.js');
  app.import('bower_components/humps/humps.js');

  app.import('bower_components/pusher/dist/pusher.js');

  return app.toTree();
};
