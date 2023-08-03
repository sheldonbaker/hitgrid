import Ember from 'ember';
const { get, computed } = Ember;
const { moment } = window;

export default Ember.Component.extend({
  tradeDeadline: null,
  profileTeams: null,

  joined: computed('tradeDeadline', 'profileTeams.@each.tradeDeadline', function() {
    var tradeDeadline = get(this, 'tradeDeadline');
    var profileTeams = get(this, 'profileTeams') || [];

    return !!profileTeams.find(function(team) {
      return get(team, 'tradeDeadline') === tradeDeadline;
    });
  }),

  isFull: computed('tradeDeadline.{teamsCount,claimedTeamsCount}', function() {
    return get(this, 'tradeDeadline.teamsCount') === get(this, 'claimedTeamsCount');
  }),

  // SMALLTODO: only computes on first check
  isCurrent: computed('tradeDeadline.{startsAt,endsAt}', function() {
    return moment().isBetween(get(this, 'tradeDeadline.startsAt'), get(this, 'tradeDeadline.endsAt'));
  })
});
