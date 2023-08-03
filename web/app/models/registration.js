import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { attr } = DS;

export default DS.Model.extend({
  enabled: attr('boolean', { readOnly: true }),
  disabled: computed.not('enabled'),
});
