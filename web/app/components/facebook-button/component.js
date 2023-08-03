import Ember from 'ember';
const { Component, get } = Ember;

export default Component.extend({
  tagName: 'button',

  click(e) {
    if (get(this, 'preventDefault')) {
      e.preventDefault();
    }

    this.sendAction('on-click');
  }
});