import DS from 'ember-data';
const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  handle: attr(),
  suggestedHandle: attr(),

  tempPictureUrl: attr('string', { readOnly: true }),
  pictureUrl: attr('string', { readOnly: true }),
  rawPicture: belongsTo('s3Image', { writeOnly: true }),

  favouriteClub: belongsTo('club', { async: false }),
  published: attr('boolean', { readOnly: true }),

  teams: hasMany('team'),

  createdAt: attr('moment')
});
