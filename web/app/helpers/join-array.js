import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  return params[0].join(params[1] || ', ');
});
