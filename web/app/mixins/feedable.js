import Ember from 'ember';
import DS from 'ember-data';

const { Mixin } = Ember;
const { attr } = DS;

export default Mixin.create({
  createdAt: attr('moment')
});
