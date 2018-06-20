'use strict'

var expect = require('chai').expect
var access = require('../')
var run = require('run-mocha-cases')
var clone = require('clone')

run('access()', function(data){
  return access(data.obj, data.keys, data.default)
}).start(get_cases())

run('access.get()', function(data){
  return access.get(data.obj, data.keys, data.default)
}).start(get_cases())

run('access.set()', function(data){
  var ret = access.set(data.obj, data.keys, data.value, data.force)
  return {
    ret: ret,
    obj: data.obj
  }
}).start(set_cases())

run('access.remove()', function (data) {
  var ret = access.remove(data.obj, data.keys)
  return {
    ret: ret,
    obj: data.obj
  }
}).start(remove_cases())


function get_cases () {
  return [
    {
      d: '#2: falsy value, with default',
      a: {
        obj: {
          a: {
            a: 0
          }
        },
        keys: 'a.a',
        default: 'not found'
      },
      e: 0
    },
    {
      d: '#2: falsy value, without defualt',
      a: {
        obj: {
          a: {
            a: 0
          }
        },
        keys: 'a.a'
      },
      e: 0
    },
    {
      d: 'access, string keys',
      a: {
        obj: {
          a: {
            b: {
              c: 1
            }
          }
        },
        keys: 'a.b.c'
      },
      e: 1
    },

    {
      d: 'access, array keys',
      a: {
        obj: {
          a: {
            b: {
              c: 1
            }
          }
        },
        keys: ['a', 'b', 'c']
      },
      e: 1
    },

    {
      d: 'access, not found',
      a: {
        obj: {
          a: {
            b: {
              c: 1
            }
          }
        },
        keys: ['a', 'b', 'd']
      }
    },

    {
      d: 'access, not found',
      a: {
        obj: {
          a: {
            b: {
              c: 1
            }
          }
        },
        keys: ['a', 'b', 'd', 'e']
      }
    },

    {
      d: 'access, not found 2',
      a: {
        obj: {

        },
        keys: ['a', 'b']
      }
    },

    {
      d: 'access, not found, with default',
      a: {
        obj: {
          a: {
            b: {
              c: 1
            }
          }
        },
        keys: ['a', 'b', 'd'],
        default: 'not found'
      },
      e: 'not found'
    }
  ]
}


function set_cases () {
  return [
    {
      d: 'set, string keys',
      a: {
        obj: {
          a: {
            b: 1
          }
        },
        keys: 'a.b',
        value: 2
      },
      e: {
        ret: 2,
        obj: {
          a: {
            b: 2
          }
        }
      }
    },

    {
      d: 'set, array keys',
      a: {
        obj: {
          a: {
            b: 1
          }
        },
        keys: ['a', 'b'],
        value: 2
      },
      e: {
        ret: 2,
        obj: {
          a: {
            b: 2
          }
        }
      }
    },

    {
      d: 'set, string keys, new key, no force',
      a: {
        obj: {
          a: {
            b: 1
          }
        },
        keys: 'a.c',
        value: 2
      },
      e: {
        ret: 2,
        obj: {
          a: {
            b: 1,
            c: 2
          }
        }
      }
    },

    {
      d: 'set, array keys, new key, no force',
      a: {
        obj: {
          a: {
            b: 1
          }
        },
        keys: ['a', 'c'],
        value: 2
      },
      e: {
        ret: 2,
        obj: {
          a: {
            b: 1,
            c: 2
          }
        }
      }
    },

    {
      d: 'set, string keys hierachically, create new key',
      a: {
        obj: {
          a: {
            b: 1
          }
        },
        keys: 'a.c.d',
        value: 2
      },
      e: {
        ret: 2,
        obj: {
          a: {
            b: 1,
            c: {
              d: 2
            }
          }
        }
      }
    },

    {
      d: 'set, array keys hierachically, create new key',
      a: {
        obj: {
          a: {
            b: 1
          }
        },
        keys: ['a', 'c', 'd'],
        value: 2
      },
      e: {
        ret: 2,
        obj: {
          a: {
            b: 1,
            c: {
              d: 2
            }
          }
        }
      }
    },

    {
      d: 'set, create new key, root not found',
      a: {
        obj: {

        },
        keys: ['a', 'c'],
        value: 2
      },
      e: {
        ret: 2,
        obj: {
          a: {
            c: 2
          }
        }
      }
    },

    {
      d: 'set, string keys, exists, no force',
      a: {
        obj: {
          a: {
            b: 1
          }
        },
        keys: 'a.b.c',
        value: 2
      },
      error: true
    },

    {
      d: 'set, array keys, exists, no force',
      a: {
        obj: {
          a: {
            b: 1
          }
        },
        keys: ['a', 'b', 'c'],
        value: 2
      },
      error: true
    },

    {
      d: 'set, string keys, exists, force',
      a: {
        obj: {
          a: {
            b: 1
          }
        },
        force: true,
        keys: 'a.b.c',
        value: 2
      },
      e: {
        ret: 2,
        obj: {
          a: {
            b: {
              c: 2
            }
          }
        }
      }
    },

    {
      d: 'set, array keys, exists, force',
      a: {
        obj: {
          a: {
            b: 1
          }
        },
        force: true,
        keys: ['a', 'b', 'c'],
        value: 2
      },
      e: {
        ret: 2,
        obj: {
          a: {
            b: {
              c: 2
            }
          }
        }
      }
    }
  ]
}


function remove_cases () {
  return [
    {
      d: 'remove a key, string',
      a: {
        obj: {
          a: 1
        },
        keys: 'a'
      },
      e: {
        ret: true,
        obj: {}
      }
    },

    {
      d: 'remove a key, array',
      a: {
        obj: {
          a: 1
        },
        keys: ['a']
      },
      e: {
        ret: true,
        obj: {}
      }
    },

    {
      d: 'remove a deep key',
      a: {
        obj: {
          a: {
            b: 1
          }
        },
        keys: ['a', 'b']
      },
      e: {
        ret: true,
        obj: {
          a: {}
        }
      }
    },

    {
      d: 'remove an object key, array',
      a: {
        obj: {
          a: {
            b: {
              c: 1
            }
          }
        },
        keys: ['a', 'b']
      },
      e: {
        ret: true,
        obj: {
          a: {}
        }
      }
    },

    {
      d: 'key not found',
      a: {
        obj: {
          a: 1
        },

        keys: ['b']
      },
      e: {
        ret: false,
        obj: {
          a: 1
        }
      }
    },

    {
      d: 'key not found, deep',
      a: {
        obj: {
          a: {
            b: 1
          }
        },
        keys: ['a', 'c']
      },
      e: {
        ret: false,
        obj: {
          a: {
            b: 1
          }
        }
      }
    }
  ]
}
