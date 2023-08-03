import DS from 'ember-data';
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  contract: belongsTo('contract'),
  absolutePct: attr('number')
});
