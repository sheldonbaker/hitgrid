import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  var moment = params[0];
  var fromNow = moment.fromNow();

  return new Ember.Handlebars.SafeString(fromNow);
});
