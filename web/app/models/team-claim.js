import DS from 'ember-data';
const { belongsTo } = DS;

export default DS.Model.extend({
  team: belongsTo('team', { async: false }),
  tradeDeadline: belongsTo('tradeDeadline')
});