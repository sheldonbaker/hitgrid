import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  var formatted = '';
  var money = params[0];
  
  if (money || money === 0) {
    formatted = '$' + Math.round(money).toLocaleString();
  }

  return new Ember.Handlebars.SafeString(formatted);
});
