import Ember from 'ember';
import DS from 'ember-data';

const { attr } = DS;
const { get, computed } = Ember;

export default DS.Model.extend({
  firstName: attr(),
  lastName: attr(),

  fullName: computed('firstName', 'lastName', function() {
    return [get(this, 'firstName'), get(this, 'lastName')].join(' ');
  }),

  abbrName: computed('firstName', 'lastName', function() {
    return [get(this, 'firstName')[0] + '.', get(this, 'lastName')].join(' ');
  }),

  position: attr(),
  generalPosition: computed('position', function() {
    return ['LW', 'C', 'RW'].contains(get(this, 'position')) ? 'F' : get(this, 'position');
  }),

  birthdate: attr('moment')
});
