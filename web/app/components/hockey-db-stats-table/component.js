import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  didInsertElement() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = get(this, 'url');

    // this.$().append(script);
  },

  url: computed(function() {
    return "http://www.hockeydb.com/em/?text_col=%23000000&linktext_col=%230000ee&linktext_hover_col=%23770000&bg_col=%23f0ecdd&border_col=%23000000&title_bg_col=%23d6cda5&row_bg_col=%23ffffff&row_alt_bg_col=%23f5f2e9&header=1&pid=62488";
  })
});
