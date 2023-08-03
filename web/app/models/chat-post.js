import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  tradeDeadline: belongsTo('tradeDeadline'),
  team: belongsTo('team', { async: false }),

  body: attr(),
  createdAt: attr('moment')
});