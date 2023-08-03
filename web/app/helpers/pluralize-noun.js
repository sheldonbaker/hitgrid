import Ember from 'ember';
import { singularize, pluralize } from 'ember-inflector';

export default Ember.Helper.helper(function(params) {
  var noun = params[0];
  var count = params[1];
  var inflected = count === 1 ? singularize(noun) : pluralize(noun);

  return new Ember.Handlebars.SafeString(inflected);
});
