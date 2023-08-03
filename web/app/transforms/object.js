import Ember from 'ember';
import DS from 'ember-data';
const { $ } = Ember;
const { humps } = window;

export default DS.Transform.extend({
  serialize: function(value) {
    if (!$.isPlainObject(value)) {
      return {};
    } else {
      return humps.decamelizeKeys(value);
    }
  },
  
  deserialize: function(value) {
    if (!$.isPlainObject(value)) {
      return {};
    } else {
      return humps.camelizeKeys(value);
    }
  }
});