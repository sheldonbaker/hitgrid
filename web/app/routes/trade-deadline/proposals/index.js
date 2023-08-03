import Ember from 'ember';
const { Route, RSVP, get, setProperties, $ } = Ember;

export default Route.extend({
  setupController(controller, hash) {
    setProperties(controller, hash);
  },

  model() {
    var { team } = this.modelFor('tradeDeadline');
    var teamId = get(team, 'id');

    return new RSVP.hash({
      team: team,
      proposals: this.store.filter('proposal', { include: 'participations', team_id: teamId }, function(proposal) {
        return !get(proposal, 'isNew') && proposal.hasMany('participations')._isLoaded() && get(proposal, 'participations').any((participation) => {
          return participation.belongsTo('team').id() === teamId;
        });
      })
    });
  },

  actions: {
    fetchMore(sortedProposals) {
      var earliestCreatedAt = get(sortedProposals, 'lastObject.createdAtUnix');
      var query = $.extend(true, { created_by: earliestCreatedAt }, get(this.controller, 'model.query'));

      return this.store.query('proposal', query);
    }
  }
});
