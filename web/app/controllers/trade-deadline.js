import Ember from 'ember';
const { inject, get, computed } = Ember;
const { alias } = computed;

export default Ember.Controller.extend({
  application: inject.controller('application'),
  profile: alias('application.profile'),

  model: null,
  newProposal: null,

  teamForProfile: computed('model', 'profile.teams.@each.tradeDeadlineId', function() {
    return get(this, 'profile.teams').findBy('tradeDeadline', get(this, 'model'));
  })
});
