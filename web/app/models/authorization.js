import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({
  provider: attr('string'),
  code: attr('string'),
  profile: attr('object')
});
