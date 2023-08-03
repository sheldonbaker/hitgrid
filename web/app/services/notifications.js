import Ember from 'ember';
import uuid from 'hitgrid/utils/uuid';
import storeInCookie from 'hitgrid/utils/computed/store-in-cookie';

const { get, set, RSVP } = Ember;

export default Ember.Service.extend({
  pushClientId: storeInCookie('push_client_id'),

  isSupported: false,
  isPermitted: false,

  init() {
    if (this.checkSupport()) {
      this.checkPermission();
      this.initializeClientId();
    }
  },

  checkSupport() {
    return set(this, 'isSupported', 'serviceWorker' in navigator && 'Notification' in window);
  },

  checkPermission() {
    return set(this, 'isPermitted', window.Notification.permission !== 'denied');
  },

  initializeClientId() {
    if (!get(this, 'pushClientId')) {
      set(this, 'pushClientId', uuid());
    }
  },

  getSubscriptions() {
    var store = this.store;
    var channels = ['reminders', 'notices'];

    return store.query('notificationSubscription', {}).then((subscriptions) => {
      return RSVP.resolve(subscriptions.toArray());
    }).then((subscriptions) => {
      var clientId = get(this, 'pushClientId');
      var pushRegistration = store.createRecord('pushRegistration', {
        clientId: clientId,
        userAgent: navigator.userAgent
      });

      channels.forEach((channel) => {
        var pushSubscription = subscriptions.find((subscription) => {
          var registration = get(subscription, 'registerable');
          return get(subscription, 'channel') === channel &&
            (registration.constructor.modelName === 'push-registration' && get(registration, 'clientId') === clientId);
        });

        if (!pushSubscription) {
          pushSubscription = store.createRecord('notificationSubscription', {
            channel: channel,
            registerable: pushRegistration
          });

          subscriptions.pushObject(pushSubscription);
        }
      });

      return RSVP.resolve(subscriptions);
    }).then((subscriptions) => {
      var smsRegistration = store.createRecord('smsRegistration');

      channels.forEach((channel) => {
        var smsSubscription = subscriptions.find((subscription) => {
          return get(subscription, 'channel') === channel &&
            (get(subscription, 'registerable').constructor.modelName === 'sms-registration');
        });

        if (!smsSubscription) {
          smsSubscription = store.createRecord('notificationSubscription', {
            channel: channel,
            registerable: smsRegistration
          });

          subscriptions.pushObject(smsSubscription);
        }
      });

      return RSVP.resolve(subscriptions);
    });
  },

  subscribe() {
    return this.ready().then((pushManager) => {
      return pushManager.getSubscription().then((subscription) => {
        this.notifyPropertyChange('isPermitted');

        if (subscription) {
          return RSVP.resolve(subscription);
        } else {
          return pushManager.subscribe({ userVisibleOnly: true });
        }
      });
    });
  },

  unsubscribe(pushManager) {
    return this.ready().then((pushManager) => {
      return pushManager.getSubscription().then((subscription) => {
        if (subscription) {
          return subscription.unsubscribe();
        } else {
          return RSVP.resolve();
        }
      });
    });
  },

  ready() {
    return new RSVP.Promise((resolve, reject) => {
      // TODO - handle timeout
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.pushManager) {
          resolve(registration.pushManager);
        } else {
          reject();
        }
      }, reject);
    });
  }
});
