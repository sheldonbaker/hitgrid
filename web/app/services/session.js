import Ember from 'ember';
import DS from 'ember-data';
import uuid from 'hitgrid/utils/uuid';
import storeLocally from 'hitgrid/utils/computed/store-locally';
import storeInCookie from 'hitgrid/utils/computed/store-in-cookie';

const { get, set, computed, observer, RSVP } = Ember;
const { bool } = computed;
const { PromiseObject } = DS;

var decodeJWT = window.jwt_decode;
const { humps } = window;

export default Ember.Service.extend({
  anonymousId: storeLocally('anonymous_id'),
  accessTokenValue: storeInCookie('access_token'),

  accessToken: null,
  isAnonymous: bool('anonymousId'),
  
  user: null,
  userPromise: null,

  userIdDidChange: observer('accessToken.userId', function() {
    var userId = get(this, 'accessToken.userId');
    var promise;

    if (userId) {
      promise = this.store.findRecord('user', userId);

      promise.then((user) => {
        set(this, 'user', user);
      });

      set(this, 'userPromise', promise);
    } else {
      set(this, 'user', null);
      set(this, 'userPromise', PromiseObject.create({ promise: RSVP.reject() }));
    }
  }),

  fetchUser() {
    if (get(this, 'accessToken')) {
      return get(this, 'userPromise');
    } else {
      return RSVP.reject();
    }
  },

  fetchClaimedUser() {
    return this.fetchUser().then((user) => {
      if (get(user, 'claimed')) {
        return RSVP.resolve(user);
      } else {
        return RSVP.reject();
      }
    });
  },

  start() {
    return new RSVP.Promise((resolve) => {
      set(this, 'userPromise', PromiseObject.create({ promise: RSVP.reject() }));
      
      var store = this.store;

      var accessTokenValue = get(this, 'accessTokenValue');
      var anonymousId = get(this, 'anonymousId');
      
      if (accessTokenValue) {
        var accessToken;
        var typeKey = 'accessToken';
        var payload = {};
        payload[typeKey.pluralize().underscore()] = accessTokenValue; 

        store.push({ data: { id: accessTokenValue, type: typeKey, attributes: humps.camelizeKeys(decodeJWT(accessTokenValue)) } });
        accessToken = store.peekAll(typeKey).findBy('value', accessTokenValue);

        set(this, 'accessToken', accessToken);
        resolve();
      } else if (!anonymousId) {
        set(this, 'anonymousId', uuid());
        resolve();
      }
    });
  },

  openFromUser(user) {
    var attrs;

    if (get(user, 'password')) {
      attrs = {
        userEmail: get(user, 'email'),
        userPassword: get(user, 'password')
      };
    } else {
      attrs = {
        userId: get(user, 'id'),
        userSecret: get(user, 'secret')
      };
    }

    return this.open(this.store.createRecord('accessToken', attrs));
  },

  open(accessToken) {
    return accessToken.save().then((accessToken) => {
      return set(this, 'accessToken', accessToken);
    });
  },

  close() {
    set(this, 'accessToken', null);
  },

  useOneTimeCredentials(userId, userSecret) {
    set(this, 'oneTimeUserId', userId);
    set(this, 'oneTimeUserSecret', userSecret);
  },

  tokenDidChange: observer('accessToken', function() {
    var accessToken = get(this, 'accessToken');
    
    if (accessToken) {
      set(this, 'accessTokenValue', get(accessToken, 'value'));
    } else {
      set(this, 'accessTokenValue', null);
    }
  }),
});
