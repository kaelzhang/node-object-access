'use strict'

module.exports = access
access.get = access
access.set = set
access.remove = remove
access.delete = remove


function split_keys (keys) {
  return typeof keys === 'string'
    ? keys = keys.split('.')
    : keys
}


// @param {Array|string} keys
function access (obj, keys, default_) {
  var value = default_

  _access(obj, keys, function (parent, current, key, last) {
    if (last && key in parent) {
      value = current

      // Actually there is no items to the right, however we return true
      return true
    }

    // Stop accessing.
    if (!current) {
      return true
    }
  })

  return value
}


// @param {Array|string} keys
function set (obj, keys, value, force) {
  _access(obj, keys, function (parent, current, key, last) {
    if (last) {
      parent[key] = value
      return true
    }

    var is_object = current && Object(current) === current

    // If the key is already found, and is not an object,
    // then we could not assign new key to the subtle object.
    // And if not `force`, then stop
    if (key in parent && !is_object && !force) {
      return true
    }

    parent[key] = is_object
      ? current
      // or assign a new object
      : {}
  })
}


function remove (obj, keys) {
  _access(obj, keys, function (parent, current, key, last) {
    if (last) {
      delete parent[key]
      return true
    }

    if (!current) {
      return true
    }
  })
}


// @param {Array.<string>} keys
// @param {function()} mutator
function _access (obj, keys, iterator) {
  if (!obj || Object(obj) !== obj) {
    return
  }

  keys = split_keys(keys)

  var current = obj
  var len = keys.length

  keys.some(function (key, index) {
    // If iterator returns `false`, `_access` will stop.
    var stop = iterator(current, current[key], key, index === len - 1)

    // If key not exists, we should set `current` after the iterator.
    current = current[key]
    return stop
  }, obj)
}
