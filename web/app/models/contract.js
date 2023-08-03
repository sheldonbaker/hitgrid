import Ember from 'ember';
import DS from 'ember-data';
import Assetable from 'hitgrid/mixins/assetable';

const { computed, get } = Ember;
const { alias, not } = computed;
const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend(Assetable, {
  player: belongsTo('player', { async: false }),
  assetName: alias('player.abbrName'),

  value: attr('number'),
  avgPerformanceBonuses: attr('number'),

  isEntryLevel: attr('boolean'),
  isTwoWay: attr('boolean'),
  isOneWay: not('isTwoWay'),
  is35Plus: attr('boolean'),

  contractYears: hasMany('contractYear', { async: false }),

  // HACK
  contractYear2015: computed('contractYears', function() {
    return get(this, 'contractYears').find((contractYear) => {
      return contractYear.belongsTo('leagueYear').id() === '2015';
    });
  }),

  shortDescription: alias('player.lastName')
});
