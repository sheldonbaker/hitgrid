import DS from 'ember-data';
import Negotiable from 'hitgrid/mixins/negotiable';
import Commentable from 'hitgrid/mixins/commentable';

const { attr, belongsTo } = DS;

export default DS.Model.extend(Negotiable, Commentable, {
  tradeDeadline: belongsTo('tradeDeadline'),
  proposal: belongsTo('proposal'),

  playersInvolved: attr('number'),
  draftPicksInvolved: attr('number'),
  compensationInvolved: attr('number')
});