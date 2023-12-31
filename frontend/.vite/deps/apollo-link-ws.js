import {
  require_client
} from "./chunk-VHLXFAR4.js";
import {
  init_visitor
} from "./chunk-JFCGPLEH.js";
import {
  __commonJS,
  __toESM
} from "./chunk-AUZ3RYOM.js";

// node_modules/zen-observable/lib/Observable.js
var require_Observable = __commonJS({
  "node_modules/zen-observable/lib/Observable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Observable = void 0;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var hasSymbols = function() {
      return typeof Symbol === "function";
    };
    var hasSymbol = function(name) {
      return hasSymbols() && Boolean(Symbol[name]);
    };
    var getSymbol = function(name) {
      return hasSymbol(name) ? Symbol[name] : "@@" + name;
    };
    if (hasSymbols() && !hasSymbol("observable")) {
      Symbol.observable = Symbol("observable");
    }
    var SymbolIterator = getSymbol("iterator");
    var SymbolObservable = getSymbol("observable");
    var SymbolSpecies = getSymbol("species");
    function getMethod(obj, key) {
      var value = obj[key];
      if (value == null)
        return void 0;
      if (typeof value !== "function")
        throw new TypeError(value + " is not a function");
      return value;
    }
    function getSpecies(obj) {
      var ctor = obj.constructor;
      if (ctor !== void 0) {
        ctor = ctor[SymbolSpecies];
        if (ctor === null) {
          ctor = void 0;
        }
      }
      return ctor !== void 0 ? ctor : Observable2;
    }
    function isObservable(x) {
      return x instanceof Observable2;
    }
    function hostReportError(e) {
      if (hostReportError.log) {
        hostReportError.log(e);
      } else {
        setTimeout(function() {
          throw e;
        });
      }
    }
    function enqueue(fn) {
      Promise.resolve().then(function() {
        try {
          fn();
        } catch (e) {
          hostReportError(e);
        }
      });
    }
    function cleanupSubscription(subscription) {
      var cleanup = subscription._cleanup;
      if (cleanup === void 0)
        return;
      subscription._cleanup = void 0;
      if (!cleanup) {
        return;
      }
      try {
        if (typeof cleanup === "function") {
          cleanup();
        } else {
          var unsubscribe = getMethod(cleanup, "unsubscribe");
          if (unsubscribe) {
            unsubscribe.call(cleanup);
          }
        }
      } catch (e) {
        hostReportError(e);
      }
    }
    function closeSubscription(subscription) {
      subscription._observer = void 0;
      subscription._queue = void 0;
      subscription._state = "closed";
    }
    function flushSubscription(subscription) {
      var queue = subscription._queue;
      if (!queue) {
        return;
      }
      subscription._queue = void 0;
      subscription._state = "ready";
      for (var i = 0; i < queue.length; ++i) {
        notifySubscription(subscription, queue[i].type, queue[i].value);
        if (subscription._state === "closed")
          break;
      }
    }
    function notifySubscription(subscription, type, value) {
      subscription._state = "running";
      var observer = subscription._observer;
      try {
        var m = getMethod(observer, type);
        switch (type) {
          case "next":
            if (m)
              m.call(observer, value);
            break;
          case "error":
            closeSubscription(subscription);
            if (m)
              m.call(observer, value);
            else
              throw value;
            break;
          case "complete":
            closeSubscription(subscription);
            if (m)
              m.call(observer);
            break;
        }
      } catch (e) {
        hostReportError(e);
      }
      if (subscription._state === "closed")
        cleanupSubscription(subscription);
      else if (subscription._state === "running")
        subscription._state = "ready";
    }
    function onNotify(subscription, type, value) {
      if (subscription._state === "closed")
        return;
      if (subscription._state === "buffering") {
        subscription._queue.push({
          type,
          value
        });
        return;
      }
      if (subscription._state !== "ready") {
        subscription._state = "buffering";
        subscription._queue = [{
          type,
          value
        }];
        enqueue(function() {
          return flushSubscription(subscription);
        });
        return;
      }
      notifySubscription(subscription, type, value);
    }
    var Subscription = function() {
      function Subscription2(observer, subscriber) {
        _classCallCheck(this, Subscription2);
        this._cleanup = void 0;
        this._observer = observer;
        this._queue = void 0;
        this._state = "initializing";
        var subscriptionObserver = new SubscriptionObserver(this);
        try {
          this._cleanup = subscriber.call(void 0, subscriptionObserver);
        } catch (e) {
          subscriptionObserver.error(e);
        }
        if (this._state === "initializing")
          this._state = "ready";
      }
      _createClass(Subscription2, [{
        key: "unsubscribe",
        value: function unsubscribe() {
          if (this._state !== "closed") {
            closeSubscription(this);
            cleanupSubscription(this);
          }
        }
      }, {
        key: "closed",
        get: function() {
          return this._state === "closed";
        }
      }]);
      return Subscription2;
    }();
    var SubscriptionObserver = function() {
      function SubscriptionObserver2(subscription) {
        _classCallCheck(this, SubscriptionObserver2);
        this._subscription = subscription;
      }
      _createClass(SubscriptionObserver2, [{
        key: "next",
        value: function next(value) {
          onNotify(this._subscription, "next", value);
        }
      }, {
        key: "error",
        value: function error(value) {
          onNotify(this._subscription, "error", value);
        }
      }, {
        key: "complete",
        value: function complete() {
          onNotify(this._subscription, "complete");
        }
      }, {
        key: "closed",
        get: function() {
          return this._subscription._state === "closed";
        }
      }]);
      return SubscriptionObserver2;
    }();
    var Observable2 = function() {
      function Observable3(subscriber) {
        _classCallCheck(this, Observable3);
        if (!(this instanceof Observable3))
          throw new TypeError("Observable cannot be called as a function");
        if (typeof subscriber !== "function")
          throw new TypeError("Observable initializer must be a function");
        this._subscriber = subscriber;
      }
      _createClass(Observable3, [{
        key: "subscribe",
        value: function subscribe(observer) {
          if (typeof observer !== "object" || observer === null) {
            observer = {
              next: observer,
              error: arguments[1],
              complete: arguments[2]
            };
          }
          return new Subscription(observer, this._subscriber);
        }
      }, {
        key: "forEach",
        value: function forEach(fn) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            if (typeof fn !== "function") {
              reject(new TypeError(fn + " is not a function"));
              return;
            }
            function done() {
              subscription.unsubscribe();
              resolve();
            }
            var subscription = _this.subscribe({
              next: function(value) {
                try {
                  fn(value, done);
                } catch (e) {
                  reject(e);
                  subscription.unsubscribe();
                }
              },
              error: reject,
              complete: resolve
            });
          });
        }
      }, {
        key: "map",
        value: function map(fn) {
          var _this2 = this;
          if (typeof fn !== "function")
            throw new TypeError(fn + " is not a function");
          var C = getSpecies(this);
          return new C(function(observer) {
            return _this2.subscribe({
              next: function(value) {
                try {
                  value = fn(value);
                } catch (e) {
                  return observer.error(e);
                }
                observer.next(value);
              },
              error: function(e) {
                observer.error(e);
              },
              complete: function() {
                observer.complete();
              }
            });
          });
        }
      }, {
        key: "filter",
        value: function filter(fn) {
          var _this3 = this;
          if (typeof fn !== "function")
            throw new TypeError(fn + " is not a function");
          var C = getSpecies(this);
          return new C(function(observer) {
            return _this3.subscribe({
              next: function(value) {
                try {
                  if (!fn(value))
                    return;
                } catch (e) {
                  return observer.error(e);
                }
                observer.next(value);
              },
              error: function(e) {
                observer.error(e);
              },
              complete: function() {
                observer.complete();
              }
            });
          });
        }
      }, {
        key: "reduce",
        value: function reduce(fn) {
          var _this4 = this;
          if (typeof fn !== "function")
            throw new TypeError(fn + " is not a function");
          var C = getSpecies(this);
          var hasSeed = arguments.length > 1;
          var hasValue = false;
          var seed = arguments[1];
          var acc = seed;
          return new C(function(observer) {
            return _this4.subscribe({
              next: function(value) {
                var first = !hasValue;
                hasValue = true;
                if (!first || hasSeed) {
                  try {
                    acc = fn(acc, value);
                  } catch (e) {
                    return observer.error(e);
                  }
                } else {
                  acc = value;
                }
              },
              error: function(e) {
                observer.error(e);
              },
              complete: function() {
                if (!hasValue && !hasSeed)
                  return observer.error(new TypeError("Cannot reduce an empty sequence"));
                observer.next(acc);
                observer.complete();
              }
            });
          });
        }
      }, {
        key: "concat",
        value: function concat2() {
          var _this5 = this;
          for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
            sources[_key] = arguments[_key];
          }
          var C = getSpecies(this);
          return new C(function(observer) {
            var subscription;
            var index = 0;
            function startNext(next) {
              subscription = next.subscribe({
                next: function(v) {
                  observer.next(v);
                },
                error: function(e) {
                  observer.error(e);
                },
                complete: function() {
                  if (index === sources.length) {
                    subscription = void 0;
                    observer.complete();
                  } else {
                    startNext(C.from(sources[index++]));
                  }
                }
              });
            }
            startNext(_this5);
            return function() {
              if (subscription) {
                subscription.unsubscribe();
                subscription = void 0;
              }
            };
          });
        }
      }, {
        key: "flatMap",
        value: function flatMap(fn) {
          var _this6 = this;
          if (typeof fn !== "function")
            throw new TypeError(fn + " is not a function");
          var C = getSpecies(this);
          return new C(function(observer) {
            var subscriptions = [];
            var outer = _this6.subscribe({
              next: function(value) {
                if (fn) {
                  try {
                    value = fn(value);
                  } catch (e) {
                    return observer.error(e);
                  }
                }
                var inner = C.from(value).subscribe({
                  next: function(value2) {
                    observer.next(value2);
                  },
                  error: function(e) {
                    observer.error(e);
                  },
                  complete: function() {
                    var i = subscriptions.indexOf(inner);
                    if (i >= 0)
                      subscriptions.splice(i, 1);
                    completeIfDone();
                  }
                });
                subscriptions.push(inner);
              },
              error: function(e) {
                observer.error(e);
              },
              complete: function() {
                completeIfDone();
              }
            });
            function completeIfDone() {
              if (outer.closed && subscriptions.length === 0)
                observer.complete();
            }
            return function() {
              subscriptions.forEach(function(s) {
                return s.unsubscribe();
              });
              outer.unsubscribe();
            };
          });
        }
      }, {
        key: SymbolObservable,
        value: function() {
          return this;
        }
      }], [{
        key: "from",
        value: function from2(x) {
          var C = typeof this === "function" ? this : Observable3;
          if (x == null)
            throw new TypeError(x + " is not an object");
          var method = getMethod(x, SymbolObservable);
          if (method) {
            var observable = method.call(x);
            if (Object(observable) !== observable)
              throw new TypeError(observable + " is not an object");
            if (isObservable(observable) && observable.constructor === C)
              return observable;
            return new C(function(observer) {
              return observable.subscribe(observer);
            });
          }
          if (hasSymbol("iterator")) {
            method = getMethod(x, SymbolIterator);
            if (method) {
              return new C(function(observer) {
                enqueue(function() {
                  if (observer.closed)
                    return;
                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = void 0;
                  try {
                    for (var _iterator = method.call(x)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var _item = _step.value;
                      observer.next(_item);
                      if (observer.closed)
                        return;
                    }
                  } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                      }
                    } finally {
                      if (_didIteratorError) {
                        throw _iteratorError;
                      }
                    }
                  }
                  observer.complete();
                });
              });
            }
          }
          if (Array.isArray(x)) {
            return new C(function(observer) {
              enqueue(function() {
                if (observer.closed)
                  return;
                for (var i = 0; i < x.length; ++i) {
                  observer.next(x[i]);
                  if (observer.closed)
                    return;
                }
                observer.complete();
              });
            });
          }
          throw new TypeError(x + " is not observable");
        }
      }, {
        key: "of",
        value: function of() {
          for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            items[_key2] = arguments[_key2];
          }
          var C = typeof this === "function" ? this : Observable3;
          return new C(function(observer) {
            enqueue(function() {
              if (observer.closed)
                return;
              for (var i = 0; i < items.length; ++i) {
                observer.next(items[i]);
                if (observer.closed)
                  return;
              }
              observer.complete();
            });
          });
        }
      }, {
        key: SymbolSpecies,
        get: function() {
          return this;
        }
      }]);
      return Observable3;
    }();
    exports.Observable = Observable2;
    if (hasSymbols()) {
      Object.defineProperty(Observable2, Symbol("extensions"), {
        value: {
          symbol: SymbolObservable,
          hostReportError
        },
        configurable: true
      });
    }
  }
});

