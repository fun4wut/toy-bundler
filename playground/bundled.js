const __require =
  typeof require !== "undefined"
    ? require
    : () => {
        throw new Error("gg");
      };
(function (modules) {
  const resolveModule = (id) => {
    const { factory, map } = modules[id];
    const localRequire = (requireDeclarationName) => {
      const depId = map[requireDeclarationName];
      return depId >= 0
        ? resolveModule(depId)
        : __require(requireDeclarationName);
    };
    const localModule = {
      exports: {},
    };

    factory(localModule, localModule.exports, localRequire);
    return localModule.exports;
  };
  const res = resolveModule(0);
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = res;
  } else {
    (globalThis || self || global).myBundle = res;
  }
})({
  0: {
    factory: (module, exports, require) => {
      "use strict";

      var _require = require("./b.js"),
        rua = _require.rua;

      var _require2 = require("./c.js"),
        ac = _require2.ac;

      var _require3 = require("path"),
        join = _require3.join;

      console.log(join(rua, ac));
    },
    map: { "./b.js": 1, "./c.js": 2, path: -19260817 },
  },
  1: {
    factory: (module, exports, require) => {
      "use strict";

      var _require = require("./c.js"),
        ee = _require.ee;

      var rua = 233;
      console.log(ee);
      module["export"] = {
        rua: rua,
      };
    },
    map: { "./c.js": 2 },
  },
  2: {
    factory: (module, exports, require) => {
      "use strict";

      var _require = require("./b.js"),
        rua = _require.rua;

      module.exports = {
        ac: rua + 1,
        ee: 111,
      };
    },
    map: { "./b.js": 1 },
  },
});
