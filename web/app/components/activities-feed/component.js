import Ember from 'ember';
const { get, computed } = Ember;

export default Ember.Component.extend({
  activitiesWithAds: computed('activities.[]', 'ads.[]', function() {
    return get(this, 'activities');
  })
});
