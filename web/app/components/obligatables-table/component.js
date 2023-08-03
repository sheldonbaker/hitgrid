import Ember from 'ember';
const { get, computed } = Ember;

export default Ember.Component.extend({
  obligatables: null,

  childComponentName: computed('obligatables.[]', function() {
    var modelName = get(this, 'obligatables.firstObject.constructor.modelName');
    return modelName ? 'obligatables-table/x-' + modelName.pluralize().dasherize() : null;
  })
});
