import DS from 'ember-data';
import Assetable from 'hitgrid/mixins/assetable';
import Conditionable from 'hitgrid/mixins/conditionable';

export default DS.Model.extend(Assetable, Conditionable);
