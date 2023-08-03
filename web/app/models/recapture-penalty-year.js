import DS from 'ember-data';
import Obligatable from 'hitgrid/mixins/obligatable';

const { belongsTo } = DS;

export default DS.Model.extend(Obligatable, {
  recapturePenalty: belongsTo('recapturePenalty')
});
