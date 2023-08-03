import Ember from 'ember';
import config from 'hitgrid/config/environment';

const { Service, Evented, get, isArray } = Ember;
const { Pusher } = window;

export default Service.extend(Evented, {
  key: config.APP.PUSHER_KEY,
  client: null,

  init() {
    this.client = new Pusher(get(this, 'key'), {
      authEndpoint: config.PROXY.url + '/push_keys',
      auth: this.authorizer.authorize()
    });
  },

  open(channelNames) {
    if (!isArray(channelNames)) {
      channelNames = [channelNames];
    }

    channelNames.forEach((channelName) => {
      var channel = this.client.subscribe('private-' + channelName);

      channel.bind_all((eventName, data) => {
        this.onPusherEvent(eventName, data);
      });
    });
  },

  close(channelNames) {
    if (!isArray(channelNames)) {
      channelNames = [channelNames];
    }

    channelNames.forEach((channelName) => {
      this.client.unsubscribe('private-' + channelName);
    });
  },

  onPusherEvent(eventName, payload) {
    return;
    var store = this.store;

    if (['created', 'updated', 'deleted'].contains(eventName)) {
      if (isArray(payload)) {
        if (eventName === 'deleted') {
          var record = store.recordForId.apply(store, payload);
          record.deleteRecord();
          record.transitionTo('saved');
        } else {
          store.findRecord.apply(store, payload).then((foundRecord) => {
            this.trigger([eventName, 'Record'].join(''), foundRecord);
          });
        }
      } else {
        var pushedRecord = store.pushPayload(payload);
        this.trigger([eventName, 'Record'].join(''), pushedRecord);
      }
    }
  }
});
