
  const __require = typeof require !== 'undefined' ? require : () => new Proxy({},{
    get: () => ({}) // 非node环境下使用require, mock出一个可以无限套的oject, 避免程序挂掉
  });
  (function(modules) {
    const moduleCache = {}; // 避免循环引, 参考node https://github.com/nodejs/node/blob/v4.0.0/lib/module.js#L298-L316
    const resolveModule = (id) => {
      const { factory, map } = modules[id];
  
      if (moduleCache[id]) {
        return moduleCache[id].exports;
      }
  
      const localModule = {
        exports: {},
        loaded: false,
      };
      moduleCache[id] = localModule;
  
      const localRequire = (requireDeclarationName) => {
        const depId = map[requireDeclarationName];
        return depId >= 0
          ? resolveModule(depId)
          : __require(requireDeclarationName);
      };
  
      factory(localModule, localModule.exports, localRequire);
      localModule.loaded = true;
      return localModule.exports;
    };
    const res = resolveModule(0);
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = res;
    } else {
      (globalThis || self || global).myBundle = res;
    }
  })(
      {
        
      // /Users/admin/Codes/flash/src/common/index.ts
      0: {
        factory: (module, exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  linkAddHistoryPath: true,
  updateHistoryPath: true,
  getHistoryPath: true
};
Object.defineProperty(exports, "getHistoryPath", {
  enumerable: true,
  get: function get() {
    return _schema.getHistoryPath;
  }
});
Object.defineProperty(exports, "linkAddHistoryPath", {
  enumerable: true,
  get: function get() {
    return _schema.linkAddHistoryPath;
  }
});
Object.defineProperty(exports, "updateHistoryPath", {
  enumerable: true,
  get: function get() {
    return _schema.updateHistoryPath;
  }
});

var _date = require("./date");

Object.keys(_date).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _date[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _date[key];
    }
  });
});

var _fn = require("./fn");

Object.keys(_fn).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _fn[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fn[key];
    }
  });
});

var _list = require("./list");

Object.keys(_list).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _list[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _list[key];
    }
  });
});

var _object = require("./object");

Object.keys(_object).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _object[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _object[key];
    }
  });
});

var _partten = require("./partten");

Object.keys(_partten).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _partten[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _partten[key];
    }
  });
});

var _timer = require("./timer");

Object.keys(_timer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _timer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _timer[key];
    }
  });
});

var _schema = require("./schema");
        },
        map: {"./date":1,"./fn":2,"./list":3,"./object":4,"./partten":5,"./timer":6,"./schema":7}
      }
    ,
      // /Users/admin/Codes/flash/src/common/date/index.ts
      1: {
        factory: (module, exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatCountDown = formatCountDown;
exports.formatTime = void 0;

var _list = require("../list");

var _fn = require("../fn");

function padStr(target) {
  var pad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';

  if (!(0, _fn.isType)(target, 'string')) {
    target = target.toString();
  }

  if (target.length < 2) {
    return ([pad, pad].join('') + target).slice(-2);
  } else {
    return target;
  }
}

var formatTime = function formatTime(timeStamp) {
  var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YY-MM-DD hh:mm';

  if (!timeStamp) {
    return '';
  }

  if ((0, _list.size)(timeStamp) === 10) {
    timeStamp = timeStamp * 1000;
  }

  var timestampDate = new Date(timeStamp);
  var year = timestampDate.getFullYear().toString();
  var month = padStr(timestampDate.getMonth() + 1);
  var day = padStr(timestampDate.getDate());
  var hour = padStr(timestampDate.getHours());
  var minute = padStr(timestampDate.getMinutes());
  var seconds = padStr(timestampDate.getSeconds());
  return template.replace('YY', year).replace('MM', month).replace('DD', day).replace('hh', hour).replace('mm', minute).replace('ss', seconds);
};

exports.formatTime = formatTime;

function formatCountDown(seconds) {
  if (seconds <= 0) {
    return {
      day: '00',
      hour: '00',
      minute: '00',
      second: '00'
    };
  }

  var day = padStr(parseInt((seconds / (60 * 60 * 24)).toString(), 10));
  var hour = padStr(parseInt((seconds / (60 * 60) % 24).toString(), 10));
  var minute = padStr(parseInt((seconds / 60 % 60).toString(), 10));
  var second = padStr(parseInt((seconds % 60).toString(), 10));
  return {
    day: day,
    hour: hour,
    minute: minute,
    second: second
  };
}
        },
        map: {"../list":3,"../fn":2}
      }
    ,
      // /Users/admin/Codes/flash/src/common/fn/index.ts
      2: {
        factory: (module, exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EImageSize = exports.CAN_USE_WEBP = void 0;
exports.addQueryString = addQueryString;
exports.clone = clone;
exports.curry = void 0;
exports.debounce = debounce;
exports.ellipsis = ellipsis;
exports.formatUnit = formatUnit;
exports.getPicUrl = getPicUrl;
exports.getQueryString = getQueryString;
exports.getTextLength = getTextLength;
exports.getUniqueId = getUniqueId;
exports.invokeNum = invokeNum;
exports.isType = isType;
exports.once = once;
exports.random = random;
exports.resolveImgUrl = resolveImgUrl;
exports.safeParse = void 0;
exports.stringifyQueryString = stringifyQueryString;
exports.throttle = throttle;

var _lodash = _interopRequireDefault(require("lodash.curry"));

var _list = require("../list");

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isType(val, type) {
  if (Number.isNaN(val)) {
    return type === 'NaN';
  }

  var match = Object.prototype.toString.call(val).match(/\s(\w*)]$/);
  return match ? match[1].toLowerCase() === type : false;
}

function getQueryString() {
  var _window;

  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (_window = window) === null || _window === void 0 ? void 0 : _window.location.search;
  var queryStartIdx = (url || '').indexOf('?') + 1;

  if (!queryStartIdx) {
    return {};
  }

  var lastHashIdx = url.lastIndexOf('#');
  var queryEndIdx = lastHashIdx === -1 || lastHashIdx < queryStartIdx ? url.length : lastHashIdx;

  try {
    var res = _qs["default"].parse(url.slice(queryStartIdx, queryEndIdx));

    return res;
  } catch (e) {
    console.error('[flash]query string parse error', e);
    return {};
  }
}

function addQueryString(url, query) {
  var params = Object.keys(query).reduce(function (result, key) {
    return "".concat(result, "&").concat(key, "=").concat(query[key]);
  }, '');

  var _url$split = url.split('#'),
      _url$split2 = _slicedToArray(_url$split, 2),
      href = _url$split2[0],
      hash = _url$split2[1];

  if (hash) {
    params = "".concat(params, "#").concat(hash);
  }

  if (url.includes('?')) {
    return "".concat(href).concat(params);
  } else {
    return "".concat(href, "?").concat(params.slice(1));
  }
}

function stringifyQueryString(query) {
  var queryString = '';
  (0, _list.each)(query, function (val, key) {
    queryString = "".concat(queryString, "&").concat(key, "=").concat(val);
  });
  return queryString.slice(1);
}

function formatUnit(params) {
  if (isType(params, 'number')) {
    params = {
      target: params
    };
  }

  var _ref = params,
      target = _ref.target,
      _ref$unit = _ref.unit,
      unit = _ref$unit === void 0 ? 'common' : _ref$unit,
      _ref$suffix = _ref.suffix,
      suffix = _ref$suffix === void 0 ? '万' : _ref$suffix,
      _ref$precision = _ref.precision,
      precision = _ref$precision === void 0 ? 1 : _ref$precision;

  if (!isType(target, 'string') && !isType(target, 'number')) {
    return '';
  }

  if (unit === 'common') {
    if (target >= 10000 && target < 100000000) {
      return "".concat((target / 10000).toFixed(precision)).concat(suffix);
    }

    if (target >= 100000000) {
      return "".concat((target / 100000000).toFixed(precision), "\u4EBF");
    }

    return target.toString();
  } // 价格默认是分，去掉尾部为0的部分，同时对精度进行小数二位四舍五入


  if (unit === 'price') {
    return parseFloat((target / 100).toFixed(2)).toString();
  }

  if (unit === 'hot') {
    if (target >= 10000) {
      return "".concat((target / 10000).toFixed(precision)).concat(suffix);
    }

    return target.toString();
  }

  return target.toString();
}

function getTextLength(text) {
  var textLen = 0;

  for (var i = 0, len = text.length; i < len; i++) {
    if (text.charCodeAt(i) > 127 || text.charCodeAt(i) === 94) {
      textLen += 2;
    } else {
      textLen++;
    }
  }

  return Math.ceil(textLen / 2);
}

function ellipsis(target, maxLength) {
  var tail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';

  if (!isType(target, 'string')) {
    return '';
  }

  if (getTextLength(target) > maxLength) {
    var text = '';

    var _iterator = _createForOfIteratorHelper(target),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var i = _step.value;
        text += i;

        if (getTextLength(text) === maxLength) {
          return "".concat(text).concat(tail);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  return target;
}

function random(lower, upper) {
  if (upper === undefined) {
    upper = lower;
    lower = 0;
  }

  return lower + Math.floor(Math.random() * (upper - lower + 1));
}

function debounce(fn) {
  var _this = this;

  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$isLeading = _ref2.isLeading,
      isLeading = _ref2$isLeading === void 0 ? false : _ref2$isLeading;

  var timerId;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (isLeading) {
      fn.apply(_this, args);
      isLeading = false;
      return;
    }

    clearTimeout(timerId);
    timerId = setTimeout(function () {
      fn.apply(_this, args);
    }, wait);
  };
}

function throttle(fn) {
  var _this2 = this;

  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref3$isLeading = _ref3.isLeading,
      isLeading = _ref3$isLeading === void 0 ? true : _ref3$isLeading;

  var timerId;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (isLeading) {
      fn.apply(_this2, args);
      isLeading = false;
      return;
    }

    if (timerId) {
      return;
    }

    timerId = setTimeout(function () {
      clearTimeout(timerId);
      timerId = null;
      fn.apply(_this2, args);
    }, wait);
  };
}

var getRegExp = function getRegExp(target) {
  var flags = '';

  if (target.global) {
    flags += 'g';
  }

  if (target.ignoreCase) {
    flags += 'i';
  }

  if (target.multiline) {
    flags += 'm';
  }

  return flags;
};

function clone(obj) {
  var parents = [];
  var children = [];

  var _clone = function _clone(target) {
    if (isType(target, 'null')) {
      return target;
    }

    if (_typeof(target) !== 'object') {
      return target;
    }

    var child, proto;

    if (isType(target, 'array')) {
      child = [];
    } else if (isType(target, 'regexp')) {
      child = new RegExp(target.source, getRegExp(target));

      if (target.lastIndex) {
        child.lastIndex = target.lastIndex;
      }
    } else if (isType(target, 'date')) {
      child = new Date(target.getTime());
    } else {
      proto = Object.getPrototypeOf(target);
      child = Object.create(proto);
    } // 处理循环引用


    var index = parents.indexOf(target);

    if (index !== -1) {
      return children[index];
    }

    parents.push(target);
    children.push(child);

    for (var i in target) {
      child[i] = _clone(target[i]);
    }

    return child;
  };

  return _clone(obj);
}

function getUniqueId(target) {
  return Symbol(target);
}

var CAN_USE_WEBP = function () {
  var _document;

  var elem = (_document = document) === null || _document === void 0 ? void 0 : _document.createElement('canvas');

  if (!elem) {
    return false;
  }

  if (elem !== null && elem !== void 0 && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } else {
    return false;
  }
}();

exports.CAN_USE_WEBP = CAN_USE_WEBP;

function getPicUrl(_ref4) {
  var url = _ref4.url,
      _ref4$type = _ref4.type,
      type = _ref4$type === void 0 ? 'jpg' : _ref4$type;
  var picType = ['webp', 'jpg', 'png'];
  var canTransType = picType.some(function (t) {
    return url.endsWith(".".concat(t));
  });

  if (canTransType) {
    if (CAN_USE_WEBP) {
      return url.replace(/\.\w+$/, '.webp');
    } else {
      return url.replace(/\.\w+$/, ".".concat(type));
    }
  } else {
    return url;
  }
}

function invokeNum(target, fn) {
  var result;
  return function () {
    if (target-- > 0) {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      result = fn.apply(this, args);
    }

    return result;
  };
}

function once(fn) {
  return invokeNum(1, fn);
} // curry 比较重要且完善很复杂，确定直接使用单独的lodash的curry部分


var curry = _lodash["default"];
exports.curry = curry;
var EImageSize; // https://wiki.bytedance.net/pages/viewpage.action?pageId=93973838

/**
 * @deprecated 老域名下线，现在输入什么返回什么。别再用了
 */
//@ts-ignore 忽略这个参数

exports.EImageSize = EImageSize;

(function (EImageSize) {
  EImageSize["small"] = "small";
  EImageSize["noop"] = "noop";
  EImageSize["medium"] = "medium";
  EImageSize["large"] = "large";
})(EImageSize || (exports.EImageSize = EImageSize = {}));

function resolveImgUrl(src) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EImageSize.small;
  return src;
} // 安全执行JSON.parse


