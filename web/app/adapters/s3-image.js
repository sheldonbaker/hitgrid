import DS from 'ember-data';
import uuid from 'hitgrid/utils/uuid';
import mimeToExtension from 'hitgrid/utils/mime-to-extension';
import Ember from 'ember';

const { get, set } = Ember;

export default DS.RESTAdapter.extend({
  generateIdForRecord(store, typeKey, props) {
    var policyKey = get(props.policy, 'key');
    var blob = props.blob;
    var blobType = blob.type;
    var baseName = uuid();
    var extension = mimeToExtension(blobType);
    var fileName = [baseName, extension].join('');
    var id = policyKey.replace('${filename}', fileName);

    return id;
  },

  createRecord: function (store, type, snapshot) {
    var data = {};
    var serializer = store.serializerFor(type.modelName);
    var url = this.buildURL(type.modelName, null, snapshot, 'createRecord');

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

    return this.ajax(url, "POST", { data: data, record: snapshot.record });
  },

  buildURL(modelName, id, snapshot) {
    return ['https://', snapshot.belongsTo('policy').attr('bucket'), '.s3-us-west-2.amazonaws.com'].join('');
  },

  ajaxOptions(url, type, options) {
    var hash = options || {};
    var record = options.record;

    hash.url = url;
    hash.type = type;
    hash.context = this;
    hash.contentType = false;
    hash.processData = false;

    var data = hash.data.s3Image;
    var formData = new FormData();

    for (let key in data) {
      let args = [].concat(data[key]);
      args.unshift(key);
      formData.append.apply(formData, args);
    }

    hash.data = formData;

    hash.xhr = function() {
      var xhr = Ember.$.ajaxSettings.xhr();
      xhr.upload.onprogress = function(e) {
        if (record) {
          record.setProperties({
            uploadCompleted: e.loaded,
            uploadTotal: e.total
          });
        }
      };

      return xhr;
    };

    return hash;
  },

  ajax(url, type, options) {
    var promise = this._super(url, type, options);
    var record = options.record;

    promise.catch(() => {
      set(record, 'uploadCompleted', 0);
    });

    return promise;
  }
});