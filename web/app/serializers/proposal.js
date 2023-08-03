import ApplicationSerializer from 'hitgrid/serializers/application';

export default ApplicationSerializer.extend({
  attrs: {
    participations: { serialize: 'records' },
    comments: { serialize: 'records' }
  }
});