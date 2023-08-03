import Ember from 'ember';
import deferredSendAction from 'hitgrid/utils/deferred-send-action';

const { get, set, computed } = Ember;

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['disabled'],
  disabled: computed('isFulfilling', 'isDisabled', function() {
    return get(this, 'isFulfilling') || get(this, 'isDisabled');
  }),

  isFulfilling: false,
  isDisabled: false,

  click() {
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
  }
});
