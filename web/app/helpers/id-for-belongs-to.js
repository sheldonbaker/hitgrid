import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  return params[0].belongsTo(params[1]).id();
});
