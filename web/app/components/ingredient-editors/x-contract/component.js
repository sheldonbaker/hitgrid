import Ember from 'ember';
const { get, getProperties, set } = Ember;

export default Ember.Component.extend({
  ingredient: null,
  
  retainer: null,

  minAbsolutePct: 1,
  maxAbsolutePct: 50, // TODOTODOTODO

  didReceiveAttrs() {
    var pct = get(this, 'ingredient.retainer.absolutePct');
    var retainer = this.store.createRecord('retainer');

    if (pct) {
      set(retainer, 'absolutePct', pct);
    }

    set(this, 'retainer', retainer);
  },

  didInsertElement() {
    this.$('input').eq(0).focus();
  },

  actions: {
    commit() {
      this.sendAction('update', get(this, 'ingredient'), get(this, 'participation'), getProperties(this, ['retainer']));
      this.sendAction('dismiss');
    }
  }
});