var safeParse = function safeParse(str) {
  var defaultVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var option = arguments.length > 2 ? arguments[2] : undefined;

  if (!str) {
    return defaultVal;
  }

  try {
    if (option && option.ignoreDecode) {
      return JSON.parse(str);
    } else {
      return JSON.parse(decodeURIComponent(str));
    }
  } catch (e) {
    return defaultVal;
  }
};

exports.safeParse = safeParse;
        },
        map: {"lodash.curry":8,"../list":3,"qs":9}
      }
    ,
      // /Users/admin/Codes/flash/src/common/list/index.ts
      3: {
        factory: (module, exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compact = compact;
exports.each = each;
exports.fillArray = fillArray;
exports.filter = filter;
exports.isEmpty = isEmpty;
exports.last = last;
exports.map = map;
exports.size = size;

var _fn = require("../fn");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function size(target) {
  if ((0, _fn.isType)(target, 'array') || (0, _fn.isType)(target, 'string')) {
    return target.length;
  }

  if ((0, _fn.isType)(target, 'object')) {
    return Object.keys(target).length;
  }

  if ((0, _fn.isType)(target, 'number')) {
    var targetInt = parseInt(target, 10);
    var targetStr = targetInt.toString();
    return targetStr.length;
  }

  return 0;
}

function compact(list) {
  var extraRemove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var valid = function valid(item) {
    var defaultValid = !((0, _fn.isType)(item, 'undefined') || (0, _fn.isType)(item, 'null') || (0, _fn.isType)(item, 'NaN'));

    if (size(extraRemove) > 0) {
      var extraValid = extraRemove.every(function (removeItem) {
        return item !== removeItem;
      });
      return defaultValid && extraValid;
    } else {
      return defaultValid;
    }
  };

  if ((0, _fn.isType)(list, 'array')) {
    return list.filter(valid);
  }

  if ((0, _fn.isType)(list, 'object')) {
    var obj = {};
    Object.keys(list).forEach(function (key) {
      var val = list[key];

      if (valid(val)) {
        obj[key] = val;
      }
    });
    return obj;
  }

  return list;
}

function filter(list, iteratee) {
  if ((0, _fn.isType)(list, 'array')) {
    return list.filter(iteratee);
  }

  if ((0, _fn.isType)(list, 'object')) {
    var obj = {};
    Object.keys(list).forEach(function (key) {
      var val = list[key];

      if (iteratee(val, key)) {
        obj[key] = val;
      }
    });
    return obj;
  }

  return list;
}

function map(list, iteratee) {
  if ((0, _fn.isType)(list, 'array')) {
    return list.map(iteratee);
  }

  if ((0, _fn.isType)(list, 'object')) {
    var obj = {};
    Object.keys(list).forEach(function (key) {
      var val = list[key];
      var item = iteratee(val, key);

      if (item) {
        Object.assign(obj, item);
      }
    });
    return obj;
  }

  return list;
}

function each(list, iteratee) {
  if ((0, _fn.isType)(list, 'array')) {
    list.forEach(function (item, index) {
      return iteratee(item, index);
    });
  }

  if ((0, _fn.isType)(list, 'object')) {
    Object.keys(list).forEach(function (key) {
      var val = list[key];
      iteratee(val, key);
    });
  }
}

function isEmpty(target) {
  if (!target && target !== 0) {
    return true;
  }

  return size(target) <= 0;
}

function last(target) {
  var len = target.length;

  if (len <= 0) {
    return {};
  }

  return target[len - 1];
}

function fillArray(target, item, maxLen) {
  var arrayLen = size(target);

  if (arrayLen >= maxLen) {
    return target;
  } else {
    var fill = _toConsumableArray(Array(maxLen - arrayLen)).map(function () {
      return item;
    });

    return target.concat(fill);
  }
}
        },
        map: {"../fn":2}
      }
    ,
      // /Users/admin/Codes/flash/src/common/object/index.ts
      4: {
        factory: (module, exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.keys = keys;
exports.merge = merge;
exports.omit = omit;
exports.pick = pick;
exports.values = values;

var _list = require("../list");

var _fn = require("../fn");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function keys(target) {
  return Object.keys(target);
}

function values(target) {
  return Object.keys(target).map(function (key) {
    return target[key];
  });
}

function omit(target, props) {
  return (0, _list.filter)(target, function (_val, key) {
    return props.every(function (item) {
      return key !== item;
    });
  });
}

function pick(target, props) {
  return (0, _list.filter)(target, function (_val, key) {
    return props.some(function (item) {
      return key === item;
    });
  });
}

function pathToArr(target) {
  var charCodeOfDot = '.'.charCodeAt(0);
  var reEscapeChar = /\\(\\)?/g;
  var rePropName = RegExp('[^.[\\]]+' + '|' + '\\[(?:' + '([^"\'][^[]*)' + '|' + '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' + ')\\]' + '|' + '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))', 'g');
  var result = [];

  if (target.charCodeAt(0) === charCodeOfDot) {
    result.push('');
  }

  target.replace(rePropName, function (match, expression, quote, subString) {
    var key = match;

    if (quote) {
      key = subString.replace(reEscapeChar, '$1');
    } else if (expression) {
      key = expression.trim();
    }

    result.push(key);
    return target;
  });
  return result;
}

function get(target, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!(0, _fn.isType)(target, 'object')) {
    return target;
  }

  var pathArr = pathToArr(path);
  var index = 0;
  var len = (0, _list.size)(pathArr);

  while (!(0, _fn.isType)(target, 'undefined') && !(0, _fn.isType)(target, 'null') && index < len) {
    target = target[pathArr[index++].toString()];
  }

  return index && index === len && !(0, _fn.isType)(target, 'undefined') ? target : defaultValue;
}

function merge(target, sources) {
  var _sources = (0, _list.map)(sources, function (source) {
    return (0, _list.compact)(source);
  });

  return Object.assign.apply(Object, [{}, target].concat(_toConsumableArray(_sources)));
}
        },
        map: {"../list":3,"../fn":2}
      }
    ,
      // /Users/admin/Codes/flash/src/common/partten/index.ts
      5: {
        factory: (module, exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventEmitter = void 0;

var _list = require("../list");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this._events = Object.create(null);
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(type, fn) {
      var insert = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'after';

      if (!this._events[type]) {
        this._events[type] = [];
      }

      if (insert === 'after') {
        this._events[type].push(fn);
      } else {
        this._events[type].unshift(fn);
      }

      return this;
    }
  }, {
    key: "once",
    value: function once(type, fn) {
      var _this = this;

      if (!this._events[type]) {
        this._events[type] = [];
      }

      var fnOnce = function fnOnce() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        fn.apply(_this, args);

        _this.remove(type, fnOnce);
      };

      this._events[type].push(fnOnce);

      return this;
    }
  }, {
    key: "emit",
    value: function emit(type) {
      var _this2 = this;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var fnsArr = this._events[type];

      if (!fnsArr || (0, _list.size)(fnsArr) === 0) {
        return this;
      }

      this.cloneFnArray(fnsArr).forEach(function (fn) {
        try {
          fn.apply(_this2, args);
        } catch (err) {
          console.error('fail to execute event handler of Event', err.stack);
        }
      });
      return this;
    }
  }, {
    key: "remove",
    value: function remove(type, fn) {
      var fnsArr = this._events[type];

      if (!fnsArr) {
        return this;
      }

      if (fn) {
        fnsArr.forEach(function (item, index) {
          if (item === fn) {
            fnsArr.splice(index, 1);
          }
        });
      } else {
        fnsArr.length = 0;
      }

      return this;
    }
  }, {
    key: "removeAll",
    value: function removeAll(type) {
      if (type) {
        var fnsArr = this._events[type];

        if (!fnsArr) {
          return this;
        }

        fnsArr.length = 0;
      }

      return this;
    }
  }, {
    key: "size",
    value: function size(type) {
      var fnsArr = this._events[type];
      return (0, _list.size)(fnsArr);
    }
  }, {
    key: "cloneFnArray",
    value: function cloneFnArray(fns) {
      return _toConsumableArray(fns);
    }
  }]);

  return EventEmitter;
}();

