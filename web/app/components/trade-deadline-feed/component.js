import Ember from 'ember';
const { Component, computed, get, run } = Ember;
const { alias, sort } = computed;

export default Component.extend({
  classNames: ['trade-deadline-feed'],
  classNameBindings: ['commentPostable:trade-deadline-feed--postable'],

  tradeDeadline: null,
  deadline: alias('tradeDeadline'),

  feedables: computed('deadline.newsItems.[]', 'deadline.comments.[]', function() {
    return get(this, 'deadline.newsItems').toArray().concat(get(this, 'deadline.comments').toArray());
  }),

  feedableSort: ['createdAt'],
  sortedFeedables: sort('feedables', 'feedableSort'),

  scrollToBottom() {
    run.scheduleOnce('afterRender', () => {
      var list = this.$('.trade-deadline-feed__items');
      list.scrollTop(list[0].scrollHeight);
    });
  },

  didInsertElement() {
    this.addObserver('feedables.lastObject', this, 'scrollToBottom');
  },

  willDestroyElement() {
    this.removeObserver('feedables.lastObject', this, 'scrollToBottom');
  },

  commentPostable: false,

  actions: {
    toggleCommentPrep() {
      this.toggleProperty('commentPostable');
      this.scrollToBottom();
    },

    createComment(body) {
      return this.attrs.createComment(get(this, 'tradeDeadline'), body).then(() => {
        this.scrollToBottom();
      });
    }
  }
});
