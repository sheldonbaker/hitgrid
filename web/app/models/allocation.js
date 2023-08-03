import Ember from 'ember';
import DS from 'ember-data';
import Obligatable from 'hitgrid/mixins/obligatable';

const { get, computed } = Ember;
const { alias } = computed;
const { attr, belongsTo } = DS;
const { moment } = window;

export default DS.Model.extend(Obligatable, {
  capHit: attr('number'),
  seasonDays: attr('number'),
  startDate: attr('moment'),
  endDate: attr('moment'),

  startSeasonDay: attr('number'),
  endSeasonDay: attr('number'),

  loaned: attr('boolean'),
  suspended: attr('boolean'),
  
  onSoir: attr('boolean'),
  onSOIR: alias('onSoir'),

  retained: attr('boolean'),
  retainedPct: attr(),

  contractYear: belongsTo('contractYear', { async: false }),
  contract: alias('contractYear.contract'),

  fullDays: computed('seasonDays', 'loaned', 'suspended', 'onSOIR', function() {
    return !get(this, 'loaned') && !get(this, 'suspended') && !get(this, 'onSOIR') ? get(this, 'seasonDays') : 0;
  }),

  loanedDays: computed('seasonDays', 'loaned', function() {
    return get(this, 'loaned') ? get(this, 'seasonDays') : 0;
  }),

  suspendedDays: computed('seasonDays', 'suspended', function() {
    return get(this, 'suspended') ? get(this, 'seasonDays') : 0;
  }),

  onSOIRDays: computed('seasonDays', 'onSOIR', function() {
    return get(this, 'onSOIR') ? get(this, 'seasonDays') : 0;
  }),

  occursOn(date) {
    return !(moment(date).isBefore(get(this, 'startDate')) || moment(date).isAfter(get(this, 'endDate')));
  },

  onIr: attr('boolean'),
  onIR: alias('onIr'),

  onLtir: attr('boolean'),
  onLTIR: alias('onLtir'),

  // cap hit *if there was no retention*
  // useful for calculating amount of caphit dumped during trades
  // since all our retention pcts are relative to the initial contract
  // regardless of how many times the contract was retained
  unretainedCapHit: computed('capHit', 'retained', 'retainedPct', function() {
    if (get(this, 'retained')) {
      if (get(this, 'retainedPct') === 0) {
        return get(this, 'capHit');
      } else {
        return get(this, 'capHit') * (100 / get(this, 'retainedPct'));
      }
    } else {
      return get(this, 'capHit');
    }
  })
});
