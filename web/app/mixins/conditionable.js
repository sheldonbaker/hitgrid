import Ember from 'ember';
import DS from 'ember-data';
const { _ } = window;

const { Mixin, computed, get } = Ember;
const { attr, hasMany } = DS;

export default Mixin.create({
  draftPicks: hasMany('draftPick', { async: false }),
  condition: attr(),

  shortDescription: computed('draftPicks.[]', function() {
    var maxRoundPick = _.maxBy(get(this, 'draftPicks').toArray(), function(dp) {
      return get(dp, 'round');
    });

    return ["cond'l", get(maxRoundPick, 'ordinalizedRound')].join(' ');
  })
});
