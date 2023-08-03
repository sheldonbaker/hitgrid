import Ember from 'ember';
import StateManager from './state-manager';

const { get, set, on, merge } = Ember;

export default Ember.Component.extend({
  classNames: ['auth-interstitial'],

  stateManager: null,
  user: null,
  require: null,
  requireDeferred: null,

  initStateManager: on('init', function() {
    var properties = this.getProperties('user store require'.w());
    set(this, 'stateManager', StateManager.create(merge({ component: this }, properties)));
    
    set(this, 'context', get(this, 'stateManager'));
    set(this, 'controller', get(this, 'stateManager'));
  }),

  requirementFulfilled() {
    this.sendAction('dismiss');
    get(this, 'requireDeferred').resolve(get(this, 'user'));
  },

  aborted() {
    this.sendAction('dismiss');
    get(this, 'requireDeferred').reject();
  },

  actions: {
    outsideClick() {
      this.aborted();
    },

    escape() {
      this.aborted();
    }
  }
});