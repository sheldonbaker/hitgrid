import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  return params[0][Math.floor(Math.random() * params[0].length)];
});
