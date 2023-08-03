import Ember from 'ember';
import DS from 'ember-data';

const { Mixin, computed, get } = Ember;
const { attr, belongsTo } = DS;
const { moment } = window;

export default Mixin.create({
  leagueYear: belongsTo('leagueYear', { async: false }),
  capCost: attr('number'),
  
  dateRange: computed('startDate', 'endDate', function() {
    return moment.range(get(this, 'startDate'), get(this, 'endDate'));
  })
});
