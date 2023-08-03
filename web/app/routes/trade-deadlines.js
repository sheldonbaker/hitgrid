import Ember from 'ember';
import authenticatedAction from 'hitgrid/utils/authenticated-action';
import returnPromise from 'hitgrid/utils/deferred-receive-action';

const { get, set } = Ember;

export default Ember.Route.extend({
  afterModel() {
    this.pusher.open('trade-deadlines');
  },

  deactivate() {
    this.pusher.close('trade-deadlines');
  },

  actions: {
    joinTradeDeadline: authenticatedAction('publishedProfile', function(tradeDeadline, preferredClub) {
      return get(tradeDeadline, 'teams').then((teams) => {
        var teamClaim = this.store.createRecord('teamClaim', {
          tradeDeadline: tradeDeadline
        });

        set(teamClaim, 'team', teams.find((team) => {
          return !get(team, 'claimed') && get(team, 'club') === preferredClub;
        }));

        set(this.controllerFor('tradeDeadlines'), 'teamClaim', teamClaim);
      });
    }),

    claimTeam: returnPromise(function(teamClaim) {
      return teamClaim.save().then((claim) => {
        this.send('flash', "Cool! You've signed up for this trade deadline");
        this.transitionTo('trade-deadline', get(claim, 'team').belongsTo('tradeDeadline').id());
      });
    })
  }
});
