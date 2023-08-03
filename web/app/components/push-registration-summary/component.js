import Ember from 'ember';
const { inject, get, computed } = Ember;
const { alias } = computed;

export default Ember.Component.extend({
  notifications: inject.service(),
  pushClientId: alias('notifications.pushClientId'),

  registration: null,
  clientMatches: computed('registration.clientId', 'pushClientId', function() {
    return get(this, 'registration.clientId') === get(this, 'pushClientId');
  })
});
