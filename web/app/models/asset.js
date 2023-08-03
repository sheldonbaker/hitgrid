import DS from 'ember-data';
const { belongsTo } = DS;

export default DS.Model.extend({
  club: belongsTo('club'),
  assetable: belongsTo('assetable', { polymorphic: true, async: false })
});