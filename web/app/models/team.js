import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { mapBy, filterBy } = computed;
const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  club: belongsTo('club', { async: false }),

  claimed: attr('boolean'),
  profile: belongsTo('profile'),
  tradeDeadline: belongsTo('tradeDeadline', { async: false }), // TODO??? async false? huh?

  date: attr('moment'),
  leagueYear: belongsTo('leagueYear'),

  assets: hasMany('asset'),
  assetables: mapBy('assets.content', 'assetable'),
  contractAssetables: filterBy('assetables', 'constructor.modelName', 'contract'),
  draftPickAssetables: filterBy('assetables', 'constructor.modelName', 'draft-pick'),
  conditionalAssetables: filterBy('assetables', 'constructor.modelName', 'conditional'),

  allocations: hasMany('allocations'),

  obligations: hasMany('obligation'),
  obligatables: mapBy('obligations.content', 'obligatable'),
  allocationObligatables: filterBy('obligatables', 'constructor.modelName', 'allocation'),

  reliefs: hasMany('ltirRelief'),

  calculations: hasMany('calculation'),

  sentMessages: hasMany('message', { inverse: 'sender' }),
  receivedMessages: hasMany('message', { inverse: 'receiver' })
});
