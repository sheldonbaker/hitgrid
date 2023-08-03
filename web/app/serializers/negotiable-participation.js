import ApplicationSerializer from 'hitgrid/serializers/application';

export default ApplicationSerializer.extend({
  attrs: {
    ingredients: { serialize: 'records' }
  }
});