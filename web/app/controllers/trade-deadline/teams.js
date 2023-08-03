import Ember from 'ember';
const { computed, inject } = Ember;
const { alias } = computed;

export default Ember.Controller.extend({
  application: inject.controller('application'),
  profile: alias('application.profile')
});
