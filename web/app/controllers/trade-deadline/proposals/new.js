import Ember from 'ember';
const { get, set } = Ember;

export default Ember.Controller.extend({
  queryParams: {
    clubAbbr: 'club'
  },

  clubAbbr: null,

  actions: {
    updateParticipationTeam(participation, team) {
      if (get(participation, 'initiating') === false) {
        set(participation, 'team', team);
        get(participation, 'ingredients').clear();
        
        set(this, 'clubAbbr', get(team, 'club.abbr'));
      }
    }
  }
});
