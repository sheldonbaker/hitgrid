import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  var birthdate = params[0];
  var date = params[1];

  return new Ember.Handlebars.SafeString(date.diff(birthdate, 'years'));
});
