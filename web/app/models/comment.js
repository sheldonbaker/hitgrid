import DS from 'ember-data';
import Readable from 'hitgrid/mixins/readable';

const { Model, attr, belongsTo } = DS;

export default Model.extend(Readable, {
  body: attr(),
  commentable: belongsTo('commentable', { polymorphic: true }),
  profile: belongsTo('profile', { async: false }),

  team: belongsTo('team', { async: false }),
  tradeDeadline: belongsTo('tradeDeadline', { async: false }),

  createdAt: attr('moment')
});