exports.EventEmitter = EventEmitter;
        },
        map: {"../list":3}
      }
    ,
      // /Users/admin/Codes/flash/src/common/timer/index.ts
      6: {
        factory: (module, exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Counter = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 计时器
var Counter = /*#__PURE__*/function () {
  // 记录是否是第一次启动倒计时，如果是就需要计算结束时间戳

  /**
   *
   * @param data
   * duration: 单位--毫秒
   * step: 单位--毫秒
   */
  function Counter(data) {
    _classCallCheck(this, Counter);

    _defineProperty(this, "_isFirst", true);

    if (data.step && data.duration % data.step !== 0) {
      this._bias = data.step - data.duration % data.step;
    } else {
      this._bias = 0;
    }

    this._second = data.duration + this._bias;
    this._funcList = [];
    this._duration = data.duration;
    this._stableDuration = data.duration;
    this._step = data.step ? data.step : 1000; // 步长不能小于1秒

    if (data.step && data.step < 1000) {
      throw new Error('Invalid step! Step must be no less than 1s.');
    }

    if (data.step && data.step > data.duration) {
      throw new Error('Step must be less than duration.');
    }

    if (data.format) {
      this._processor = data.format;
    } else {
      this._processor = function (ms) {
        // 入参的单位是毫秒，按需转换成秒
        var second = ms / 1000; // 计算出秒数

        var sec = Math.ceil(second) % 60; // 计算出分钟数

        var min = Math.floor(second / 60);
        return "".concat(min < 10 ? "0".concat(min) : min, ":").concat(sec < 10 ? "0".concat(sec) : sec);
      };
    }
  }

  _createClass(Counter, [{
    key: "subscribe",
    value: function subscribe(fn) {
      this._funcList.push(fn);

      this._iterate();
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(fn) {
      this._funcList = this._funcList.filter(function (func) {
        return func !== fn;
      });
    }
  }, {
    key: "start",
    value: function start() {
      this._startCountDown(false);
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this._counting === true) {
        // 停止计时的时候记下剩余时间
        this._duration = this._endTime - Date.now();
        this._isFirst = true;
        this._counting = false;
        clearTimeout(this._countDown);
      }
    }
  }, {
    key: "getDuration",
    value: function getDuration() {
      return this._endTime - Date.now();
    }
  }, {
    key: "stop",
    value: function stop() {
      // 暂停时也能停止
      this._duration = this._stableDuration;
      this._isFirst = true;
      this._counting = false;
      this._second = this._stableDuration;
      clearTimeout(this._countDown);
    }
  }, {
    key: "handleComplete",
    value: function handleComplete() {
      var _this = this;

      this._funcList.forEach(function (element) {
        element('complete', _this._processor(_this._second));
      });
    }
  }, {
    key: "_startCountDown",
    value: function _startCountDown(isCallback) {
      var _this2 = this;

      // 拒绝主动调取多次
      if (isCallback === false && this._isFirst === false) {
        return;
      } // 第一次启动计时器时记下时间戳


      if (this._isFirst === true) {
        this._endTime = this._duration + Date.now();
        this._isFirst = false;
        this._preTime = Date.now();
      } else {
        this._preTime = this._currTime;
      } // 防作弊-一旦检测到用户修改系统时间，就顺延倒计时结束时间


      this._currTime = Date.now();
      var gap = this._currTime - this._preTime;

      if (gap < 0 || gap >= 500) {
        this._endTime += gap;
      }

      var left = this._endTime - Date.now(); // 不在计时且剩余时间大于0时启动计时器

      if (left > 0) {
        this._counting = true;
        this._countDown = setTimeout(function () {
          // 时间真正更新时(两次的时间差大于等于步长)执行更新回调
          if (Math.ceil(_this2._second / _this2._step) - 1 >= Math.ceil((left + _this2._bias) / _this2._step)) {
            _this2._second = Math.ceil((left + _this2._bias) / _this2._step) * _this2._step;

            _this2._iterate();
          }

          _this2._startCountDown(true);
        }, 100); // 计时结束后停止计时器
      } else {
        this._second = 0;

        this._iterate();

        this.handleComplete();
        this.stop();
      }
    }
  }, {
    key: "_iterate",
    value: function _iterate() {
      var _this3 = this;

      this._funcList.forEach(function (element) {
        element('update', _this3._processor(_this3._second - _this3._bias));
      });
    }
  }]);

  return Counter;
}();

exports.Counter = Counter;
        },
        map: {}
      }
    ,
      // /Users/admin/Codes/flash/src/common/schema/index.ts
      7: {
        factory: (module, exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateHistoryPath = exports.linkAddHistoryPath = exports.getHistoryPath = exports.addHistoryPath = void 0;

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function parseUrl(url) {
  var splittedUrl = url.split('?');
  return [splittedUrl[0], _qs["default"].parse(splittedUrl[1] || '')];
}
/**
 * 将history_path拼到schema的url里面----------跳转页面拼schema时用
 */


var linkAddHistoryPath = function linkAddHistoryPath(link, enterFrom) {
  var urlReg = /url=/;
  var haveUrl = urlReg.test(link);

  if (haveUrl) {
    /**
     * 从url=往后找到第一个&号，把history_path插到前面
     */
    var index = link.slice(link.search(urlReg)).search(/&./) + link.search(urlReg);
    return "".concat(link.slice(0, index), "%26history_path%3D").concat(enterFrom).concat(link.slice(index));
  }

  return link;
};
/**
 * 
 * 将enter_from拼接到history_path上---------埋点上报取参数时用
 */


exports.linkAddHistoryPath = linkAddHistoryPath;

var updateHistoryPath = function updateHistoryPath(oldPath, enterFrom) {
  var tmpList = oldPath.split('__');
  /**
   * 如果长度超标了就删去头元素
   */

  if (tmpList.length >= 3) {
    tmpList.shift();
  }

  tmpList.push(enterFrom);
  return tmpList.join('__');
};
/**
 * 
 * 把enter_from拼到history_path上，如果超出长度就丢掉第一个
 */


exports.updateHistoryPath = updateHistoryPath;

var getHistoryPath = function getHistoryPath(historyPath, enterFrom) {
  var tmpList = historyPath.split('__');
  /**
   * 如果长度超标了就删去头元素
   */

  if (tmpList.length >= 3) {
    tmpList.shift();
  }

  tmpList.push(enterFrom);
  return tmpList.join('__');
};
/**
 *
 * 把schema拆开然后重新处理，加入history_path
 */


exports.getHistoryPath = getHistoryPath;

var addHistoryPath = function addHistoryPath(query, schema, pageName) {
  var _parseUrl = parseUrl(schema),
      _parseUrl2 = _slicedToArray(_parseUrl, 2),
      schemaPrefix = _parseUrl2[0],
      schemaObj = _parseUrl2[1];

  var history_path = query.history_path,
      enter_from = query.enter_from;
  var tmpHistoryPath = history_path || enter_from;
  var path = tmpHistoryPath && pageName ? getHistoryPath(tmpHistoryPath, pageName) : pageName;
  schemaObj.history_path = path;

  if (schemaObj.url) {
    var _parseUrl3 = parseUrl(schemaObj.url),
        _parseUrl4 = _slicedToArray(_parseUrl3, 2),
        urlPrefix = _parseUrl4[0],
        urlObj = _parseUrl4[1];

    urlObj.history_path = path;
    schemaObj.url = "".concat(urlPrefix, "?").concat(_qs["default"].stringify(urlObj, {
      arrayFormat: 'repeat'
    }));
  }

  if (schemaObj.surl) {
    var _parseUrl5 = parseUrl(schemaObj.surl),
        _parseUrl6 = _slicedToArray(_parseUrl5, 2),
        surlPrefix = _parseUrl6[0],
        surlObj = _parseUrl6[1];

    surlObj.history_path = path;
    schemaObj.surl = "".concat(surlPrefix, "?").concat(_qs["default"].stringify(surlObj, {
      arrayFormat: 'repeat'
    }));
  }

  var newSchema = "".concat(schemaPrefix, "?").concat(_qs["default"].stringify(schemaObj, {
    arrayFormat: 'repeat'
  }));
  return newSchema;
};

exports.addHistoryPath = addHistoryPath;
        },
        map: {"qs":9}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/lodash.curry/index.js
      8: {
        factory: (module, exports, require) => {
          "use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';
/** Used as the internal argument placeholder. */

var PLACEHOLDER = '__lodash_placeholder__';
/** Used to compose bitmasks for function metadata. */

var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 4,
    CURRY_FLAG = 8,
    CURRY_RIGHT_FLAG = 16,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64,
    ARY_FLAG = 128,
    REARG_FLAG = 256,
    FLIP_FLAG = 512;
/** Used as references for various `Number` constants. */

var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;
/** Used to associate wrap methods with their bit flags. */

var wrapFlags = [['ary', ARY_FLAG], ['bind', BIND_FLAG], ['bindKey', BIND_KEY_FLAG], ['curry', CURRY_FLAG], ['curryRight', CURRY_RIGHT_FLAG], ['flip', FLIP_FLAG], ['partial', PARTIAL_FLAG], ['partialRight', PARTIAL_RIGHT_FLAG], ['rearg', REARG_FLAG]];
/** `Object#toString` result references. */

var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to match leading and trailing whitespace. */

var reTrim = /^\s+|\s+$/g;
/** Used to match wrap detail comments. */

var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
    reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
    reSplitDetails = /,? & /;
/** Used to detect bad signed hexadecimal string values. */

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */

var reIsBinary = /^0b[01]+$/i;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used to detect octal string values. */

var reIsOctal = /^0o[0-7]+$/i;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/** Built-in method references without a dependency on `root`. */

var freeParseInt = parseInt;
/** Detect free variable `global` from Node.js. */

var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;
/** Detect free variable `self`. */

var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */

function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);

    case 1:
      return func.call(thisArg, args[0]);

    case 2:
      return func.call(thisArg, args[0], args[1]);

    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }

  return func.apply(thisArg, args);
}
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */


