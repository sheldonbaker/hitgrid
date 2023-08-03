import config from '../config/environment';
import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPIAdapter.extend({
  host: config.API.url,
  namespace: 'api/v1',

  pathForType(modelName) {
    var underscored = Ember.String.underscore(modelName);
    return Ember.String.pluralize(underscored);
  },

  ajaxOptions(url, type, options) {
    if (options && options.data && options.data._link) {
      url = options.data._link;
      delete options.data._link;
    }

    var ret = this.authorizer.authorize(this._super(url, type, options));
    ret.contentType = "application/vnd.api+json; ext=hitgrid/embedded";

    return ret;
  }
});