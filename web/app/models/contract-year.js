import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { alias } = computed;
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  contract: belongsTo('contract', { async: false }),
  leagueYear: belongsTo('leagueYear', { async: false }),

  avgValue: attr('number'),
  avgPerformanceBonuses: alias('contract.avgPerformanceBonuses'),

  nhlSalary: attr('number'),
  NHLSalary: alias('nhlSalary'),
  minorSalary: attr('number'),

  signingBonus: attr('number'),
  maxPerformanceBonuses: attr('number'),

  hasNtc: attr('boolean'),
  hasNTC: alias('hasNtc'),

  hasNmc: attr('boolean'),
  hasNMC: alias('hasNmc')
});
