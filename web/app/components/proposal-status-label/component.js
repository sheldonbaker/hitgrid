import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: 'span',
  classNameBindings: [':label--square', 'labelClass'],

  proposal: null,
  participation: null,

  labelClass: computed('status', function() {
    return ['label', get(this, 'status')].join('--');
  }),

  status: computed('proposal.consented', function() {
    var proposal = get(this, 'proposal');
    var participation = get(this, 'participation');
    
    if (proposal.belongsTo('counter').id()) {
      return 'countered';
    } else {
      if (get(proposal, 'consented') === false) {
        return get(participation, 'consenting') === false ? 'cancelled' : 'rejected';
      } else {
        return get(proposal, 'consented') ? 'accepted' : 'pending';
      }
    }
  })
});
