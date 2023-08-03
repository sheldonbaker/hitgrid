import Ember from 'ember';
import deferredSendAction from 'hitgrid/utils/deferred-send-action';

const { get, set, computed, observer } = Ember;

export default Ember.Component.extend({
  teamClaim: null,
  
  teamToClaimId: null,

  didReceiveAttrs() {
    set(this, 'teamToClaimId', get(this, 'teamClaim.team.id'));
  },

  joinedTeamIdDidChange: observer('teamToClaimId', function() {
    var teamToClaimId = get(this, 'teamToClaimId');

    var team = get(this, 'teamClaim.tradeDeadline.teams').find(function(team) {
      return get(team, 'id') === teamToClaimId;
    });

    set(get(this, 'teamClaim'), 'team', team);
  }),

  teamOptions: computed('teamClaim.tradeDeadline.teams.@each.profile', function() {
    return get(this, 'teamClaim.tradeDeadline.teams').map(function(team) {
      return {
        id: get(team, 'id'),
        text: get(team, 'club.abbr'),
        description: get(team, 'club.fullName'),
        disabled: get(team, 'claimed')
      };
    });
  }),

  actions: {
    save() {
      return deferredSendAction(this, 'claimTeam', get(this, 'teamClaim')).then(() => {
        this.sendAction('dismiss');
      });
    }
  }
});
