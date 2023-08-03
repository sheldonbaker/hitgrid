import DS from 'ember-data';
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  key: attr(),
  title: attr(),

  imageUrl: attr(),
  featured: attr('boolean'),

  payload: attr('object'),
  tradeDeadline: belongsTo('tradeDeadline')
});