import Ember from 'ember';
const { RSVP } = Ember;

export default function(fn) {
  return function(reason) {
    fn(reason);
    RSVP.rethrow(reason);
  };
}
