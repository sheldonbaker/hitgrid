import Ember from 'ember';
import storeLocally from 'hitgrid/utils/computed/store-locally';

const { Component, get, set } = Ember;

export default Component.extend({
  autofocus: false,

  newPostBody: '',
  submitOnEnter: storeLocally('submit-on-enter', false),

  didInsertElement() {
    if (get(this, 'autofocus')) {
      this.$('textarea').focus();
    }
  },

  actions: {
    submit() {
      return this.attrs.addPost(get(this, 'newPostBody')).then(() => {
        set(this, 'newPostBody', '');
      });
    }
  }
});
