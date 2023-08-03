import ApplicationSerializer from 'hitgrid/serializers/application';
var decodeJWT = window.jwt_decode;

export default ApplicationSerializer.extend({
  normalizeResponse: function(store, klass, payload) {
    payload.data.attributes = decodeJWT(payload.data.id);

    return this._super(...arguments);
  }
});
