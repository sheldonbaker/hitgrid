import Ember from 'ember';

const { get, set, computed, observer, run } = Ember;
const { alias } = computed;

export default Ember.Controller.extend({
  currentRoutes: computed('currentPath', function() {
    return get(this, 'currentPath').split('.').join(' ');
  }),

  queryParams: [{ searchQuery: 'search' }, { createFantasyTeam: 'create_fantasy_team' }],

  searchQuery: null,
  searchResults: null,
  
  user: alias('session.user'),
  userPromise: alias('session.userPromise'),

  profile: alias('user.profile'),

  clubs: null,
  
  // modal params
  require: false,
  requireDeferred: null,

  searchQueryDidChange: observer('searchQuery', function() {
    run.debounce(this, this.debouncedSearchQueryDidChange, 150);
  }),

  debouncedSearchQueryDidChange: function() {
    var searchQuery = get(this, 'searchQuery');
    var searchResults = null;

    if (searchQuery) {
      searchResults = this.store.query('searchResult', { query: searchQuery });
    }

    set(this, 'searchResults', searchResults);
  },

  actions: {
    showShortcutsMenu() {
      set(this, 'shortcutsMenuIsShown', true);
    }
  }
});
