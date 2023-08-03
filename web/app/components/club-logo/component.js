import Ember from 'ember';

const { Component, computed, get } = Ember;
  
export default Component.extend({
  tagName: 'img',
  attributeBindings: 'src',
  classNameBindings: ['size'],

  club: null,
  size: 'sm',

  src: computed('club', function() {
    return this.assets.clubLogoPath(get(this, 'club'));
  })
});
