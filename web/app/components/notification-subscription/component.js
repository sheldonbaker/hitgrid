import Ember from 'ember';
const { get, set, observer } = Ember;

export default Ember.Component.extend({
  classNames: ['notification-subscription'],

  registrationChanged: observer('subscription.registerable.enabled', function() {
    var subscription = get(this, 'subscription');
    var registerable = get(subscription, 'registerable');
    
    if (!get(registerable, 'enabled')) {
      set(subscription, 'enabled', false);
    }
  })
});
