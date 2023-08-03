import Ember from 'ember';
const { get, getProperties, set } = Ember;

export default Ember.Component.extend({
  ingredient: null,
  participation: null,
  
  contingency: null,

  didReceiveAttrs() {
    var contingency = this.store.createRecord('contingency');
    get(contingency, 'draftPicks').addObject(get(this, 'ingredient.assetable'));

    set(this, 'contingency', contingency);
  },

  actions: {
    commit() {
      this.sendAction('update', get(this, 'ingredient'), get(this, 'participation'), getProperties(this, ['contingency']));
      this.sendAction('dismiss');
    }
  }
});