import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['platform', 'browser'],

  platform: 'osx',
  browser: 'chrome'
});