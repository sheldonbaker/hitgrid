import Registration from './registration';
import DS from 'ember-data';
const { attr } = DS;

export default Registration.extend({
  endpoint: attr('string'),
  clientId: attr('string'),
  userAgent: attr('string')
});
