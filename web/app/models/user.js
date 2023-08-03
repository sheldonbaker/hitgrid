import DS from 'ember-data';
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  secret: attr('string'),

  email: attr('string'),
  password: attr('string', { writeOnly: true }),
  
  provider: attr('string', { writeOnly: true }),
  authorizationCode: attr('string', { writeOnly: true }),
  redirectUri: attr('string', { witeOnly: true }),
  requestToken: attr('string', { writeOnly: true }),
  requestTokenVerifier: attr('string', { writeOnly: true }),

  twitterId: attr('string'),
  facebookId: attr('string'),

  claimed: attr('boolean'),

  subscribedToUpdates: attr('boolean'),
  
  profile: belongsTo('profile', { async: false }),

  handleAuthorization(authorization) {
    this.setProperties(authorization);
  }
});
