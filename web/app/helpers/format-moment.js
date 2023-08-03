import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  var format = params[1] || "YYYY-MM-DD HH:mm";
  var formatted = params[0].format(format);

  return new Ember.Handlebars.SafeString(formatted);
});