function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }

  return array;
}
/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */


function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }

  return -1;
}
/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }

  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }

  return -1;
}
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */


function baseIsNaN(value) {
  return value !== value;
}
/**
 * Gets the number of `placeholder` occurrences in `array`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} placeholder The placeholder to search for.
 * @returns {number} Returns the placeholder count.
 */


function countHolders(array, placeholder) {
  var length = array.length,
      result = 0;

  while (length--) {
    if (array[length] === placeholder) {
      result++;
    }
  }

  return result;
}
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */


function getValue(object, key) {
  return object == null ? undefined : object[key];
}
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */


function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;

  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }

  return result;
}
/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */


function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (value === placeholder || value === PLACEHOLDER) {
      array[index] = PLACEHOLDER;
      result[resIndex++] = index;
    }
  }

  return result;
}
/** Used for built-in method references. */


var funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to detect overreaching core-js shims. */

var coreJsData = root['__core-js_shared__'];
/** Used to detect methods masquerading as native. */

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/** Used to resolve the decompiled source of functions. */


var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/** Built-in value references. */

var objectCreate = Object.create;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max,
    nativeMin = Math.min;
/* Used to set `toString` methods. */

var defineProperty = function () {
  var func = getNative(Object, 'defineProperty'),
      name = getNative.name;
  return name && name.length > 2 ? func : undefined;
}();
/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */


function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */


function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */


function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersLength = holders.length,
      leftIndex = -1,
      leftLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(leftLength + rangeLength),
      isUncurried = !isCurried;

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }

  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }

  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }

  return result;
}
/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */


function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersIndex = -1,
      holdersLength = holders.length,
      rightIndex = -1,
      rightLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(rangeLength + rightLength),
      isUncurried = !isCurried;

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }

  var offset = argsIndex;

  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }

  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }

  return result;
}
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */


function copyArray(source, array) {
  var index = -1,
      length = source.length;
  array || (array = Array(length));

  while (++index < length) {
    array[index] = source[index];
  }

  return array;
}
/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */


function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }

  return wrapper;
}
/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */


function createCtor(Ctor) {
  return function () {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;

    switch (args.length) {
      case 0:
        return new Ctor();

      case 1:
        return new Ctor(args[0]);

      case 2:
        return new Ctor(args[0], args[1]);

      case 3:
        return new Ctor(args[0], args[1], args[2]);

      case 4:
        return new Ctor(args[0], args[1], args[2], args[3]);

      case 5:
        return new Ctor(args[0], args[1], args[2], args[3], args[4]);

      case 6:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);

      case 7:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }

    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args); // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.

    return isObject(result) ? result : thisBinding;
  };
}
/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */


function createCurry(func, bitmask, arity) {
  var Ctor = createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }

    var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
    length -= holders.length;

    if (length < arity) {
      return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
    }

    var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
    return apply(fn, this, args);
  }

  return wrapper;
}
/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */


function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & ARY_FLAG,
      isBind = bitmask & BIND_FLAG,
      isBindKey = bitmask & BIND_KEY_FLAG,
      isCurried = bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG),
      isFlip = bitmask & FLIP_FLAG,
      Ctor = isBindKey ? undefined : createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length;

    while (index--) {
      args[index] = arguments[index];
    }

    if (isCurried) {
      var placeholder = getHolder(wrapper),
          holdersCount = countHolders(args, placeholder);
    }

    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }

    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }

    length -= holdersCount;

    if (isCurried && length < arity) {
      var newHolders = replaceHolders(args, placeholder);
      return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
    }

    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;
    length = args.length;

    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }

    if (isAry && ary < length) {
      args.length = ary;
    }

    if (this && this !== root && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }

    return fn.apply(thisBinding, args);
  }

  return wrapper;
}
/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */


function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = this && this !== root && this instanceof wrapper ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }

    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }

    return apply(fn, isBind ? thisArg : this, args);
  }

  return wrapper;
}
/**
 * Creates a function that wraps `func` to continue currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {Function} wrapFunc The function to create the `func` wrapper.
 * @param {*} placeholder The placeholder value.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */


function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & CURRY_FLAG,
      newHolders = isCurry ? holders : undefined,
      newHoldersRight = isCurry ? undefined : holders,
      newPartials = isCurry ? partials : undefined,
      newPartialsRight = isCurry ? undefined : partials;
  bitmask |= isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG;
  bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

  if (!(bitmask & CURRY_BOUND_FLAG)) {
    bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
  }

  var result = wrapFunc(func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity);
  result.placeholder = placeholder;
  return setWrapToString(result, func, bitmask);
}
/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags.
 *  The bitmask may be composed of the following flags:
 *     1 - `_.bind`
 *     2 - `_.bindKey`
 *     4 - `_.curry` or `_.curryRight` of a bound function
 *     8 - `_.curry`
 *    16 - `_.curryRight`
 *    32 - `_.partial`
 *    64 - `_.partialRight`
 *   128 - `_.rearg`
 *   256 - `_.ary`
 *   512 - `_.flip`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */


function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & BIND_KEY_FLAG;

  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  var length = partials ? partials.length : 0;

  if (!length) {
    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
    partials = holders = undefined;
  }

  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;
    partials = holders = undefined;
  }

  var newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] == null ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);

  if (!arity && bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG)) {
    bitmask &= ~(CURRY_FLAG | CURRY_RIGHT_FLAG);
  }

  if (!bitmask || bitmask == BIND_FLAG) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }

  return setWrapToString(result, func, bitmask);
}
/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */


function getHolder(func) {
  var object = func;
  return object.placeholder;
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}
/**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */


function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}
/**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */


function insertWrapDetails(source, details) {
  var length = details.length,
      lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
  details = details.join(length > 2 ? ', ' : ' ');
  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */


function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */


function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = copyArray(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }

  return array;
}
/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */


var setWrapToString = !defineProperty ? identity : function (wrapper, reference, bitmask) {
  var source = reference + '';
  return defineProperty(wrapper, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)))
  });
};
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}
/**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */


