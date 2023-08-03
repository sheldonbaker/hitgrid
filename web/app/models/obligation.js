import DS from 'ember-data';
const { belongsTo } = DS;

export default DS.Model.extend({
  obligatable: belongsTo('obligatable', { polymorphic: true, async: false })  
});
