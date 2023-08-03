import Ember from 'ember';
const { computed } = Ember;

var store = window.store;

export default function(storeKey, d) {
  var defaultValue = d;

  if (store.enabled && !store.has(storeKey)) {
    store.set(storeKey, defaultValue);
  }

  return computed({
    get() {
      if (store.enabled) {
        return store.get(storeKey);
      } else {
        return defaultValue;
      }
    },

    set(key, value) {
      if (store.enabled) {
        if (value === null) {
          store.remove(storeKey);
        } else {
          store.set(storeKey, value);
        }
      } else {
        defaultValue = value;
      }

      return value;
    }
  });
}