// node_modules/zen-observable/index.js
var require_zen_observable = __commonJS({
  "node_modules/zen-observable/index.js"(exports, module) {
    module.exports = require_Observable().Observable;
  }
});

// node_modules/fast-json-stable-stringify/index.js
var require_fast_json_stable_stringify = __commonJS({
  "node_modules/fast-json-stable-stringify/index.js"(exports, module) {
    "use strict";
    module.exports = function(data, opts) {
      if (!opts)
        opts = {};
      if (typeof opts === "function")
        opts = { cmp: opts };
      var cycles = typeof opts.cycles === "boolean" ? opts.cycles : false;
      var cmp = opts.cmp && function(f) {
        return function(node) {
          return function(a, b) {
            var aobj = { key: a, value: node[a] };
            var bobj = { key: b, value: node[b] };
            return f(aobj, bobj);
          };
        };
      }(opts.cmp);
      var seen = [];
      return function stringify2(node) {
        if (node && node.toJSON && typeof node.toJSON === "function") {
          node = node.toJSON();
        }
        if (node === void 0)
          return;
        if (typeof node == "number")
          return isFinite(node) ? "" + node : "null";
        if (typeof node !== "object")
          return JSON.stringify(node);
        var i, out;
        if (Array.isArray(node)) {
          out = "[";
          for (i = 0; i < node.length; i++) {
            if (i)
              out += ",";
            out += stringify2(node[i]) || "null";
          }
          return out + "]";
        }
        if (node === null)
          return "null";
        if (seen.indexOf(node) !== -1) {
          if (cycles)
            return JSON.stringify("__cycle__");
          throw new TypeError("Converting circular structure to JSON");
        }
        var seenIndex = seen.push(node) - 1;
        var keys = Object.keys(node).sort(cmp && cmp(node));
        out = "";
        for (i = 0; i < keys.length; i++) {
          var key = keys[i];
          var value = stringify2(node[key]);
          if (!value)
            continue;
          if (out)
            out += ",";
          out += JSON.stringify(key) + ":" + value;
        }
        seen.splice(seenIndex, 1);
        return "{" + out + "}";
      }(data);
    };
  }
});

