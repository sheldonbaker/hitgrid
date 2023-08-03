import ApplicationSerializer from 'hitgrid/serializers/application';

export default ApplicationSerializer.extend({
  attrs: {
    assetable: { serialize: 'records' },
    provisionable: { serialize: 'records' }
  }
});