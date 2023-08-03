import Ember from 'ember';
import DS from 'ember-data';

const { get, computed } = Ember;
const { mapBy, setDiff } = computed;
const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  negotiable: belongsTo('negotiable', { async: false, polymorphic: true }),
  ingredients: hasMany('negotiableIngredient', { async: false }),

  initiating: attr('boolean', { defaultValue: false }),
  consenting: attr('nullable-boolean', { defaultValue: null }),

  team: belongsTo('team'),

  engagedAssetables: computed('team', '_engagedAssetablesKey', function() {
    var ret = [];
    var ingredients = get(this, 'ingredients');

    ingredients.forEach((ingredient) => {
      var { assetable, provisionable } = ingredient.getProperties(['assetable', 'provisionable']);
      
      if (assetable) {
        ret.push(assetable);

        if (assetable.constructor.modelName === 'retainer') {
          ret.push(get(assetable, 'contract'));
        } else if (assetable.constructor.modelName === 'conditional') {
          get(assetable, 'draftPicks').forEach((draftPick) => {
            ret.push(draftPick);
          });
        }
      } else if (provisionable) {
        if (provisionable.constructor.modelName === 'contingency') {
          get(provisionable, 'draftPicks').forEach((draftPick) => {
            ret.push(draftPick);
          });
        }
      }
    });

    return ret;
  }),

  assetables: mapBy('team.assets', 'assetable'),
  unengagedAssetables: setDiff('assetables', 'engagedAssetables'),

  recomputeEngagedAssetables() {
    this.notifyPropertyChange('_engagedAssetablesKey');
  }
});
