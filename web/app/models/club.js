import Ember from 'ember';
import DS from 'ember-data';

const { get, computed } = Ember;
const { Model, attr } = DS;

export default Model.extend({
  abbr: attr(),
  geographicName: attr(),
  distinctiveName: attr(),

  fullName: computed('geographicName', 'distinctiveName', function() {
    return [get(this, 'geographicName'), get(this, 'distinctiveName')].join(' ');
  })
});
