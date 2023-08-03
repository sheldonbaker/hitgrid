import Ember from 'ember';
const { get, computed } = Ember;

export default Ember.Component.extend({
  classNames: ['x-feature'],
  attributeBindings: ['style'],

  style: computed(function() {
    return 'background-image: url(' + get(this, 'imageUrl') + ')';
  }),

  imageUrl: computed('activity.imageUrl', function() {
    return '/assets/' + get(this, 'activity.imageUrl');
  })
});
