import Ember from 'ember';
import DS from 'ember-data';
import Readable from 'hitgrid/mixins/readable';

const { attr, belongsTo, hasMany } = DS;
const { get, computed } = Ember;
const { mapBy } = computed;

export default Ember.Mixin.create(Readable, {
  tradeDeadline: belongsTo('tradeDeadline'),
  participations: hasMany('negotiableParticipation'),

  teams: mapBy('participations', 'team'),
  otherTeam(team) {
    return get(get(this, 'participations').find((p) => { return p.belongsTo('team').id() !== get(team, 'id'); }), 'team');
  },
  
  date: attr('moment'),
  consented: attr('nullable-boolean'),
 
  createdAt: attr('moment'),
  createdAtUnix: computed('createdAt', function() {
    return get(this, 'createdAt').unix();
  }),

  // HACK: assumes promise fulfilled
  initiatingTeam: computed('participations.@each.team', function() {
    var participation = get(this, 'participations').findBy('initiating', true);
    
    return participation ? get(participation, 'team.content') : null;
  })
});
