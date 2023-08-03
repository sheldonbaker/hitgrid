import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({
  key: attr(),
  bucket: attr(),
  acl: attr(),

  awsAccessKeyId: attr(),
  contentType: attr(),

  policy: attr(),
  signature: attr()
});
