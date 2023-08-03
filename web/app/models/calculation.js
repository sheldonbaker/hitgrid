import Ember from 'ember';
import DS from 'ember-data';

const { computed, get } = Ember;
const { alias } = computed;
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  club: belongsTo('club', { async: false }),
  team: belongsTo('team'),
  tradeDeadline: belongsTo('tradeDeadline'),

  date: attr('string'),
  createdAt: attr('moment'),
  createdAtUnix: computed('createdAt', function() {
    return get(this, 'createdAt').unix();
  }),

  contractsCount: attr('number'),

  capUsage: attr('number'),
  capSpace: attr('number'),
  ltirRelief: attr('number'),
  LTIRRelief: alias('ltirRelief'),
  bonusCushionUsage: attr('number'),
  absorbableCapHit: attr('number'),

  tradeDeadlineCapUsage: attr('number'),
  tradeDeadlineCapSpace: attr('number'),
  tradeDeadlineLtirRelief: attr('number'),
  tradeDeadlineLTIRRelief: alias('tradeDeadlineLtirRelief'),
  tradeDeadlineBonusCushionUsage: attr('number'),
  tradeDeadlineAbsorbableCapHit: attr('number'),

  seasonEndCapUsage: attr('number'),
  seasonEndCapSpace: attr('number'),
  seasonEndLtirRelief: attr('number'),
  seasonEndLTIRRelief: alias('seasonEndLtirRelief'),
  seasonEndBonusCushionUsage: attr('number')
});
