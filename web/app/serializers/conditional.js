import ApplicationSerializer from 'hitgrid/serializers/application';

export default ApplicationSerializer.extend({
  attrs: {
    draftPicks: { serialize: 'records' },
  }
});