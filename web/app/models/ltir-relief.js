import DS from 'ember-data';
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  startDate: attr('moment'),
  endDate: attr('moment'),
  startSeasonDay: attr('number'),
  endSeasonDay: attr('number'),

  contractYear: belongsTo('contractYear')
});
