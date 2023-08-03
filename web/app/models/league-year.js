import Ember from 'ember';
import DS from 'ember-data';

const { computed, get } = Ember;
const { attr } = DS;
const { moment } = window;

export default DS.Model.extend({
  startDate: attr('moment'),
  endDate: attr('moment'),

  lowerLimit: attr('number'),
  upperLimit: attr('number'),
  bonusCushion: attr('number'),

  tradeDeadlineDate: attr('moment'),
  seasonStartDate: attr('moment'),
  seasonEndDate: attr('moment'),
  seasonDays: attr('number'),

  seasonDates: computed('seasonStartDate', 'seasonEndDate', function() {
    var dates = [];

    moment.range(get(this, 'seasonStartDate'), get(this, 'seasonEndDate')).by('days', function(m) {
      dates.push(m.format('YYYY-MM-DD'));
    });

    return dates;
  }),

  seasonLabel: computed('id', function() {
    return [get(this, 'id'), (+get(this, 'id') + 1).toString().slice(2)].join('-');
  })
});
