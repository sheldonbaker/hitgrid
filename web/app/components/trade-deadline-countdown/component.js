import Ember from 'ember';

const { Component, get, set, inject } = Ember;
const { moment } = window;

export default Component.extend({
  clock: inject.service(),

  tradeDeadline: null,

  willStart: false,
  didEnd: false,
  isOngoing: false,

  time: null,

  didReceiveAttrs() {
    var deadline = get(this, 'tradeDeadline');
  
    if (get(deadline, 'endsAt').isBefore(moment())) {
      set(this, 'didEnd', true);
    } else if (get(deadline, 'startsAt').isAfter(moment())) {
      set(this, 'willStart', true);
    } else {
      set(this, 'isOngoing', true);
    }

    if (get(this, 'willStart') || get(this, 'isOngoing')) {
      this.tick();
      this.addObserver('clock.second', this, 'tick');
    }
  },

  didInsertElement() {
    if (get(this, 'willStart') || get(this, 'isOngoing')) {
      get(this, 'clock'); // HACK - kick off the clock?
    }
  },

  tick() {
    var ms;

    if (get(this, 'willStart')) {
      ms = moment.utc(get(this, 'tradeDeadline.startsAt')).diff();
      
      if (ms <= 1000) {
        set(this, 'willStart', false);
        set(this, 'isOngoing', true);
      }
    } else if (get(this, 'isOngoing')) {
      ms = moment.utc(get(this, 'tradeDeadline.endsAt')).diff();
      
      if (ms <= 1000) {
        set(this, 'isOngoing', false);
        set(this, 'didEnd', true);
        this.removeObserver('clock.second', this, 'tick');
      }
    }

    set(this, 'time', moment.utc(ms));
  },

  willDestroyElement() {
    this.removeObserver('clock.second', this, 'tick');
  }
});
