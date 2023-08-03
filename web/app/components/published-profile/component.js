import Ember from 'ember';
import deferredSendAction from 'hitgrid/utils/deferred-send-action';

const { get, computed } = Ember;

export default Ember.Component.extend({
  profile: null,
  user: null,

  isOwn: computed('user.profile', 'profile', function() {
    return get(this, 'user.profile.id') === get(this, 'profile.id');
  }),

  actions: {
    publish(profile, picturePromise) {
      deferredSendAction(this, 'publish', profile, picturePromise);
    }
  }
});
