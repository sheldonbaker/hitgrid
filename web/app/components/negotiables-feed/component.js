import Ember from 'ember';
const { Component, computed, get, set } = Ember;
const { sort } = computed;

export default Component.extend({
  team: null,
  negotiables: null,

  negotiableSorting: ['createdAtUnix:desc'],
  sortedNegotiables: sort('negotiables', 'negotiableSorting'),

  sortedNegotiablesWithParticipation: computed('team', 'negotiables.[]', function() {
    var teamId = get(this, 'team.id');
    var sortedNegotiables = get(this, 'sortedNegotiables');

    return sortedNegotiables.map((negotiable) => {
      var participation = get(negotiable, 'participations').findBy('team.id', teamId);
      return { negotiable: negotiable, participation: participation };
    });
  }),

  cannotLoadMore: false,

  actions: {
    loadMore() {
      return this.attrs.loadMore(get(this, 'sortedNegotiables')).then((moreProposals) => {
        if (get(moreProposals, 'length') === 0) {
          set(this, 'cannotLoadMore', true);
        }
      });
    }
  }
});
