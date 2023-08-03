import DS from 'ember-data';
const { BooleanTransform } = DS;

export default BooleanTransform.extend({
  deserialize: function(serialized) {
    if (serialized === null) {
      return null;
    }

    return this._super(serialized);
  },

  serialize: function(deserialized) {
    if (deserialized === null) {
      return null;
    }
    
    return this._super(deserialized);
  }
});
