import Ember from 'ember';

export default Ember.Helper.helper(function(params, namedArgs) {
  var string = params[0];
  var limited = string;
  var limit = namedArgs.limit || 35;

  if (string.length > limit) {
    limited = [string.substr(0, limit), '&hellip;'].join('');
  }

  return new Ember.Handlebars.SafeString(limited);
});
