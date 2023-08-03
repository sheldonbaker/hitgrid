import Ember from 'ember';

const { Component, get, set, observer } = Ember;
const { Headroom } = window;

export default Component.extend({
  classNames: ['headroom-wrapper'],

  didInsertElement() {
    this.initHeadroom();
  },

  willDestroyElement() {
    this.destroyHeadroom();
  },

  mediaDidChange: observer('media.matches.[]', function() {
    this.destroyHeadroom();
    this.initHeadroom();
  }),

  initHeadroom() {
    var $element = this.$();
    var elementHeight = $element.height();

    var headroom = new Headroom($element.get(0), {
      offset: get(this, 'offset') || elementHeight,
      classes: {
        initial: 'headroom-wrapper',
        pinned: 'headroom-wrapper--pinned',
        unpinned: 'headroom-wrapper--unpinned',
        top: '',
        notTop: ''
      },
      tolerance: {
        up: 0,
        down: 0
      }
    });

    headroom.init();
    set(this, 'headroom', headroom);
  },

  destroyHeadroom() {
    var headroom = get(this, 'headroom');
    
    if (headroom) {
      headroom.destroy();
    }
  }
});
