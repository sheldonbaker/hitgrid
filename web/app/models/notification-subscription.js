import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  channel: attr('string'),

  enabled: attr('boolean', { defaultValue: false }),
  disabled: computed.not('enabled'),

  registerable: belongsTo('registration', { polymorphic: true, async: false })
});
