import Ember from 'ember';
const { Service, Evented, get } = Ember;

export default Service.extend(Evented, {
  callbacks: [],

  init() {
    this.pusher.on('updatedRecord', this, this.readIf);
  },

  willDestroy() {
    this.pusher.off('updatedRecord', this, this.readIf);
  },

  start(callback) {
    this.callbacks.addObject(callback);
    return callback;
  },

  stop(callback) {
    this.callbacks.removeObject(callback);
    return true;
  },

  readIf(record) {
    this.callbacks.forEach((callback) => {
      if (get(record, 'isReadable') && callback(record)) {
        this.readAndSave(record);
      }
    });
  },

  readAndSave: function(record) {
    record.markAsRead();
  }
});
