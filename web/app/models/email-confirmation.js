import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({
  userEmail: attr(),
  tokenVerification: attr('string', { writeOnly: true })
});
