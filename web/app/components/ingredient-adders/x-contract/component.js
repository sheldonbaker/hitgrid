import Ember from 'ember';
const { get, set, observer } = Ember;

export default Ember.Component.extend({
  assetable: null,
  allocation: null,
  engagedAssetables: null,

  didReceiveAttrs() {
    this.computedAdded();
  },

  computedAdded: observer('engagedAssetables.[]', function() {
    set(this, 'isAdded', get(this, 'engagedAssetables').contains(get(this, 'assetable')));
  }),

  actions: {
    add() {
      this.sendAction('add', get(this, 'assetable'));
    },

    addAndEdit() {
      this.sendAction('addAndEdit', get(this, 'assetable'));
    }
  }
});