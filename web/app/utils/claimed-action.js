import Ember from 'ember';
const { get } = Ember;

export default function(action) {
  return function() {
    var user = get(this.session, 'user');

    if (user) {
      user.then((user) => {
        if (get(user, 'claimed')) {
          this.send(action);
        } else {
          this.send('requireClaimedUser', action);
        }
      });
    } else {
      this.send('requireClaimedUser', action);
    }
  };
}
