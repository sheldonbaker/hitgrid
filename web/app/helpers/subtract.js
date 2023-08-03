import Ember from 'ember';

export default Ember.Helper.helper(function(params, namedParams) {
  return Math.max(params[0] - params[1], (namedParams.min || null));
});
