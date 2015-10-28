'use strict';

module.exports = access;
access.get = access;
access.set = set;
access.remove = remove;


function split_keys (keys) {
  return typeof keys === 'string'
    ? keys = keys.split('.')
    : keys;
}


// @param {Array|string} keys
function access (obj, keys, default_) {
  keys = split_keys(keys);

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
  keys = split_keys(keys);
}


function remove (obj, keys) {
  keys = split_keys(keys);
  _access(obj, keys, );
}


// @param {Array.<string>} keys
// @param {function()} mutator
function _access (obj, keys, mutator) {
  if (!obj || Object(obj) !== obj) {
    return;
  }

  keys = split_keys(keys);

  var current = obj;
  var i = 0;
  var last = keys.pop();
  var len = keys.length;
  var key;
  var sub;
  var is_object;
  while(i < len){
    key = keys[i ++];
    sub = current[key];
    is_object = Object(sub) !== sub;

    // If the key is already found, and is not an object,
    // then we could not assign new key to the subtle object.
    // And if not `force`, then stop
    if (key in current && !is_object && !force) {
      return;
    }

    current = current[key] = is_object
      ? sub
      // or assign a new object
      : {};
  }

  current[last] = value;
}