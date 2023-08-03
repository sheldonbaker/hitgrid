import Ember from 'ember';
const { computed } = Ember;

var Cookies = window.Cookies;

export default function(storeKey) {
  return computed({
    get() {
      return Cookies.get(storeKey);
    },

    set(key, value) {
      if (value === null) {
        return Cookies.remove(storeKey);
      } else {
        return Cookies.set(storeKey, value);
      }
    }
  });
}