function updateWrapDetails(details, bitmask) {
  arrayEach(wrapFlags, function (pair) {
    var value = '_.' + pair[0];

    if (bitmask & pair[1] && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}
/**
 * Creates a function that accepts arguments of `func` and either invokes
 * `func` returning its result, if at least `arity` number of arguments have
 * been provided, or returns a function that accepts the remaining `func`
 * arguments, and so on. The arity of `func` may be specified if `func.length`
 * is not sufficient.
 *
 * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for provided arguments.
 *
 * **Note:** This method doesn't set the "length" property of curried functions.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Function
 * @param {Function} func The function to curry.
 * @param {number} [arity=func.length] The arity of `func`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the new curried function.
 * @example
 *
 * var abc = function(a, b, c) {
 *   return [a, b, c];
 * };
 *
 * var curried = _.curry(abc);
 *
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 *
 * // Curried with placeholders.
 * curried(1)(_, 3)(2);
 * // => [1, 2, 3]
 */


function curry(func, arity, guard) {
  arity = guard ? undefined : arity;
  var result = createWrap(func, CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
  result.placeholder = curry.placeholder;
  return result;
}
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */


function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */


function isObject(value) {
  var type = _typeof(value);

  return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */


function isObjectLike(value) {
  return !!value && _typeof(value) == 'object';
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */


function isSymbol(value) {
  return _typeof(value) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */


function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }

  value = toNumber(value);

  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }

  return value === value ? value : 0;
}
/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */


function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */


function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol(value)) {
    return NAN;
  }

  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */


function constant(value) {
  return function () {
    return value;
  };
}
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */


function identity(value) {
  return value;
} // Assign default placeholders.


curry.placeholder = {};
module.exports = curry;
        },
        map: {}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/qs/lib/index.js
      9: {
        factory: (module, exports, require) => {
          'use strict';

var stringify = require('./stringify');

var parse = require('./parse');

var formats = require('./formats');

module.exports = {
  formats: formats,
  parse: parse,
  stringify: stringify
};
        },
        map: {"./stringify":10,"./parse":11,"./formats":12}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/qs/lib/stringify.js
      10: {
        factory: (module, exports, require) => {
          'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var getSideChannel = require('side-channel');

var utils = require('./utils');

var formats = require('./formats');

var has = Object.prototype.hasOwnProperty;
var arrayPrefixGenerators = {
  brackets: function brackets(prefix) {
    return prefix + '[]';
  },
  comma: 'comma',
  indices: function indices(prefix, key) {
    return prefix + '[' + key + ']';
  },
  repeat: function repeat(prefix) {
    return prefix;
  }
};
var isArray = Array.isArray;
var push = Array.prototype.push;

var pushToArray = function pushToArray(arr, valueOrArray) {
  push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;
var defaultFormat = formats['default'];
var defaults = {
  addQueryPrefix: false,
  allowDots: false,
  charset: 'utf-8',
  charsetSentinel: false,
  delimiter: '&',
  encode: true,
  encoder: utils.encode,
  encodeValuesOnly: false,
  format: defaultFormat,
  formatter: formats.formatters[defaultFormat],
  // deprecated
  indices: false,
  serializeDate: function serializeDate(date) {
    return toISO.call(date);
  },
  skipNulls: false,
  strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
  return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || _typeof(v) === 'symbol' || typeof v === 'bigint';
};

var stringify = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
  var obj = object;

  if (sideChannel.has(object)) {
    throw new RangeError('Cyclic object value');
  }

  if (typeof filter === 'function') {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate(obj);
  } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
    obj = utils.maybeMap(obj, function (value) {
      if (value instanceof Date) {
        return serializeDate(value);
      }

      return value;
    });
  }

  if (obj === null) {
    if (strictNullHandling) {
      return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
    }

    obj = '';
  }

  if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
    if (encoder) {
      var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
      return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
    }

    return [formatter(prefix) + '=' + formatter(String(obj))];
  }

  var values = [];

  if (typeof obj === 'undefined') {
    return values;
  }

  var objKeys;

  if (generateArrayPrefix === 'comma' && isArray(obj)) {
    // we need to join elements in
    objKeys = [{
      value: obj.length > 0 ? obj.join(',') || null : undefined
    }];
  } else if (isArray(filter)) {
    objKeys = filter;
  } else {
    var keys = Object.keys(obj);
    objKeys = sort ? keys.sort(sort) : keys;
  }

  for (var i = 0; i < objKeys.length; ++i) {
    var key = objKeys[i];
    var value = _typeof(key) === 'object' && key.value !== undefined ? key.value : obj[key];

    if (skipNulls && value === null) {
      continue;
    }

    var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix : prefix + (allowDots ? '.' + key : '[' + key + ']');
    sideChannel.set(object, true);
    var valueSideChannel = getSideChannel();
    pushToArray(values, stringify(value, keyPrefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, valueSideChannel));
  }

  return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
  if (!opts) {
    return defaults;
  }

  if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
    throw new TypeError('Encoder has to be a function.');
  }

  var charset = opts.charset || defaults.charset;

  if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
    throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
  }

  var format = formats['default'];

  if (typeof opts.format !== 'undefined') {
    if (!has.call(formats.formatters, opts.format)) {
      throw new TypeError('Unknown format option provided.');
    }

    format = opts.format;
  }

  var formatter = formats.formatters[format];
  var filter = defaults.filter;

  if (typeof opts.filter === 'function' || isArray(opts.filter)) {
    filter = opts.filter;
  }

  return {
    addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
    allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
    charset: charset,
    charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
    delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
    encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
    encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
    filter: filter,
    format: format,
    formatter: formatter,
    serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
    skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
    sort: typeof opts.sort === 'function' ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
  };
};

module.exports = function (object, opts) {
  var obj = object;
  var options = normalizeStringifyOptions(opts);
  var objKeys;
  var filter;

  if (typeof options.filter === 'function') {
    filter = options.filter;
    obj = filter('', obj);
  } else if (isArray(options.filter)) {
    filter = options.filter;
    objKeys = filter;
  }

  var keys = [];

  if (_typeof(obj) !== 'object' || obj === null) {
    return '';
  }

  var arrayFormat;

  if (opts && opts.arrayFormat in arrayPrefixGenerators) {
    arrayFormat = opts.arrayFormat;
  } else if (opts && 'indices' in opts) {
    arrayFormat = opts.indices ? 'indices' : 'repeat';
  } else {
    arrayFormat = 'indices';
  }

  var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

  if (!objKeys) {
    objKeys = Object.keys(obj);
  }

  if (options.sort) {
    objKeys.sort(options.sort);
  }

  var sideChannel = getSideChannel();

  for (var i = 0; i < objKeys.length; ++i) {
    var key = objKeys[i];

    if (options.skipNulls && obj[key] === null) {
      continue;
    }

    pushToArray(keys, stringify(obj[key], key, generateArrayPrefix, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.format, options.formatter, options.encodeValuesOnly, options.charset, sideChannel));
  }

  var joined = keys.join(options.delimiter);
  var prefix = options.addQueryPrefix === true ? '?' : '';

  if (options.charsetSentinel) {
    if (options.charset === 'iso-8859-1') {
      // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
      prefix += 'utf8=%26%2310003%3B&';
    } else {
      // encodeURIComponent('✓')
      prefix += 'utf8=%E2%9C%93&';
    }
  }

  return joined.length > 0 ? prefix + joined : '';
};
        },
        map: {"side-channel":13,"./utils":14,"./formats":12}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/qs/lib/parse.js
      11: {
        factory: (module, exports, require) => {
          'use strict';

var utils = require('./utils');

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;
var defaults = {
  allowDots: false,
  allowPrototypes: false,
  allowSparse: false,
  arrayLimit: 20,
  charset: 'utf-8',
  charsetSentinel: false,
  comma: false,
  decoder: utils.decode,
  delimiter: '&',
  depth: 5,
  ignoreQueryPrefix: false,
  interpretNumericEntities: false,
  parameterLimit: 1000,
  parseArrays: true,
  plainObjects: false,
  strictNullHandling: false
};

var interpretNumericEntities = function interpretNumericEntities(str) {
  return str.replace(/&#(\d+);/g, function ($0, numberStr) {
    return String.fromCharCode(parseInt(numberStr, 10));
  });
};

var parseArrayValue = function parseArrayValue(val, options) {
  if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
    return val.split(',');
  }

  return val;
}; // This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.


var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')
// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.

var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
  var obj = {};
  var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
  var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
  var parts = cleanStr.split(options.delimiter, limit);
  var skipIndex = -1; // Keep track of where the utf8 sentinel was found

  var i;
  var charset = options.charset;

  if (options.charsetSentinel) {
    for (i = 0; i < parts.length; ++i) {
      if (parts[i].indexOf('utf8=') === 0) {
        if (parts[i] === charsetSentinel) {
          charset = 'utf-8';
        } else if (parts[i] === isoSentinel) {
          charset = 'iso-8859-1';
        }

        skipIndex = i;
        i = parts.length; // The eslint settings do not allow break;
      }
    }
  }

  for (i = 0; i < parts.length; ++i) {
    if (i === skipIndex) {
      continue;
    }

    var part = parts[i];
    var bracketEqualsPos = part.indexOf(']=');
    var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;
    var key, val;

    if (pos === -1) {
      key = options.decoder(part, defaults.decoder, charset, 'key');
      val = options.strictNullHandling ? null : '';
    } else {
      key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
      val = utils.maybeMap(parseArrayValue(part.slice(pos + 1), options), function (encodedVal) {
        return options.decoder(encodedVal, defaults.decoder, charset, 'value');
      });
    }

    if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
      val = interpretNumericEntities(val);
    }

    if (part.indexOf('[]=') > -1) {
      val = isArray(val) ? [val] : val;
    }

    if (has.call(obj, key)) {
      obj[key] = utils.combine(obj[key], val);
    } else {
      obj[key] = val;
    }
  }

  return obj;
};

var parseObject = function parseObject(chain, val, options, valuesParsed) {
  var leaf = valuesParsed ? val : parseArrayValue(val, options);

  for (var i = chain.length - 1; i >= 0; --i) {
    var obj;
    var root = chain[i];

    if (root === '[]' && options.parseArrays) {
      obj = [].concat(leaf);
    } else {
      obj = options.plainObjects ? Object.create(null) : {};
      var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
      var index = parseInt(cleanRoot, 10);

      if (!options.parseArrays && cleanRoot === '') {
        obj = {
          0: leaf
        };
      } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {
        obj = [];
        obj[index] = leaf;
      } else {
        obj[cleanRoot] = leaf;
      }
    }

    leaf = obj;
  }

  return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
  if (!givenKey) {
    return;
  } // Transform dot notation to bracket notation


  var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey; // The regex chunks

  var brackets = /(\[[^[\]]*])/;
  var child = /(\[[^[\]]*])/g; // Get the parent

  var segment = options.depth > 0 && brackets.exec(key);
  var parent = segment ? key.slice(0, segment.index) : key; // Stash the parent if it exists

  var keys = [];

  if (parent) {
    // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
    if (!options.plainObjects && has.call(Object.prototype, parent)) {
      if (!options.allowPrototypes) {
        return;
      }
    }

    keys.push(parent);
  } // Loop through children appending to the array until we hit depth


  var i = 0;

  while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
    i += 1;

    if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
      if (!options.allowPrototypes) {
        return;
      }
    }

    keys.push(segment[1]);
  } // If there's a remainder, just add whatever is left


  if (segment) {
    keys.push('[' + key.slice(segment.index) + ']');
  }

  return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
  if (!opts) {
    return defaults;
  }

  if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
    throw new TypeError('Decoder has to be a function.');
  }

  if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
    throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
  }

  var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;
  return {
    allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
    allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
    allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,
    arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
    charset: charset,
    charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
    comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
    decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
    delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof opts.depth === 'number' || opts.depth === false ? +opts.depth : defaults.depth,
    ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
    interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
    parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
    parseArrays: opts.parseArrays !== false,
    plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
    strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
  };
};

