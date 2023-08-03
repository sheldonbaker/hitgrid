import Ember from 'ember';
import deferredSendAction from 'hitgrid/utils/deferred-send-action';

const { get, set } = Ember;

export default Ember.Component.extend({
  tagName: 'form',

  isFulfilling: false,

  submit(e) {
    if (e) {
      e.preventDefault();
    }

    var ret;

    if (typeof this.attrs.action === 'function') {
      ret = this.attrs.action();
    } else {
      ret = deferredSendAction(this, 'action');
    }

    if (ret && ret.then) {
      set(this, 'isFulfilling', true);
      
      ret.finally(() => {
        if (!get(this, 'isDestroying')) {
          set(this, 'isFulfilling', false);
        }
      });
    }
  },

  actions: {
    submitConditionally(bool) {
      if (bool) {
        this.submit();
      }
    }
  }
});
