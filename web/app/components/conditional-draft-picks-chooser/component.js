import Ember from 'ember';
const { Component, computed, get } = Ember;
const { oneWay, filterBy } = computed;

export default Component.extend({
  participation: null,
  draftPicks: null,

  unengagedAssetables: oneWay('participation.unengagedAssetables'),
  unengagedDraftPicks: filterBy('unengagedAssetables', 'constructor.modelName', 'draft-pick'),

  selectable: computed('draftPicks', 'unengagedDraftPicks', function() {
    return get(this, 'draftPicks').toArray().concat(get(this, 'unengagedDraftPicks').toArray()).uniq();
  })
});