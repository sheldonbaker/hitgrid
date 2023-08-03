import Ember from 'ember';
import deferredSendAction from 'hitgrid/utils/deferred-send-action';

const { get } = Ember;

export default function(state, callback) {
  return function() {
    var context = this;
    var args = Array.prototype.slice.call(arguments);
    
    return deferredSendAction.apply(context, [context, 'require', state]).then((user) => {
      args.push(user);
      args.push(get(user, 'profile'));
      
      return callback.apply(context, args);
    });
  };
}
 