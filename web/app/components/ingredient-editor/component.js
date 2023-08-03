import Ember from 'ember';
const { get, computed } = Ember;

export default Ember.Component.extend({
  tagName: '',

  ingredient: null,

  componentName: computed('ingredient', function() {
    var model = get(this, 'ingredient.assetable') || get(this, 'ingredient.provisionable');
    return 'ingredient-editors/x-' + model.constructor.modelName.dasherize();
  }),

  actions: {
    update(ingredient, participation, attrs) {
      this.sendAction('update', ingredient, participation, attrs);
    },

    dismiss() {
      this.sendAction('dismiss');
    }
  }
});