module.exports = function (str, opts) {
  var options = normalizeParseOptions(opts);

  if (str === '' || str === null || typeof str === 'undefined') {
    return options.plainObjects ? Object.create(null) : {};
  }

  var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
  var obj = options.plainObjects ? Object.create(null) : {}; // Iterate over the keys and setup the new object

  var keys = Object.keys(tempObj);

  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];
    var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
    obj = utils.merge(obj, newObj, options);
  }

  if (options.allowSparse === true) {
    return obj;
  }

  return utils.compact(obj);
};
        },
        map: {"./utils":14}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/qs/lib/formats.js
      12: {
        factory: (module, exports, require) => {
          'use strict';

var replace = String.prototype.replace;
var percentTwenties = /%20/g;
var Format = {
  RFC1738: 'RFC1738',
  RFC3986: 'RFC3986'
};
module.exports = {
  'default': Format.RFC3986,
  formatters: {
    RFC1738: function RFC1738(value) {
      return replace.call(value, percentTwenties, '+');
    },
    RFC3986: function RFC3986(value) {
      return String(value);
    }
  },
  RFC1738: Format.RFC1738,
  RFC3986: Format.RFC3986
};
        },
        map: {}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/side-channel/index.js
      13: {
        factory: (module, exports, require) => {
          'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var GetIntrinsic = require('get-intrinsic');

var callBound = require('call-bind/callBound');

var inspect = require('object-inspect');

var $TypeError = GetIntrinsic('%TypeError%');
var $WeakMap = GetIntrinsic('%WeakMap%', true);
var $Map = GetIntrinsic('%Map%', true);
var $weakMapGet = callBound('WeakMap.prototype.get', true);
var $weakMapSet = callBound('WeakMap.prototype.set', true);
var $weakMapHas = callBound('WeakMap.prototype.has', true);
var $mapGet = callBound('Map.prototype.get', true);
var $mapSet = callBound('Map.prototype.set', true);
var $mapHas = callBound('Map.prototype.has', true);
/*
 * This function traverses the list returning the node corresponding to the
 * given key.
 *
 * That node is also moved to the head of the list, so that if it's accessed
 * again we don't need to traverse the whole list. By doing so, all the recently
 * used nodes can be accessed relatively quickly.
 */

var listGetNode = function listGetNode(list, key) {
  // eslint-disable-line consistent-return
  for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
    if (curr.key === key) {
      prev.next = curr.next;
      curr.next = list.next;
      list.next = curr; // eslint-disable-line no-param-reassign

      return curr;
    }
  }
};

var listGet = function listGet(objects, key) {
  var node = listGetNode(objects, key);
  return node && node.value;
};

var listSet = function listSet(objects, key, value) {
  var node = listGetNode(objects, key);

  if (node) {
    node.value = value;
  } else {
    // Prepend the new node to the beginning of the list
    objects.next = {
      // eslint-disable-line no-param-reassign
      key: key,
      next: objects.next,
      value: value
    };
  }
};

var listHas = function listHas(objects, key) {
  return !!listGetNode(objects, key);
};

module.exports = function getSideChannel() {
  var $wm;
  var $m;
  var $o;
  var channel = {
    assert: function assert(key) {
      if (!channel.has(key)) {
        throw new $TypeError('Side channel does not contain ' + inspect(key));
      }
    },
    get: function get(key) {
      // eslint-disable-line consistent-return
      if ($WeakMap && key && (_typeof(key) === 'object' || typeof key === 'function')) {
        if ($wm) {
          return $weakMapGet($wm, key);
        }
      } else if ($Map) {
        if ($m) {
          return $mapGet($m, key);
        }
      } else {
        if ($o) {
          // eslint-disable-line no-lonely-if
          return listGet($o, key);
        }
      }
    },
    has: function has(key) {
      if ($WeakMap && key && (_typeof(key) === 'object' || typeof key === 'function')) {
        if ($wm) {
          return $weakMapHas($wm, key);
        }
      } else if ($Map) {
        if ($m) {
          return $mapHas($m, key);
        }
      } else {
        if ($o) {
          // eslint-disable-line no-lonely-if
          return listHas($o, key);
        }
      }

      return false;
    },
    set: function set(key, value) {
      if ($WeakMap && key && (_typeof(key) === 'object' || typeof key === 'function')) {
        if (!$wm) {
          $wm = new $WeakMap();
        }

        $weakMapSet($wm, key, value);
      } else if ($Map) {
        if (!$m) {
          $m = new $Map();
        }

        $mapSet($m, key, value);
      } else {
        if (!$o) {
          /*
           * Initialize the linked list as an empty node, so that we don't have
           * to special-case handling of the first node: we can always refer to
           * it as (previous node).next, instead of something like (list).head
           */
          $o = {
            key: {},
            next: null
          };
        }

        listSet($o, key, value);
      }
    }
  };
  return channel;
};
        },
        map: {"get-intrinsic":15,"call-bind/callBound":16,"object-inspect":17}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/qs/lib/utils.js
      14: {
        factory: (module, exports, require) => {
          'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var formats = require('./formats');

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = function () {
  var array = [];

  for (var i = 0; i < 256; ++i) {
    array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
  }

  return array;
}();

var compactQueue = function compactQueue(queue) {
  while (queue.length > 1) {
    var item = queue.pop();
    var obj = item.obj[item.prop];

    if (isArray(obj)) {
      var compacted = [];

      for (var j = 0; j < obj.length; ++j) {
        if (typeof obj[j] !== 'undefined') {
          compacted.push(obj[j]);
        }
      }

      item.obj[item.prop] = compacted;
    }
  }
};

var arrayToObject = function arrayToObject(source, options) {
  var obj = options && options.plainObjects ? Object.create(null) : {};

  for (var i = 0; i < source.length; ++i) {
    if (typeof source[i] !== 'undefined') {
      obj[i] = source[i];
    }
  }

  return obj;
};

var merge = function merge(target, source, options) {
  /* eslint no-param-reassign: 0 */
  if (!source) {
    return target;
  }

  if (_typeof(source) !== 'object') {
    if (isArray(target)) {
      target.push(source);
    } else if (target && _typeof(target) === 'object') {
      if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
        target[source] = true;
      }
    } else {
      return [target, source];
    }

    return target;
  }

  if (!target || _typeof(target) !== 'object') {
    return [target].concat(source);
  }

  var mergeTarget = target;

  if (isArray(target) && !isArray(source)) {
    mergeTarget = arrayToObject(target, options);
  }

  if (isArray(target) && isArray(source)) {
    source.forEach(function (item, i) {
      if (has.call(target, i)) {
        var targetItem = target[i];

        if (targetItem && _typeof(targetItem) === 'object' && item && _typeof(item) === 'object') {
          target[i] = merge(targetItem, item, options);
        } else {
          target.push(item);
        }
      } else {
        target[i] = item;
      }
    });
    return target;
  }

  return Object.keys(source).reduce(function (acc, key) {
    var value = source[key];

    if (has.call(acc, key)) {
      acc[key] = merge(acc[key], value, options);
    } else {
      acc[key] = value;
    }

    return acc;
  }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
  return Object.keys(source).reduce(function (acc, key) {
    acc[key] = source[key];
    return acc;
  }, target);
};

var decode = function decode(str, decoder, charset) {
  var strWithoutPlus = str.replace(/\+/g, ' ');

  if (charset === 'iso-8859-1') {
    // unescape never throws, no try...catch needed:
    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
  } // utf-8


  try {
    return decodeURIComponent(strWithoutPlus);
  } catch (e) {
    return strWithoutPlus;
  }
};

var encode = function encode(str, defaultEncoder, charset, kind, format) {
  // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
  // It has been adapted here for stricter adherence to RFC 3986
  if (str.length === 0) {
    return str;
  }

  var string = str;

  if (_typeof(str) === 'symbol') {
    string = Symbol.prototype.toString.call(str);
  } else if (typeof str !== 'string') {
    string = String(str);
  }

  if (charset === 'iso-8859-1') {
    return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
      return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
    });
  }

  var out = '';

  for (var i = 0; i < string.length; ++i) {
    var c = string.charCodeAt(i);

    if (c === 0x2D // -
    || c === 0x2E // .
    || c === 0x5F // _
    || c === 0x7E // ~
    || c >= 0x30 && c <= 0x39 // 0-9
    || c >= 0x41 && c <= 0x5A // a-z
    || c >= 0x61 && c <= 0x7A // A-Z
    || format === formats.RFC1738 && (c === 0x28 || c === 0x29) // ( )
    ) {
      out += string.charAt(i);
      continue;
    }

    if (c < 0x80) {
      out = out + hexTable[c];
      continue;
    }

    if (c < 0x800) {
      out = out + (hexTable[0xC0 | c >> 6] + hexTable[0x80 | c & 0x3F]);
      continue;
    }

    if (c < 0xD800 || c >= 0xE000) {
      out = out + (hexTable[0xE0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F]);
      continue;
    }

    i += 1;
    c = 0x10000 + ((c & 0x3FF) << 10 | string.charCodeAt(i) & 0x3FF);
    out += hexTable[0xF0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3F] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F];
  }

  return out;
};

var compact = function compact(value) {
  var queue = [{
    obj: {
      o: value
    },
    prop: 'o'
  }];
  var refs = [];

  for (var i = 0; i < queue.length; ++i) {
    var item = queue[i];
    var obj = item.obj[item.prop];
    var keys = Object.keys(obj);

    for (var j = 0; j < keys.length; ++j) {
      var key = keys[j];
      var val = obj[key];

      if (_typeof(val) === 'object' && val !== null && refs.indexOf(val) === -1) {
        queue.push({
          obj: obj,
          prop: key
        });
        refs.push(val);
      }
    }
  }

  compactQueue(queue);
  return value;
};

var isRegExp = function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
  if (!obj || _typeof(obj) !== 'object') {
    return false;
  }

  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
  return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
  if (isArray(val)) {
    var mapped = [];

    for (var i = 0; i < val.length; i += 1) {
      mapped.push(fn(val[i]));
    }

    return mapped;
  }

  return fn(val);
};

