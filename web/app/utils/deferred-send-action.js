import Ember from 'ember';
const { RSVP } = Ember;

export default function(context, action, ...args) {
  var deferred = RSVP.defer();
  deferred._IsDeferreedSendActionHack = true;
  
  args.unshift(action);
  args.push(deferred);

  // TODO
  if (context.sendAction) {
    context.sendAction.apply(context, args);
  } else {
    context.send.apply(context, args);
  }

  return deferred.promise;
}