import Registration from './registration';
import DS from 'ember-data';

const { attr } = DS;

export default Registration.extend({
  phoneNumber: attr('string'),
  
  verifiableAt: attr('moment', { readOnly: true }),
  verifiedAt: attr('moment', { readOnly: true }),

  verificationCode: attr('string', { writeOnly: true }),
  enabled: attr('boolean')
});
