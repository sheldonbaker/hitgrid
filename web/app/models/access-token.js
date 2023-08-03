import DS from 'ember-data';
import Ember from 'ember';

const { attr } = DS;
const { computed } = Ember;
const { alias } = computed;

export default DS.Model.extend({
  value: alias('id'),
  exp: attr(),

  userId: attr(),
  userSecret: attr('string', { writeOnly: true }),

  userEmail: attr('string', { writeOnly: true }),
  userPassword: attr('string', { writeOnly: true }),

  provider: attr('string', { writeOnly: true }),
  authorizationCode: attr('string', { writeOnly: true }),
  redirectUri: attr('string', { witeOnly: true }),
  requestToken: attr('string', { writeOnly: true }),
  requestTokenVerifier: attr('string', { writeOnly: true }),

  accessToken: attr('string', { writeOnly: true }),

  handleAuthorization(authorization) {
    this.setProperties(authorization);
  }
});