module.exports = {
  arrayToObject: arrayToObject,
  assign: assign,
  combine: combine,
  compact: compact,
  decode: decode,
  encode: encode,
  isBuffer: isBuffer,
  isRegExp: isRegExp,
  maybeMap: maybeMap,
  merge: merge
};
        },
        map: {"./formats":12}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/get-intrinsic/index.js
      15: {
        factory: (module, exports, require) => {
          'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var undefined;
var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError; // eslint-disable-next-line consistent-return

var getEvalledConstructor = function getEvalledConstructor(expressionSyntax) {
  try {
    return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
  } catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;

if ($gOPD) {
  try {
    $gOPD({}, '');
  } catch (e) {
    $gOPD = null; // this is IE 8, which has a broken gOPD
  }
}

var throwTypeError = function throwTypeError() {
  throw new $TypeError();
};

var ThrowTypeError = $gOPD ? function () {
  try {
    // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
    arguments.callee; // IE 8 does not throw here

    return throwTypeError;
  } catch (calleeThrows) {
    try {
      // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
      return $gOPD(arguments, 'callee').get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) {
  return x.__proto__;
}; // eslint-disable-line no-proto


var needsEval = {};
var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);
var INTRINSICS = {
  '%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
  '%Array%': Array,
  '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
  '%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
  '%AsyncFromSyncIteratorPrototype%': undefined,
  '%AsyncFunction%': needsEval,
  '%AsyncGenerator%': needsEval,
  '%AsyncGeneratorFunction%': needsEval,
  '%AsyncIteratorPrototype%': needsEval,
  '%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
  '%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
  '%Boolean%': Boolean,
  '%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
  '%Date%': Date,
  '%decodeURI%': decodeURI,
  '%decodeURIComponent%': decodeURIComponent,
  '%encodeURI%': encodeURI,
  '%encodeURIComponent%': encodeURIComponent,
  '%Error%': Error,
  '%eval%': eval,
  // eslint-disable-line no-eval
  '%EvalError%': EvalError,
  '%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
  '%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
  '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
  '%Function%': $Function,
  '%GeneratorFunction%': needsEval,
  '%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
  '%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
  '%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
  '%isFinite%': isFinite,
  '%isNaN%': isNaN,
  '%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
  '%JSON%': (typeof JSON === "undefined" ? "undefined" : _typeof(JSON)) === 'object' ? JSON : undefined,
  '%Map%': typeof Map === 'undefined' ? undefined : Map,
  '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
  '%Math%': Math,
  '%Number%': Number,
  '%Object%': Object,
  '%parseFloat%': parseFloat,
  '%parseInt%': parseInt,
  '%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
  '%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
  '%RangeError%': RangeError,
  '%ReferenceError%': ReferenceError,
  '%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
  '%RegExp%': RegExp,
  '%Set%': typeof Set === 'undefined' ? undefined : Set,
  '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
  '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
  '%String%': String,
  '%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
  '%Symbol%': hasSymbols ? Symbol : undefined,
  '%SyntaxError%': $SyntaxError,
  '%ThrowTypeError%': ThrowTypeError,
  '%TypedArray%': TypedArray,
  '%TypeError%': $TypeError,
  '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
  '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
  '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
  '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
  '%URIError%': URIError,
  '%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
  '%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
  '%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
  var value;

  if (name === '%AsyncFunction%') {
    value = getEvalledConstructor('async function () {}');
  } else if (name === '%GeneratorFunction%') {
    value = getEvalledConstructor('function* () {}');
  } else if (name === '%AsyncGeneratorFunction%') {
    value = getEvalledConstructor('async function* () {}');
  } else if (name === '%AsyncGenerator%') {
    var fn = doEval('%AsyncGeneratorFunction%');

    if (fn) {
      value = fn.prototype;
    }
  } else if (name === '%AsyncIteratorPrototype%') {
    var gen = doEval('%AsyncGenerator%');

    if (gen) {
      value = getProto(gen.prototype);
    }
  }

  INTRINSICS[name] = value;
  return value;
};

var LEGACY_ALIASES = {
  '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
  '%ArrayPrototype%': ['Array', 'prototype'],
  '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
  '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
  '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
  '%ArrayProto_values%': ['Array', 'prototype', 'values'],
  '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
  '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
  '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
  '%BooleanPrototype%': ['Boolean', 'prototype'],
  '%DataViewPrototype%': ['DataView', 'prototype'],
  '%DatePrototype%': ['Date', 'prototype'],
  '%ErrorPrototype%': ['Error', 'prototype'],
  '%EvalErrorPrototype%': ['EvalError', 'prototype'],
  '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
  '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
  '%FunctionPrototype%': ['Function', 'prototype'],
  '%Generator%': ['GeneratorFunction', 'prototype'],
  '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
  '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
  '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
  '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
  '%JSONParse%': ['JSON', 'parse'],
  '%JSONStringify%': ['JSON', 'stringify'],
  '%MapPrototype%': ['Map', 'prototype'],
  '%NumberPrototype%': ['Number', 'prototype'],
  '%ObjectPrototype%': ['Object', 'prototype'],
  '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
  '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
  '%PromisePrototype%': ['Promise', 'prototype'],
  '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
  '%Promise_all%': ['Promise', 'all'],
  '%Promise_reject%': ['Promise', 'reject'],
  '%Promise_resolve%': ['Promise', 'resolve'],
  '%RangeErrorPrototype%': ['RangeError', 'prototype'],
  '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
  '%RegExpPrototype%': ['RegExp', 'prototype'],
  '%SetPrototype%': ['Set', 'prototype'],
  '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
  '%StringPrototype%': ['String', 'prototype'],
  '%SymbolPrototype%': ['Symbol', 'prototype'],
  '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
  '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
  '%TypeErrorPrototype%': ['TypeError', 'prototype'],
  '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
  '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
  '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
  '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
  '%URIErrorPrototype%': ['URIError', 'prototype'],
  '%WeakMapPrototype%': ['WeakMap', 'prototype'],
  '%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = require('function-bind');

var hasOwn = require('has');

var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */

var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g;
/** Used to match backslashes in property paths. */

var stringToPath = function stringToPath(string) {
  var first = $strSlice(string, 0, 1);
  var last = $strSlice(string, -1);

  if (first === '%' && last !== '%') {
    throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
  } else if (last === '%' && first !== '%') {
    throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
  }

  var result = [];
  $replace(string, rePropName, function (match, number, quote, subString) {
    result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
  });
  return result;
};
/* end adaptation */


var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
  var intrinsicName = name;
  var alias;

  if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = '%' + alias[0] + '%';
  }

  if (hasOwn(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];

    if (value === needsEval) {
      value = doEval(intrinsicName);
    }

    if (typeof value === 'undefined' && !allowMissing) {
      throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
    }

    return {
      alias: alias,
      name: intrinsicName,
      value: value
    };
  }

  throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new $TypeError('intrinsic name must be a non-empty string');
  }

  if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
    throw new $TypeError('"allowMissing" argument must be a boolean');
  }

  var parts = stringToPath(name);
  var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
  var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;

  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts, $concat([0, 1], alias));
  }

  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i];
    var first = $strSlice(part, 0, 1);
    var last = $strSlice(part, -1);

    if ((first === '"' || first === "'" || first === '`' || last === '"' || last === "'" || last === '`') && first !== last) {
      throw new $SyntaxError('property names with quotes must have matching quotes');
    }

    if (part === 'constructor' || !isOwn) {
      skipFurtherCaching = true;
    }

    intrinsicBaseName += '.' + part;
    intrinsicRealName = '%' + intrinsicBaseName + '%';

    if (hasOwn(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
        }

        return void undefined;
      }

      if ($gOPD && i + 1 >= parts.length) {
        var desc = $gOPD(value, part);
        isOwn = !!desc; // By convention, when a data property is converted to an accessor
        // property to emulate a data property that does not suffer from
        // the override mistake, that accessor's getter is marked with
        // an `originalValue` property. Here, when we detect this, we
        // uphold the illusion by pretending to see that original data
        // property, i.e., returning the value rather than the getter
        // itself.

        if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn(value, part);
        value = value[part];
      }

      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }

  return value;
};
        },
        map: {"has-symbols":18,"function-bind":19,"has":20}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/call-bind/callBound.js
      16: {
        factory: (module, exports, require) => {
          'use strict';

var GetIntrinsic = require('get-intrinsic');

var callBind = require('./');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = GetIntrinsic(name, !!allowMissing);

  if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
    return callBind(intrinsic);
  }

  return intrinsic;
};
        },
        map: {"get-intrinsic":15,"./":21}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/object-inspect/index.js
      17: {
        factory: (module, exports, require) => {
          "use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var match = String.prototype.match;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === 'function' ? Symbol.prototype.toString : null;
var isEnumerable = Object.prototype.propertyIsEnumerable;

var inspectCustom = require('./util.inspect').custom;

var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;

module.exports = function inspect_(obj, options, depth, seen) {
  var opts = options || {};

  if (has(opts, 'quoteStyle') && opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double') {
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  }

  if (has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number' ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  }

  var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;

  if (typeof customInspect !== 'boolean') {
    throw new TypeError('option "customInspect", if provided, must be `true` or `false`');
  }

  if (has(opts, 'indent') && opts.indent !== null && opts.indent !== '\t' && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
    throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
  }

  if (typeof obj === 'undefined') {
    return 'undefined';
  }

  if (obj === null) {
    return 'null';
  }

  if (typeof obj === 'boolean') {
    return obj ? 'true' : 'false';
  }

  if (typeof obj === 'string') {
    return inspectString(obj, opts);
  }

  if (typeof obj === 'number') {
    if (obj === 0) {
      return Infinity / obj > 0 ? '0' : '-0';
    }

    return String(obj);
  }

  if (typeof obj === 'bigint') {
    return String(obj) + 'n';
  }

  var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;

  if (typeof depth === 'undefined') {
    depth = 0;
  }

  if (depth >= maxDepth && maxDepth > 0 && _typeof(obj) === 'object') {
    return isArray(obj) ? '[Array]' : '[Object]';
  }

  var indent = getIndent(opts, depth);

  if (typeof seen === 'undefined') {
    seen = [];
  } else if (indexOf(seen, obj) >= 0) {
    return '[Circular]';
  }

  function inspect(value, from, noIndent) {
    if (from) {
      seen = seen.slice();
      seen.push(from);
    }

    if (noIndent) {
      var newOpts = {
        depth: opts.depth
      };

      if (has(opts, 'quoteStyle')) {
        newOpts.quoteStyle = opts.quoteStyle;
      }

      return inspect_(value, newOpts, depth + 1, seen);
    }

    return inspect_(value, opts, depth + 1, seen);
  }

  if (typeof obj === 'function') {
    var name = nameOf(obj);
    var keys = arrObjKeys(obj, inspect);
    return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + keys.join(', ') + ' }' : '');
  }

  if (isSymbol(obj)) {
    var symString = symToString.call(obj);
    return _typeof(obj) === 'object' ? markBoxed(symString) : symString;
  }

  if (isElement(obj)) {
    var s = '<' + String(obj.nodeName).toLowerCase();
    var attrs = obj.attributes || [];

    for (var i = 0; i < attrs.length; i++) {
      s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
    }

    s += '>';

    if (obj.childNodes && obj.childNodes.length) {
      s += '...';
    }

    s += '</' + String(obj.nodeName).toLowerCase() + '>';
    return s;
  }

  if (isArray(obj)) {
    if (obj.length === 0) {
      return '[]';
    }

    var xs = arrObjKeys(obj, inspect);

    if (indent && !singleLineValues(xs)) {
      return '[' + indentedJoin(xs, indent) + ']';
    }

    return '[ ' + xs.join(', ') + ' ]';
  }

  if (isError(obj)) {
    var parts = arrObjKeys(obj, inspect);

    if (parts.length === 0) {
      return '[' + String(obj) + ']';
    }

    return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
  }

  if (_typeof(obj) === 'object' && customInspect) {
    if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
      return obj[inspectSymbol]();
    } else if (typeof obj.inspect === 'function') {
      return obj.inspect();
    }
  }

  if (isMap(obj)) {
    var mapParts = [];
    mapForEach.call(obj, function (value, key) {
      mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
    });
    return collectionOf('Map', mapSize.call(obj), mapParts, indent);
  }

  if (isSet(obj)) {
    var setParts = [];
    setForEach.call(obj, function (value) {
      setParts.push(inspect(value, obj));
    });
    return collectionOf('Set', setSize.call(obj), setParts, indent);
  }

  if (isWeakMap(obj)) {
    return weakCollectionOf('WeakMap');
  }

  if (isWeakSet(obj)) {
    return weakCollectionOf('WeakSet');
  }

  if (isNumber(obj)) {
    return markBoxed(inspect(Number(obj)));
  }

  if (isBigInt(obj)) {
    return markBoxed(inspect(bigIntValueOf.call(obj)));
  }

  if (isBoolean(obj)) {
    return markBoxed(booleanValueOf.call(obj));
  }

  if (isString(obj)) {
    return markBoxed(inspect(String(obj)));
  }

  if (!isDate(obj) && !isRegExp(obj)) {
    var ys = arrObjKeys(obj, inspect);

    if (ys.length === 0) {
      return '{}';
    }

    if (indent) {
      return '{' + indentedJoin(ys, indent) + '}';
    }

    return '{ ' + ys.join(', ') + ' }';
  }

  return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
  var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
  return quoteChar + s + quoteChar;
}

function quote(s) {
  return String(s).replace(/"/g, '&quot;');
}

function isArray(obj) {
  return toStr(obj) === '[object Array]';
}

function isDate(obj) {
  return toStr(obj) === '[object Date]';
}

function isRegExp(obj) {
  return toStr(obj) === '[object RegExp]';
}

function isError(obj) {
  return toStr(obj) === '[object Error]';
}

function isSymbol(obj) {
  return toStr(obj) === '[object Symbol]';
}

function isString(obj) {
  return toStr(obj) === '[object String]';
}

function isNumber(obj) {
  return toStr(obj) === '[object Number]';
}

function isBigInt(obj) {
  return toStr(obj) === '[object BigInt]';
}

function isBoolean(obj) {
  return toStr(obj) === '[object Boolean]';
}

var hasOwn = Object.prototype.hasOwnProperty || function (key) {
  return key in this;
};

function has(obj, key) {
  return hasOwn.call(obj, key);
}

function toStr(obj) {
  return objectToString.call(obj);
}

function nameOf(f) {
  if (f.name) {
    return f.name;
  }

  var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);

  if (m) {
    return m[1];
  }

  return null;
}

function indexOf(xs, x) {
  if (xs.indexOf) {
    return xs.indexOf(x);
  }

  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) {
      return i;
    }
  }

  return -1;
}

