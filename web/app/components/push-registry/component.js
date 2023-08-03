import Ember from 'ember';
const { get, set, computed, inject, RSVP } = Ember;
const { alias } = computed;

export default Ember.Component.extend({
  notifications: inject.service(),
  permitted: alias('notifications.isPermitted'),
  supported: alias('notifications.isSupported'),

  registrationEnableable: computed('registration.clientId', 'pushClientId', function() {
    return get(this.registration, 'clientId') === get(this.notifications, 'pushClientId');
  }),

  actions: {
    authorizeRegistration() {
      var registration = get(this, 'registration');

      return this.notifications.subscribe().then((subscription) => {
        set(registration, 'endpoint', subscription.endpoint);
        return registration.save();
      }).catch((reason) => {
        return RSVP.rethrow(reason);
      });
    },

    deauthorizeRegistration() {
      var registration = get(this, 'registration');
      set(registration, 'endpoint', null);

      return registration.save().then(() => {
        return this.notifications.unsubscribe();
      });
    },

    verifyPermission() {
      this.notifications.checkPermission();
    }
  }
});
