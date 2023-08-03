import Ember from 'ember';
const { get, computed, observer } = Ember;
const { oneWay } = computed;

export default Ember.Component.extend({
  teams: null,
  team: null,

  value: oneWay('team'),

  valueDidChange: observer('value', function() {
    this.sendAction('on-select', get(this, 'value'));
  })
});
