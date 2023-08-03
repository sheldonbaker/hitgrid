import Ember from 'ember';
const { get, set, RSVP } = Ember;

export default Ember.Controller.extend({
  editingSmsRegistration: false,

  actions: {
    registerSms(registration) {
      set(this, 'editingSmsRegistration', registration);
    },

    save() {
      var model = get(this, 'model');
      return RSVP.all([get(model, 'user').save()].concat(get(model, 'notificationSubscriptions').map((subscription) => {
        // Only save if subscription has a saved registration
        if (!get(subscription, 'registerable.isNew')) {
          return subscription.save();
        } else {
          return RSVP.resolve();
        }
      })));
    }
  }
});
