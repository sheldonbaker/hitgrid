import DS from 'ember-data';

export default DS.Transform.extend({
  serialize: function(deserialized) {
    if (deserialized) {
      return window.moment.utc(deserialized).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    } else {
      return null;
    }
  },
  
  deserialize: function(serialized) {
    if (serialized) {
      return window.moment.utc(serialized);
    } else {
      return null;
    }
  }
});