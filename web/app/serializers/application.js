import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPISerializer.extend(DS.EmbeddedRecordsMixin, {
  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  },

  keyForRelationship: function(rawKey) {
    return Ember.String.underscore(rawKey);
  },

  _shouldAbortEmbedding(snapshot, relationship) {
    var attrs = this.attrs[relationship.key];
    var unless = attrs && attrs.unless;

    if (unless) {
      return unless(snapshot, relationship);
    }

    return false;
  },

  // simply allowing a final arugment to completely bypass embedding
  // altogether - useful in combination with the `unless` option
  serializeBelongsTo(snapshot, json, relationship, doNotEmbed) {
    if (doNotEmbed) {
      var oldNoSerialize = this.noSerializeOptionSpecified;
      this.noSerializeOptionSpecified = function() { return true; };
      
      this._super(snapshot, json, relationship);
      this.noSerializeOptionSpecified = oldNoSerialize;
    } else {
      this._super(snapshot, json, relationship);
    }
  },

  _serializeEmbeddedBelongsTo: function (snapshot, json, relationship) {
    var unless = this._shouldAbortEmbedding(snapshot, relationship);

    if (unless) {
      this.serializeBelongsTo(snapshot, json, relationship, true);
      return;
    }

    var embeddedSnapshot = snapshot.belongsTo(relationship.key);
    var serializedKey = this.keyForRelationship(relationship.key, 'serialize');
    
    if (!embeddedSnapshot) {
      json.relationships[serializedKey] = { data: null };
    } else {
      var serialized = embeddedSnapshot.record.serialize({ includeId: true });
      serialized.embedded = true;

      json.relationships[serializedKey] = serialized;
      this.removeEmbeddedForeignKey(snapshot, embeddedSnapshot, relationship, json[serializedKey]);

      if (relationship.options.polymorphic) {
        this.serializePolymorphicType(snapshot, json, relationship);
      }
    }
  },

  _serializeEmbeddedHasMany: function (snapshot, json, relationship) {
    var serializedKey = this.keyForRelationship(relationship.key, 'serialize');

    if (!json.relationships) {
      json.relationships = {};
    }

    json.relationships[serializedKey] = { data: this._generateSerializedHasMany(snapshot, relationship), embedded: true };
  },

  // Moves root-level links to meta for now
  // normalizeResponse(store, primaryModelClass, payload) {
  //   var links = payload.links;
  //   var normalizedResponse = this._super(...arguments);

  //   if (!normalizedResponse.meta) {
  //     normalizedResponse.meta = {};
  //   }

  //   normalizedResponse.meta.links = links;
  //   return normalizedResponse;
  // }
});
