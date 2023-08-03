import Ember from 'ember';
const { get } = Ember;

export default Ember.Component.extend({
  participation: null,
  editable: false,

  actions: {
    updateTeam(team) {
      this.sendAction('updateTeam', get(this, 'participation'), team);
    },

    createIngredient(assetable) {
      this.sendAction('createIngredient', get(this, 'participation'), assetable);
    },

    createAndEditIngredient(assetable) {
      this.sendAction('createAndEditIngredient', get(this, 'participation'), assetable, this);
    },

    editIngredient(ingredient) {
      this.sendAction('editIngredient', ingredient, get(ingredient, 'participation'));
    },

    removeIngredient(ingredient) {
      this.sendAction('removeIngredient', ingredient);
    }
  }
});
