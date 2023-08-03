import Ember from 'ember';
import DS from 'ember-data';

const { computed, get, set } = Ember;
const { alias } = computed;
const { attr } = DS;

export default Ember.Mixin.create({
  isReadable: true,

  // shouldn't be private since it can be null
  // i.e., pusher can't tell us if it's read or not
  unread: attr('nullable-boolean', { defaultValue: null }),

  read: computed('unread', {
    get() {
      return get(this, 'unread') === null ? false : !get(this, 'unread');
    },

    set(key, value) {
      set(this, 'unread', !value);
      return value;
    }
  }),
  seen: alias('read'),

  markAsRead() {
    set(this, 'read', true);
    this.save();
  }
});
