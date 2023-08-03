import DS from 'ember-data';
import Obligatable from 'hitgrid/mixins/obligatable';

const { attr, belongsTo } = DS;

export default DS.Model.extend(Obligatable, {
  retention: belongsTo('retention'),

  startDate: attr('moment'),
  endDate: attr('moment')
});
