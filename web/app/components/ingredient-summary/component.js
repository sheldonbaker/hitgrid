import Ember from 'ember';
const { get, computed } = Ember;

export default Ember.Component.extend({
  tagName: '',
  ingredient: null,
  editable: null,

  childComponentName: computed('ingredient', function() {
    if (get(this, 'ingredient.assetable')) {
      return 'ingredient-summaries/assetable-' + get(this, 'ingredient.assetable.constructor.modelName').dasherize();
    } else {
      return 'ingredient-summaries/provisionable-' + get(this, 'ingredient.provisionable.constructor.modelName').dasherize();
    }
  })
});
