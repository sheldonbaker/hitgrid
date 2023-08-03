import DS from 'ember-data';
import Feedable from 'hitgrid/mixins/feedable';

const { attr, belongsTo } = DS;

export default DS.Model.extend(Feedable, {
  key: attr(),
  payload: attr('object'),

  reporter: attr(),
  tradeDeadline: belongsTo('tradeDeadline'),

  createdAt: attr('moment')
});
