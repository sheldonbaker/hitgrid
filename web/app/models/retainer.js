import Ember from 'ember';
import DS from 'ember-data';
import Provisionable from 'hitgrid/mixins/provisionable';

const { get } = Ember;
const { attr } = DS;

export default DS.Model.extend(Provisionable, {
  absolutePct: attr('number'),

  getShortDescriptionForAssetable() {
    return ["@", [get(this, 'absolutePct'), "%"].join('')].join(' ');
  }
});
