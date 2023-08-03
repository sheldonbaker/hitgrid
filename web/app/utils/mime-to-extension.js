export default function(mimeType) {
  var map = {
    'image/png': '.png',
    'image/jpg': '.jpg',
    'image/jpeg': '.jpg'
  };

  return map[mimeType];
}
