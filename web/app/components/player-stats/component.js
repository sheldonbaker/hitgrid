import Ember from 'ember';
const { Component, get } = Ember;

export default Component.extend({
  player: null,

  didInsertElement() {
    var playerId = get(this, 'player.id');

    if (playerId) {
      var src = 'http://www.hockeydb.com/em/?text_col=%23000000&linktext_col=%230000ee&linktext_hover_col=%23770000&bg_col=%23f0ecdd&border_col=%23000000&title_bg_col=%23d6cda5&row_bg_col=%23ffffff&row_alt_bg_col=%23f5f2e9&header=1';
      src += '&pid=' + playerId;

      var iframe = document.createElement('iframe');
      var html = '<script src="' + src + '"></script>';

      this.$().append(iframe);

      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(html);
      iframe.contentWindow.document.close();
    }
  }
});
