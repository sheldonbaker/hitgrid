import Ember from 'ember';
const { get, computed } = Ember;

export default Ember.Component.extend({
  activities: null,

  featuredActivities: computed.filterBy('activities', 'featured', true),
  featuredActivity: computed.alias('featuredActivities.firstObject'),

  otherActivities: computed('activities.[]', 'featuredActivity', function() {
    var activities = get(this, 'activities');
    var featuredActivity = get(this, 'featuredActivity');

    if (featuredActivity) {
      activities.splice(activities.indexOf(featuredActivity), 1);
    }

    return activities;
  })
});
