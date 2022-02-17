const __require = typeof require !== 'undefined' ? require : () => { throw new Error('gg') };
(function(modules) {
  const resolveModule = id => {
    const {
      factory,
      map
    } = modules[id];
    const localRequire = requireDeclarationName => {
      const depId = map[requireDeclarationName]
      return depId >= 0 ? resolveModule(depId) : __require(requireDeclarationName)
    }
    const localModule = {
      exports: {}
    };

    factory(localModule, localRequire);
    return localModule.exports;
  }
  const res = resolveModule(0);
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = res;
  } else {
    (globalThis || self || global).myBundle = res;
  }
})({
  0: {
    factory: (module, require) => {
      const module1 = require('./module1.js');
      const path = require('path');
      module1();
      console.log(path.join('/d', 'qqq'))
      module.exports = {
        rua: 233
      }
    },
    map: {
      "./module1.js": 1,
      'path': -100
    }
  },
  1: {
    factory: (module, require) => {
      "use strict";

      var module1 = function module1() {
        console.log("Hello from module1!");
      };

      module.exports = module1;
    },
    map: {}
  }
})