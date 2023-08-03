import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  policy: belongsTo('s3Policy'),
  blob: attr(),

  uploadCompleted: 0,
  uploadTotal: 0,
});
