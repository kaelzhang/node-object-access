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

Access(read and write) an object hierachically.

## Install

```sh
$ npm install object-access --save
```

## Usage

```js
var access = require('object-access');
var obj = {
  one: {
    two: 2
  }
};

// Get
access(obj, 'one.two');                   // 2
access(obj, ['one', 'two']);              // 2
access(obj, ['one', 'three']);            // undefined
access(obj, ['one', 'three', 'four']);    // undefined
access(obj, ['one', 'three', 'four'], 4); // 4

// Set
access.set(obj, 'one.two', 3);            // obj.one.two.three  -> 3
access.set(obj, ['one', 'two'], 5);       // obj.one.two.three  -> 4

// If the subtle object is not found, it will create one
access.set(obj, ['three', 'four'], 6);    // obj.three.four     -> 6
access.set(obj, 'one.two.tree', 3);       // obj.one.two        -> 3
                                          // `obj.one.two` exists, and is not an object, then skip

// Force setting
access.set(obj, 'one.two.tree', 3, true); // obj.one.two        -> {three: 3}
```

### access(obj, keys [, default_value])
### access.get(obj, keys [, default_value])

Get value

- obj `Object`
- keys `Array|string` see the example above
- default_value `any=` if keys not found, then returns the `default_value`, if `default_value` is not specified, `undefined` will be returned. 

### access.set(obj, keys, value [, force])

If the property already exists and is not an object, `access.set()` will do nothing by default.

Use `force=true` to force setting the value, and the old property will be overidden.

## License

MIT
