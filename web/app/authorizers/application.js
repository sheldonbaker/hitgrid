import Ember from 'ember';
const { get } = Ember;
var sprintf = window.sprintf;

export default Ember.Object.extend({
  authorize(opts /*, originalOptions, jqXHR */) {
    var options = opts || {};

    var authHeader;
    var token = get(this.session, 'accessToken');
    var anonymousId = get(this.session, 'anonymousId');

    if (token) {
      authHeader = sprintf('Token token="%s"', get(token, 'value'));
    } else if (anonymousId) {
      authHeader = sprintf('Token token="", anonymous_id="%s"', anonymousId);
    }

    if (authHeader) {
      if (!options.headers) {
        options.headers = {};
      }

      options.headers['Authorization'] = authHeader;
    }

    return options;
  }
});
