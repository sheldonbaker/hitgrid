import Ember from 'ember';
const { get } = Ember;

export default Ember.Component.extend({
  asset: null,

  childComponentName: function() {
    var asset = get(this, 'asset');

    if (asset) {
      return ['assets', 'x-' + get(asset, 'assetable.constructor.modelName')].join('/');
    } else {
      return null;
    }
  }.property('asset')
});
