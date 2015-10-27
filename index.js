'use strict';

module.exports = access;
access.get = access;
access.set = set;


// @param {Array|string} keys
function access (obj, keys, default_) {
  if (typeof keys === 'string') {
    keys = keys.split('.');
  }

  var current = obj;
  var i = 0;
  var len = keys.length;

  while(i < len){
    if (!current) {
      break;
    }

    current = current[keys[i ++]];
  }

  return current || default_;
}


// @param {Array|string} keys
function set (obj, keys, value, force) {
  if (!obj || Object(obj) !== obj) {
    return;
  }

  if (typeof keys === 'string') {
    keys = keys.split('.');
  }

  var current = obj;
  var i = 0
  var last = keys.pop();
  var len = keys.length;
  var key;
  var sub;
  var is_object;
  while(i < len){
    key = keys[i];
    sub = current[key];
    is_object = Object(sub) !== sub;

    // If the key is already found, and is not an object,
    // then we could not assign new key to the subtle object.
    // And if not `force`, then stop
    if (key in current && is_object && !force) {
      return;
    }

    current = current[key] = is_object
      ? sub
      // or assign a new object
      : {};
  }

  current[last] = value;
}
