import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  proposal: null,
  team: null,

  participation: computed('proposal', 'team', function() {
    var teamId = get(this, 'team.id');

    return get(this, 'proposal.participations').find((participation) => {
      return participation.belongsTo('team').id() === teamId;
    });
  }),

  isActionable: computed('proposal.{consented,trade}', function() {
    return get(this, 'proposal.consented') === null && !get(this, 'proposal').belongsTo('trade').id();
  }),

  isInitiatingTeam: computed('proposal', 'team', function() {
    return get(this, 'proposal.initiatingTeam.id') === get(this, 'team.id');
  }),

  cancelled: computed('participation.consenting', function() {
    return get(this, 'participation.consenting') === false;
  })
});
