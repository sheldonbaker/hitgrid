import Ember from 'ember';
const { Component, get, set } = Ember;

export default Component.extend({
  newCommentBody: '',

  actions: {
    add() {
      get(this, 'comments').createRecord({
        body: get(this, 'newCommentBody')
      });

      set(this, 'newCommentBody', '');
    }
  }
});
