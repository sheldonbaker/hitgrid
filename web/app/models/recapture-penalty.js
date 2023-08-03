import DS from 'ember-data';
const { belongsTo } = DS;

export default DS.Model.extend({
  contract: belongsTo('contract')
});
