import Ember from 'ember';
const { Component, computed } = Ember;
const { alias } = computed;

export default Component.extend({
  contract: null,
  contractYear: alias('contract.contractYear2015')
});
