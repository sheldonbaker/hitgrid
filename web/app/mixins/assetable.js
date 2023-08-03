import Ember from 'ember';
const { computed } = Ember;
const { alias } = computed;

export default Ember.Mixin.create({
  name: alias('assetName')
});
