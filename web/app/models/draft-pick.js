import Ember from 'ember';
import DS from 'ember-data';
import Assetable from 'hitgrid/mixins/assetable';

const { attr, belongsTo } = DS;
const { get, computed } = Ember;
const { alias } = computed;

export default DS.Model.extend(Assetable, {
  round: attr('string'),
  club: belongsTo('club', { async: false }),
  leagueYear: belongsTo('leagueYear', { async: false }),

  ordinalizedRound: computed('round', function() {
    var round = get(this, 'round');
    var lookup = { 1: 'st', 2: 'nd', 3: 'rd', 4: 'th', 5: 'th', 6: 'th', 7: 'th' };

    return round + lookup[round];
  }),

  description: computed('season', 'round', 'club', function() {
    var year = +this.belongsTo('leagueYear').id() + 1;
    var ordinalizedRound = get(this, 'ordinalizedRound');

    var clubAbbr = get(this, 'club.abbr');
    
    return [year, clubAbbr, ordinalizedRound].compact().join(' ');
  }),

  shortDescription: alias('description'),
  assetName: alias('description')
});
