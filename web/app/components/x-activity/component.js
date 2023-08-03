import Ember from 'ember';
const { get } = Ember;

export default Ember.Component.extend({
  activity: null,

  childComponentName: function() {
    var activity = get(this, 'activity');

    if (activity) {
      return ['activities', get(activity, 'key')].join('/');
    } else {
      return null;
    }
  }.property('activity.key')
});
