import DS from 'ember-data';
const { belongsTo } = DS;

export default DS.Model.extend({
  player: belongsTo('player')
});