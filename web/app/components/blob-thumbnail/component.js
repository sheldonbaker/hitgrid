import Ember from 'ember';
const { get, set, observer } = Ember;

var createObjectURL = window.URL.createObjectURL;

export default Ember.Component.extend({
  tagName: 'canvas',

  blob: null,
  width: null,
  height: null,

  didInsertElement() {
    this.drawImage();
  },

  foo: observer('blob', function() {
    this.drawImage();
  }),

  drawImage: function() {
    var blob = get(this, 'blob');
    var blobURL;

    if (blob) {
      blobURL = createObjectURL(blob);

      var width = get(this, 'width');
      var height = get(this, 'height');

      var canvas = this.$()[0];
      var ctx;
      var img;

      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);

      ctx = canvas.getContext('2d');

      img = new Image();
      img.onload = function() {
        var imgWidth = img.naturalWidth;
        var imgHeight = img.naturalHeight;
        var x = 0;
        var y = 0;
        var w = imgHeight;
        var h = imgHeight;

        if (imgWidth >= imgHeight) {
          x = (imgWidth - imgHeight) / 2;
        } else {
          y = (imgHeight - imgWidth) / 2;
        }

        ctx.drawImage(img, x, y, w, h, 0, 0, width, height);
      };

      img.src = blobURL;
    }
  }
});
