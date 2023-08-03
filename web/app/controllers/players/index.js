import Ember from 'ember';
import Sortable from 'hitgrid/mixins/sortable';

const { Controller, get, set } = Ember;

export default Controller.extend(Sortable, {
  queryParams: ['page'],

  page: 1,

  actions: {
    pageAtPath(path, page) {
      var model = get(this, path);
      var meta = get(model, 'meta');

      var query = model.query;
      query['_link'] = meta.links[page];

      return this.store.query(model.type.modelName, query).then((result) => {
        set(this, path, result);
      });
    }
  }
});