function isMap(x) {
  if (!mapSize || !x || _typeof(x) !== 'object') {
    return false;
  }

  try {
    mapSize.call(x);

    try {
      setSize.call(x);
    } catch (s) {
      return true;
    }

    return x instanceof Map; // core-js workaround, pre-v2.5.0
  } catch (e) {}

  return false;
}

function isWeakMap(x) {
  if (!weakMapHas || !x || _typeof(x) !== 'object') {
    return false;
  }

  try {
    weakMapHas.call(x, weakMapHas);

    try {
      weakSetHas.call(x, weakSetHas);
    } catch (s) {
      return true;
    }

    return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
  } catch (e) {}

  return false;
}

function isSet(x) {
  if (!setSize || !x || _typeof(x) !== 'object') {
    return false;
  }

  try {
    setSize.call(x);

    try {
      mapSize.call(x);
    } catch (m) {
      return true;
    }

    return x instanceof Set; // core-js workaround, pre-v2.5.0
  } catch (e) {}

  return false;
}

function isWeakSet(x) {
  if (!weakSetHas || !x || _typeof(x) !== 'object') {
    return false;
  }

  try {
    weakSetHas.call(x, weakSetHas);

    try {
      weakMapHas.call(x, weakMapHas);
    } catch (s) {
      return true;
    }

    return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
  } catch (e) {}

  return false;
}

function isElement(x) {
  if (!x || _typeof(x) !== 'object') {
    return false;
  }

  if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
    return true;
  }

  return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
  if (str.length > opts.maxStringLength) {
    var remaining = str.length - opts.maxStringLength;
    var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
    return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
  } // eslint-disable-next-line no-control-regex


  var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
  return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
  var n = c.charCodeAt(0);
  var x = {
    8: 'b',
    9: 't',
    10: 'n',
    12: 'f',
    13: 'r'
  }[n];

  if (x) {
    return '\\' + x;
  }

  return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16).toUpperCase();
}

function markBoxed(str) {
  return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
  return type + ' { ? }';
}

function collectionOf(type, size, entries, indent) {
  var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(', ');
  return type + ' (' + size + ') {' + joinedEntries + '}';
}

function singleLineValues(xs) {
  for (var i = 0; i < xs.length; i++) {
    if (indexOf(xs[i], '\n') >= 0) {
      return false;
    }
  }

  return true;
}

function getIndent(opts, depth) {
  var baseIndent;

  if (opts.indent === '\t') {
    baseIndent = '\t';
  } else if (typeof opts.indent === 'number' && opts.indent > 0) {
    baseIndent = Array(opts.indent + 1).join(' ');
  } else {
    return null;
  }

  return {
    base: baseIndent,
    prev: Array(depth + 1).join(baseIndent)
  };
}

function indentedJoin(xs, indent) {
  if (xs.length === 0) {
    return '';
  }

  var lineJoiner = '\n' + indent.prev + indent.base;
  return lineJoiner + xs.join(',' + lineJoiner) + '\n' + indent.prev;
}

function arrObjKeys(obj, inspect) {
  var isArr = isArray(obj);
  var xs = [];

  if (isArr) {
    xs.length = obj.length;

    for (var i = 0; i < obj.length; i++) {
      xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
    }
  }

  for (var key in obj) {
    // eslint-disable-line no-restricted-syntax
    if (!has(obj, key)) {
      continue;
    } // eslint-disable-line no-restricted-syntax, no-continue


    if (isArr && String(Number(key)) === key && key < obj.length) {
      continue;
    } // eslint-disable-line no-restricted-syntax, no-continue


    if (/[^\w$]/.test(key)) {
      xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
    } else {
      xs.push(key + ': ' + inspect(obj[key], obj));
    }
  }

  if (typeof gOPS === 'function') {
    var syms = gOPS(obj);

    for (var j = 0; j < syms.length; j++) {
      if (isEnumerable.call(obj, syms[j])) {
        xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
      }
    }
  }

  return xs;
}
        },
        map: {"./util.inspect":22}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/has-symbols/index.js
      18: {
        factory: (module, exports, require) => {
          'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var origSymbol = typeof Symbol !== 'undefined' && Symbol;

var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
  if (typeof origSymbol !== 'function') {
    return false;
  }

  if (typeof Symbol !== 'function') {
    return false;
  }

  if (_typeof(origSymbol('foo')) !== 'symbol') {
    return false;
  }

  if (_typeof(Symbol('bar')) !== 'symbol') {
    return false;
  }

  return hasSymbolSham();
};
        },
        map: {"./shams":23}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/function-bind/index.js
      19: {
        factory: (module, exports, require) => {
          'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;
        },
        map: {"./implementation":24}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/has/src/index.js
      20: {
        factory: (module, exports, require) => {
          'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
        },
        map: {"function-bind":19}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/call-bind/index.js
      21: {
        factory: (module, exports, require) => {
          'use strict';

var bind = require('function-bind');

var GetIntrinsic = require('get-intrinsic');

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);
var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
  try {
    $defineProperty({}, 'a', {
      value: 1
    });
  } catch (e) {
    // IE 8 has a broken defineProperty
    $defineProperty = null;
  }
}

module.exports = function callBind(originalFunction) {
  var func = $reflectApply(bind, $call, arguments);

  if ($gOPD && $defineProperty) {
    var desc = $gOPD(func, 'length');

    if (desc.configurable) {
      // original length, plus the receiver, minus any additional arguments (after the receiver)
      $defineProperty(func, 'length', {
        value: 1 + $max(0, originalFunction.length - (arguments.length - 1))
      });
    }
  }

  return func;
};

var applyBind = function applyBind() {
  return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
  $defineProperty(module.exports, 'apply', {
    value: applyBind
  });
} else {
  module.exports.apply = applyBind;
}
        },
        map: {"function-bind":19,"get-intrinsic":15}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/object-inspect/util.inspect.js
      22: {
        factory: (module, exports, require) => {
          "use strict";

module.exports = require('util').inspect;
        },
        map: {"util":-19260817}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/has-symbols/shams.js
      23: {
        factory: (module, exports, require) => {
          'use strict';
/* eslint complexity: [2, 18], max-statements: [2, 33] */

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

module.exports = function hasSymbols() {
  if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
    return false;
  }

  if (_typeof(Symbol.iterator) === 'symbol') {
    return true;
  }

  var obj = {};
  var sym = Symbol('test');
  var symObj = Object(sym);

  if (typeof sym === 'string') {
    return false;
  }

  if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
    return false;
  }

  if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
    return false;
  } // temp disabled per https://github.com/ljharb/object.assign/issues/17
  // if (sym instanceof Symbol) { return false; }
  // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
  // if (!(symObj instanceof Symbol)) { return false; }
  // if (typeof Symbol.prototype.toString !== 'function') { return false; }
  // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }


  var symVal = 42;
  obj[sym] = symVal;

  for (sym in obj) {
    return false;
  } // eslint-disable-line no-restricted-syntax, no-unreachable-loop


  if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
    return false;
  }

  if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }

  var syms = Object.getOwnPropertySymbols(obj);

  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }

  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }

  if (typeof Object.getOwnPropertyDescriptor === 'function') {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);

    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }

  return true;
};
        },
        map: {}
      }
    ,
      // /Users/admin/Codes/flash/node_modules/function-bind/implementation.js
      24: {
        factory: (module, exports, require) => {
          'use strict';
/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
  var target = this;

  if (typeof target !== 'function' || toStr.call(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target);
  }

  var args = slice.call(arguments, 1);
  var bound;

  var binder = function binder() {
    if (this instanceof bound) {
      var result = target.apply(this, args.concat(slice.call(arguments)));

      if (Object(result) === result) {
        return result;
      }

      return this;
    } else {
      return target.apply(that, args.concat(slice.call(arguments)));
    }
  };

  var boundLength = Math.max(0, target.length - args.length);
  var boundArgs = [];

  for (var i = 0; i < boundLength; i++) {
    boundArgs.push('$' + i);
  }

  bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

  if (target.prototype) {
    var Empty = function Empty() {};

    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
    Empty.prototype = null;
  }

  return bound;
};
        },
        map: {}
      }
    
      }
    );

