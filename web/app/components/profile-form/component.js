import Ember from 'ember';
import deferredSendAction from 'hitgrid/utils/deferred-send-action';

const { get, getProperties, set, setProperties } = Ember;

export default Ember.Component.extend({
  'on-submit': null,

  profile: null,
  picturePromise: null,

  handle: null,
  favouriteClub: null,

  didReceiveAttrs() {
    var profile = get(this, 'profile');
    setProperties(this, getProperties(get(this, 'profile'), ['handle', 'favouriteClub']));

    if (!get(profile, 'handle') && get(profile, 'suggestedHandle')) {
      set(this, 'handle', get(profile, 'suggestedHandle'));
    }
  },

  actions: {
    submit() {
      deferredSendAction(this, 'on-submit', get(this, 'profile'), this.getProperties(['handle', 'favouriteClub']));
    }
  }
});
