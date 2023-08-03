import Ember from 'ember';
const { get, computed } = Ember;

export default Ember.Component.extend({
  team: null,

  latestCalculation: computed('team.calculations.[]', function() {
    return get(get(this, 'team.calculations').toArray().sortBy('createdAt').reverse(), 'firstObject');
  }),

  obligatablesForLeagueYear: computed('team.obligatables.[]', function() {
    return get(this, 'team.obligatables').filterBy('leagueYear.id', get(this, 'team').belongsTo('leagueYear').id());
  }),

  obligatablesForLeagueYears: computed('team.obligatables.[]', function() {
    var id = get(this, 'team').belongsTo('leagueYear').id();

    return get(this, 'team.obligatables').filter((ob) => {
      return get(ob, 'leagueYear.id') >= id;
    });
  })
});
