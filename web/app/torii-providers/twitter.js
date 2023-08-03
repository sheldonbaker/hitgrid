import Ember from 'ember';

import TwitterProvider from 'torii/providers/twitter-oauth1';

const { get } = Ember;

export default TwitterProvider.extend({
  open() {
    var name = get(this, 'name');
    var url = this.buildRequestTokenUrl();
    var params = ['token', 'verifier'];

    return get(this, 'popup').open(url, params).then((authData) => {
      return {
        provider: name,
        requestToken: authData.token,
        requestTokenVerifier: authData.verifier
      };
    });
  }
});
