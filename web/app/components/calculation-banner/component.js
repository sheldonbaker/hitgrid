import Ember from 'ember';
const { Component, computed } = Ember;
const { alias } = computed;

export default Component.extend({
  calculation: null,
  calc: alias('calculation')
});
