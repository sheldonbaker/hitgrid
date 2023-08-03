import Ember from 'ember';
import Readable from 'hitgrid/mixins/readable';
import DS from 'ember-data';

const { computed, get } = Ember;
const { attr, belongsTo } = DS;

export default DS.Model.extend(Readable, {
  sender: belongsTo('team', { async: false }),
  receiver: belongsTo('team', { async: false }),

  body: attr(),
  proposal: belongsTo('proposal'),

  isWith(team) {
    return this.belongsTo('sender').id() === get(team, 'id') || this.belongsTo('receiver').id() === get(team, 'id');
  },

  createdAt: attr('moment'),
  createdAtUnix: computed('createdAt', function() {
    return get(this, 'createdAt').unix();
  })
});
