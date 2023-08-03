export default function(fn) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var context = this;
    var fnArgs;
    var ret;

    var deferred = args[args.length - 1];
    
    if (deferred._IsDeferreedSendActionHack) {
      fnArgs = args.slice(0, args.length - 1);
    } else {
      fnArgs = args.slice();
    }

    ret = fn.apply(context, fnArgs);

    if (ret.then) {
      ret.then(deferred.resolve, deferred.reject);
    } else {
      throw new Error(); // TODO
    }
  };
}