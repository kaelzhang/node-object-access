[![Build Status](https://travis-ci.org/kaelzhang/node-object-access.svg?branch=master)](https://travis-ci.org/kaelzhang/node-object-access)
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/object-access.svg)](http://badge.fury.io/js/object-access)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/object-access.svg)](https://www.npmjs.org/package/object-access)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/node-object-access.svg)](https://david-dm.org/kaelzhang/node-object-access)
-->

# object-access

Access(read, write and delete) an object by hierarchical keys. And it can be used as an alternative for the null propagation operator

## Synopsis

```js
const access = require('object-access')
const obj = {
  one: {
    two: 2
  }
}
```

If we use a null operator like many other languages and the [tc39 proposal](https://docs.google.com/presentation/d/11O_wIBBbZgE1bMVRJI8kGnmC6dWCBOwutbN9SWOK0fU/view#slide=id.g1c161255c9_0_55)

```js
// Use Null Propagation Operator
obj.one?.two                  // 2

// Use object-access
access(obj, 'one.two', 2))    // 2
```

## Usage

```js
// Get
access(obj, 'one.two')                    // 2
access(obj, ['one', 'two'])               // 2
access(obj, ['one', 'three'])             // undefined
access(obj, ['one', 'three', 'four'])     // undefined
access(obj, ['one', 'three', 'four'], 4)  // 4

// Set
access.set(obj, 'one.two', 3)             // obj.one.two.three  -> 3
access.set(obj, ['one', 'two'], 5)        // obj.one.two.three  -> 4

// If the subtle object is not found, it will create one
access.set(obj, ['three', 'four'], 6)     // obj.three.four     -> 6
access.set(obj, 'one.two.tree', 3)        // obj.one.two        -> 3
                                          // `obj.one.two` exists, and is not an object, then skip

// Force setting
access.set(obj, 'one.two.tree', 3, true)  // obj.one.two        -> {three: 3}

access.delete(obj, 'one.two.four')        // obj.one.two.four   -> undefined
access.delete(obj, 'one.two.tree')        // obj.one.two        -> {}
access.delete(obj, 'one.two')             // obj.one            -> {}
```

### access(obj, key_list [, default_value])
### access.get(obj, key_list [, default_value])

Get value

- obj `Object`
- key_list `Array|string` see the example above
- default_value `any=` if key_list not found, then returns the `default_value`, if `default_value` is not specified, `undefined` will be returned.

### access.set(obj, key_list, value [, force])

If the property already exists and is not an object, `access.set()` will do nothing by default.

Use `force=true` to force setting the value, and the old property will be overidden.


### access.delete(obj, key_list)

Removes a key by deleting it if exists.

### ~~access.remove(obj, key_list)~~ DEPRECATED in `1.2.0`

## License

MIT
