import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: '',

  assets: null,
  universe: null,
  leagueYear: null,

  foos: computed('assets.[]', 'leagueYear', function() {
    var ret = [];
    var leagueYear = get(this, 'leagueYear');
    var assets = get(this, 'assets');

    assets.forEach((asset) => {
      var obj = { asset: asset, contract: get(asset, 'assetable') };
      obj.contractYear = get(asset, 'assetable.contractYears').findBy('leagueYear', leagueYear);

      ret.push(obj);
    });

    return ret;
  })
});