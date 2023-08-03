import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  serialize(snapshot) {
    var json = snapshot.belongsTo('policy').attributes();
  
    json['AWSAccessKeyId'] = json.awsAccessKeyId;
    delete json.awsAccessKeyId;

    json['Content-Type'] = snapshot.attr('blob').type;
    delete json.contentType;

    json.file = [snapshot.attr('blob'), snapshot.id];

    return json;
  }
});
