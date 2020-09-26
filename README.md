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
access.set(obj, 'one.two', 3)             // 3
// then obj.one.two.three is 3

access.set(obj, ['one', 'two'], 4)        // 4
// then obj.one.two.three is 4

// If the subtle object is not found, it will create one
access.set(obj, ['three', 'four'], 6)     // 6
// then obj.three.four is 6

// If we try to set a property on a none-object value, it will thrown.
access.set(obj, 'one.two.tree', 3)        // Error thrown!

// Force setting
access.set(obj, 'one.two.tree', 3, true)  // true
// obj.one.two is {three: 3}

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

If the property already exists and is not an object, `access.set()` will throw an error whose `code` is `SET_ON_NONE_OBJECT`.

If you want to force setting new values on none object value and override it, or to prevent any errors, use `force=true`.

If prototype pollution is attempted, `access.set()` will throw an error whose `code` is `SET_ON_PROTOTYPE`.

Returns `value`

### access.delete(obj, key_list) : boolean

Removes a key by deleting it if exists.

Returns `true` if succeeded otherwise `false`

### ~~access.remove(obj, key_list)~~ DEPRECATED in `1.2.0`

## Upgrade from `1.x` to `2.x`

Method  | `1.x` | `2.x`
---- | ---- | ----
set | no return value | has return value if there is no error
set | never thrown | thrown if you try to set property on none object
remove | no return value | has return value

## License

MIT
