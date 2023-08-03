import Ember from 'ember';
import DS from 'ember-data';

const { Mixin } = Ember;
const { hasMany } = DS;

export default Mixin.create({
  comments: hasMany('comment')
});
