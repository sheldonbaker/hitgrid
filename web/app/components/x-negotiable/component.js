import Ember from 'ember';
import deferredSendAction from 'hitgrid/utils/deferred-send-action';

const { get, computed } = Ember;

export default Ember.Component.extend({
  negotiable: null,
  editable: false,

  sortedParticipations: computed.sort('negotiable.participations', 'initiating'),

  proposableTeams: computed('negotiable', function() {
    return get(this, 'negotiable.tradeDeadline.teams').without(get(this, 'sortedParticipations.firstObject.team.content'));
  }),

  actions: {
    createIngredient(participation, assetable) {
      this.sendAction('createIngredient', participation, assetable);
    },

    createAndEditIngredient(participation, assetable) {
      this.sendAction('createAndEditIngredient', participation, assetable);
    },

    editIngredient(ingredient, participation) {
      this.sendAction('editIngredient', ingredient, participation);
    },

    updateIngredient(ingredient, participation, attrs) {
      this.sendAction('updateIngredient', participation, attrs);
    },

    removeIngredient(ingredient) {
      this.sendAction('removeIngredient', ingredient);
    },

    save() {
      deferredSendAction(this, 'save', get(this, 'negotiable')).then(() => {
        this.sendAction('dismiss');
      });
    }
  }
});
