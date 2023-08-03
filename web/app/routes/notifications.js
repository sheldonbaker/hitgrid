import Ember from 'ember';
const { get, RSVP } = Ember;

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      user: get(this.session, 'userPromise'),
      notificationSubscriptions: this.notifications.getSubscriptions()
    });
  },

  actions: {
    
  }
});
