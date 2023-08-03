import Ember from 'ember';
const { get, set, computed } = Ember;
const { equal } = computed;

export default Ember.Component.extend({
  policy: null,
  image: null,

  didReceiveAttrs() {
    if (get(this, 'isAvailable')) {
      var policy = this.store.createRecord('s3Policy');
      policy.save();

      set(this, 'policy', policy);
    }
  },

  initImage(blob) {
    return this.store.createRecord('s3Image', { policy: get(this, 'policy'), blob: blob });
  },

  isAvailable: computed(function() {
    return 'FormData' in window;
  }),

  isEnabled: equal('policy.isNew', false),

  change(e) {
    var file = this.$(e.target)[0].files[0];

    if (file) {
      set(this, 'image', this.initImage(file));
      this.sendAction('createdPromise', get(this, 'image').save());
    } else {
      set(this, 'image', null);
    }

    this.sendAction('imageChanged', get(this, 'image'));
  }
});