// node_modules/apollo-link-ws/node_modules/tslib/tslib.es6.js
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (b2.hasOwnProperty(p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

// node_modules/apollo-link/node_modules/zen-observable-ts/lib/bundle.esm.js
var import_zen_observable = __toESM(require_zen_observable());
var Observable = import_zen_observable.default;
var bundle_esm_default = Observable;

// node_modules/apollo-link/node_modules/tslib/tslib.es6.js
var extendStatics2 = function(d, b) {
  extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (b2.hasOwnProperty(p))
        d2[p] = b2[p];
  };
  return extendStatics2(d, b);
};
function __extends2(d, b) {
  extendStatics2(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign3(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};

// node_modules/apollo-link/node_modules/ts-invariant/lib/invariant.esm.js
var genericMessage = "Invariant Violation";
var _a = Object.setPrototypeOf;
var setPrototypeOf = _a === void 0 ? function(obj, proto) {
  obj.__proto__ = proto;
  return obj;
} : _a;
var InvariantError = (
  /** @class */
  function(_super) {
    __extends2(InvariantError3, _super);
    function InvariantError3(message) {
      if (message === void 0) {
        message = genericMessage;
      }
      var _this = _super.call(this, typeof message === "number" ? genericMessage + ": " + message + " (see https://github.com/apollographql/invariant-packages)" : message) || this;
      _this.framesToPop = 1;
      _this.name = genericMessage;
      setPrototypeOf(_this, InvariantError3.prototype);
      return _this;
    }
    return InvariantError3;
  }(Error)
);
function invariant(condition, message) {
  if (!condition) {
    throw new InvariantError(message);
  }
}
function wrapConsoleMethod(method) {
  return function() {
    return console[method].apply(console, arguments);
  };
}
(function(invariant3) {
  invariant3.warn = wrapConsoleMethod("warn");
  invariant3.error = wrapConsoleMethod("error");
})(invariant || (invariant = {}));
var processStub = { env: {} };
if (typeof process === "object") {
  processStub = process;
} else
  try {
    Function("stub", "process = stub")(processStub);
  } catch (atLeastWeTried) {
  }

// node_modules/apollo-utilities/lib/bundle.esm.js
init_visitor();

// node_modules/apollo-utilities/node_modules/tslib/tslib.es6.js
var extendStatics3 = function(d, b) {
  extendStatics3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (b2.hasOwnProperty(p))
        d2[p] = b2[p];
  };
  return extendStatics3(d, b);
};
function __extends3(d, b) {
  extendStatics3(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

// node_modules/apollo-utilities/node_modules/ts-invariant/lib/invariant.esm.js
var genericMessage2 = "Invariant Violation";
var _a2 = Object.setPrototypeOf;
var setPrototypeOf2 = _a2 === void 0 ? function(obj, proto) {
  obj.__proto__ = proto;
  return obj;
} : _a2;
var InvariantError2 = (
  /** @class */
  function(_super) {
    __extends3(InvariantError3, _super);
    function InvariantError3(message) {
      if (message === void 0) {
        message = genericMessage2;
      }
      var _this = _super.call(this, typeof message === "number" ? genericMessage2 + ": " + message + " (see https://github.com/apollographql/invariant-packages)" : message) || this;
      _this.framesToPop = 1;
      _this.name = genericMessage2;
      setPrototypeOf2(_this, InvariantError3.prototype);
      return _this;
    }
    return InvariantError3;
  }(Error)
);
function invariant2(condition, message) {
  if (!condition) {
    throw new InvariantError2(message);
  }
}
function wrapConsoleMethod2(method) {
  return function() {
    return console[method].apply(console, arguments);
  };
}
(function(invariant3) {
  invariant3.warn = wrapConsoleMethod2("warn");
  invariant3.error = wrapConsoleMethod2("error");
})(invariant2 || (invariant2 = {}));
var processStub2 = { env: {} };
if (typeof process === "object") {
  processStub2 = process;
} else
  try {
    Function("stub", "process = stub")(processStub2);
  } catch (atLeastWeTried) {
  }

// node_modules/apollo-utilities/lib/bundle.esm.js
var import_fast_json_stable_stringify = __toESM(require_fast_json_stable_stringify());

// node_modules/apollo-utilities/node_modules/@wry/equality/lib/equality.esm.js
var _a3 = Object.prototype;
var toString = _a3.toString;
var hasOwnProperty = _a3.hasOwnProperty;

// node_modules/apollo-utilities/lib/bundle.esm.js
function getOperationName(doc) {
  return doc.definitions.filter(function(definition) {
    return definition.kind === "OperationDefinition" && definition.name;
  }).map(function(x) {
    return x.name.value;
  })[0] || null;
}
var canUseWeakMap = typeof WeakMap === "function" && !(typeof navigator === "object" && navigator.product === "ReactNative");

// node_modules/apollo-link/lib/bundle.esm.js
function validateOperation(operation) {
  var OPERATION_FIELDS = [
    "query",
    "operationName",
    "variables",
    "extensions",
    "context"
  ];
  for (var _i = 0, _a4 = Object.keys(operation); _i < _a4.length; _i++) {
    var key = _a4[_i];
    if (OPERATION_FIELDS.indexOf(key) < 0) {
      throw false ? new InvariantError(2) : new InvariantError("illegal argument: " + key);
    }
  }
  return operation;
}
var LinkError = function(_super) {
  __extends2(LinkError2, _super);
  function LinkError2(message, link) {
    var _this = _super.call(this, message) || this;
    _this.link = link;
    return _this;
  }
  return LinkError2;
}(Error);
function isTerminating(link) {
  return link.request.length <= 1;
}
function transformOperation(operation) {
  var transformedOperation = {
    variables: operation.variables || {},
    extensions: operation.extensions || {},
    operationName: operation.operationName,
    query: operation.query
  };
  if (!transformedOperation.operationName) {
    transformedOperation.operationName = typeof transformedOperation.query !== "string" ? getOperationName(transformedOperation.query) : "";
  }
  return transformedOperation;
}
function createOperation(starting, operation) {
  var context = __assign({}, starting);
  var setContext = function(next) {
    if (typeof next === "function") {
      context = __assign({}, context, next(context));
    } else {
      context = __assign({}, context, next);
    }
  };
  var getContext = function() {
    return __assign({}, context);
  };
  Object.defineProperty(operation, "setContext", {
    enumerable: false,
    value: setContext
  });
  Object.defineProperty(operation, "getContext", {
    enumerable: false,
    value: getContext
  });
  Object.defineProperty(operation, "toKey", {
    enumerable: false,
    value: function() {
      return getKey(operation);
    }
  });
  return operation;
}
function getKey(operation) {
  var query = operation.query, variables = operation.variables, operationName = operation.operationName;
  return JSON.stringify([operationName, query, variables]);
}
function passthrough(op, forward) {
  return forward ? forward(op) : bundle_esm_default.of();
}
function toLink(handler) {
  return typeof handler === "function" ? new ApolloLink(handler) : handler;
}
function empty() {
  return new ApolloLink(function() {
    return bundle_esm_default.of();
  });
}
function from(links) {
  if (links.length === 0)
    return empty();
  return links.map(toLink).reduce(function(x, y) {
    return x.concat(y);
  });
}
function split(test, left, right) {
  var leftLink = toLink(left);
  var rightLink = toLink(right || new ApolloLink(passthrough));
  if (isTerminating(leftLink) && isTerminating(rightLink)) {
    return new ApolloLink(function(operation) {
      return test(operation) ? leftLink.request(operation) || bundle_esm_default.of() : rightLink.request(operation) || bundle_esm_default.of();
    });
  } else {
    return new ApolloLink(function(operation, forward) {
      return test(operation) ? leftLink.request(operation, forward) || bundle_esm_default.of() : rightLink.request(operation, forward) || bundle_esm_default.of();
    });
  }
}
var concat = function(first, second) {
  var firstLink = toLink(first);
  if (isTerminating(firstLink)) {
    invariant.warn(new LinkError("You are calling concat on a terminating link, which will have no effect", firstLink));
    return firstLink;
  }
  var nextLink = toLink(second);
  if (isTerminating(nextLink)) {
    return new ApolloLink(function(operation) {
      return firstLink.request(operation, function(op) {
        return nextLink.request(op) || bundle_esm_default.of();
      }) || bundle_esm_default.of();
    });
  } else {
    return new ApolloLink(function(operation, forward) {
      return firstLink.request(operation, function(op) {
        return nextLink.request(op, forward) || bundle_esm_default.of();
      }) || bundle_esm_default.of();
    });
  }
};
var ApolloLink = function() {
  function ApolloLink2(request) {
    if (request)
      this.request = request;
  }
  ApolloLink2.prototype.split = function(test, left, right) {
    return this.concat(split(test, left, right || new ApolloLink2(passthrough)));
  };
  ApolloLink2.prototype.concat = function(next) {
    return concat(this, next);
  };
  ApolloLink2.prototype.request = function(operation, forward) {
    throw false ? new InvariantError(1) : new InvariantError("request is not implemented");
  };
  ApolloLink2.empty = empty;
  ApolloLink2.from = from;
  ApolloLink2.split = split;
  ApolloLink2.execute = execute;
  return ApolloLink2;
}();
function execute(link, operation) {
  return link.request(createOperation(operation.context, transformOperation(validateOperation(operation)))) || bundle_esm_default.of();
}

// node_modules/apollo-link-ws/lib/bundle.esm.js
var import_subscriptions_transport_ws = __toESM(require_client());
var WebSocketLink = function(_super) {
  __extends(WebSocketLink2, _super);
  function WebSocketLink2(paramsOrClient) {
    var _this = _super.call(this) || this;
    if (paramsOrClient instanceof import_subscriptions_transport_ws.SubscriptionClient) {
      _this.subscriptionClient = paramsOrClient;
    } else {
      _this.subscriptionClient = new import_subscriptions_transport_ws.SubscriptionClient(paramsOrClient.uri, paramsOrClient.options, paramsOrClient.webSocketImpl);
    }
    return _this;
  }
  WebSocketLink2.prototype.request = function(operation) {
    return this.subscriptionClient.request(operation);
  };
  return WebSocketLink2;
}(ApolloLink);
export {
  WebSocketLink
};
/*! Bundled license information:

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=apollo-link-ws.js.map
