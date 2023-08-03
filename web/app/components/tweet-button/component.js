import Ember from 'ember';
const { Component } = Ember;
const { twttr } = window;

export default Component.extend({
  tradeDeadline: null,

  didInsertElement() {
    if (twttr) {
      twttr.widgets.load();
    }
  }
});
