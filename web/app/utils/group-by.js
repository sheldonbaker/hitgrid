import Ember from 'ember';
const { get, isArray } = Ember;
const { _ } = window;

export default function(objects, objectGrouper, keySorter = null) {
  var ret;
  var groups = {};
  var grouped = {};
  var groupKeys;

  objects.forEach((obj) => {
    var group;

    if (typeof objectGrouper === 'function') {
      group = objectGrouper(obj);
    } else {
      group = get(obj, objectGrouper);
    }

    var groupKey = get(group, 'key') || group;

    groups[groupKey] = group;

    if (!grouped[groupKey]) {
      grouped[groupKey] = []; 
    }

    grouped[groupKey].push(obj);  
  });

  groupKeys = _.keys(groups);

  if (typeof keySorter === 'function') {
    groupKeys = _.sortBy(groupKeys, function(key) {
      return keySorter(key);
    });
  } else if (isArray(keySorter)) {
    groupKeys = _.sortBy(groupKeys, function(key) {
      var index = keySorter.indexOf(key);
      return index === -1 ? keySorter.length : index;
    });
  }

  ret = _.map(groupKeys, function(key) {
    return { group: groups[key], content: grouped[key] };
  });

  return ret;
}