'use strict';

var expect = require('chai').expect;
var access = require('../');
var run = require('run-mocha-cases');
var clone = require('clone');

var get_cases = [
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

run('access()', function(data){
  return access(data.obj, data.keys, data.default);
}).start(get_cases);

run('access.get()', function(data){
  return access.get(data.obj, data.keys, data.default);
}).start(get_cases);

run('access.set()', function(data){
  var obj = clone(data.obj);
  access.set(obj, data.keys, data.value, data.force);
  return obj;
}).start([
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
      a: {
        b: 2
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
      a: {
        b: 2
      }
    }
  },

  {
    d: 'set, string keys, not found, no force',
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
      a: {
        b: 1
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
      a: {
        b: 1,
        c: 2
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
      a: {
        b: 1,
        c: 2
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
      a: {
        b: 1,
        c: {
          d: 2
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
      a: {
        b: 1,
        c: {
          d: 2
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
    e: {
      a: {
        b: 1
      }
    }
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
    e: {
      a: {
        b: 1
      }
    }
  },

  {
    d: 'set, string keys, exists, force',
    a: {
      obj: {
        a: {
          b: 1
        }
      },
      keys: 'a.b.c',
      value: 2
    },
    e: {
      a: {
        b: {
          c: 2
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
      keys: ['a', 'b', 'c'],
      value: 2
    },
    e: {
      a: {
        b: {
          c: 2
        }
      }
    }
  }
]);