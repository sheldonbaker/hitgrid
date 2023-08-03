import Ember from 'ember';
import DS from 'ember-data';

const { get, getProperties, computed } = Ember;
const { belongsTo } = DS;

export default DS.Model.extend({
  participation: belongsTo('negotiableParticipation', { async: false }),
  
  assetable: belongsTo('assetable', { async: false, polymorphic: true }),
  provisionable: belongsTo('provisionable', { async: false, polymorphic: true }),

  contract: computed('assetable', function() {
    return get(this, 'assetable.constructor.modelName') === 'contract' ? get(this, 'assetable') : null;
  }),

  retainer: computed('provisionable', function() {
    var provisionable = get(this, 'provisionable');
    return provisionable && get(provisionable, 'constructor.modelName') === 'retainer' ? provisionable : null;
  }),

  shortDescription: computed('assetable', 'provisionable', function() {
    var { assetable, provisionable } = getProperties(this, ['assetable', 'provisionable']);
    var desc;

    if (assetable && !provisionable) {
      desc = get(assetable, 'shortDescription');
    } else if (assetable && provisionable) {
      desc = [get(assetable, 'shortDescription'), provisionable.getShortDescriptionForAssetable(assetable)].join(' ');
    } else if (provisionable) {
      desc = get(provisionable, 'shortDescription');
    }

    return desc;
  }),

  allocation: belongsTo('allocation', { async: false })
});
