import Ember from 'ember';
import groupBy from 'hitgrid/utils/group-by';
const { get, computed } = Ember;

export default Ember.Component.extend({
  tagName: '',

  objects: null,
  groupPath: null,
  sortKeys: null,

  yieldEach: true,

  groups: computed('objects.[]', 'groupPath', function() {
    return groupBy(get(this, 'objects'), get(this, 'groupPath'), get(this, 'sortKeys'));
  }),

  // TODO - removeObserver
  didReceiveAttrs() {
    this.addObserver('objects.@each.' + get(this, 'groupPath'), this, this.recomputeGroups);
  },

  recomputeGroups() {
    // TODO - batch/debounce?
    this.notifyPropertyChange('groups');
  }
});