import DS from 'ember-data';
import Provisionable from 'hitgrid/mixins/provisionable';
import Conditionable from 'hitgrid/mixins/conditionable';

const { Model } = DS;

export default Model.extend(Provisionable, Conditionable);
