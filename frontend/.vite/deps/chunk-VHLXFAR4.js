import {
  getOperationAST_exports,
  init_getOperationAST,
  init_printer,
  printer_exports
} from "./chunk-JFCGPLEH.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS
} from "./chunk-AUZ3RYOM.js";

// node_modules/backo2/index.js
var require_backo2 = __commonJS({
  "node_modules/backo2/index.js"(exports, module2) {
    module2.exports = Backoff;
    function Backoff(opts) {
      opts = opts || {};
      this.ms = opts.min || 100;
      this.max = opts.max || 1e4;
      this.factor = opts.factor || 2;
      this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
      this.attempts = 0;
    }
    Backoff.prototype.duration = function() {
      var ms = this.ms * Math.pow(this.factor, this.attempts++);
      if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
      }
      return Math.min(ms, this.max) | 0;
    };
    Backoff.prototype.reset = function() {
      this.attempts = 0;
    };
    Backoff.prototype.setMin = function(min) {
      this.ms = min;
    };
    Backoff.prototype.setMax = function(max) {
      this.max = max;
    };
    Backoff.prototype.setJitter = function(jitter) {
      this.jitter = jitter;
    };
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module2) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    if ("undefined" !== typeof module2) {
      module2.exports = EventEmitter;
    }
  }
});

// node_modules/subscriptions-transport-ws/dist/utils/is-string.js
var require_is_string = __commonJS({
  "node_modules/subscriptions-transport-ws/dist/utils/is-string.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isString(value) {
      return typeof value === "string";
    }
    exports.default = isString;
  }
});

// node_modules/subscriptions-transport-ws/dist/utils/is-object.js
var require_is_object = __commonJS({
  "node_modules/subscriptions-transport-ws/dist/utils/is-object.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isObject(value) {
      return value !== null && typeof value === "object";
    }
    exports.default = isObject;
  }
});

// node_modules/subscriptions-transport-ws/node_modules/symbol-observable/es/ponyfill.js
function symbolObservablePonyfill(root2) {
  var result2;
  var Symbol2 = root2.Symbol;
  if (typeof Symbol2 === "function") {
    if (Symbol2.observable) {
      result2 = Symbol2.observable;
    } else {
      result2 = Symbol2("observable");
      Symbol2.observable = result2;
    }
  } else {
    result2 = "@@observable";
  }
  return result2;
}
var init_ponyfill = __esm({
  "node_modules/subscriptions-transport-ws/node_modules/symbol-observable/es/ponyfill.js"() {
  }
});

// node_modules/subscriptions-transport-ws/node_modules/symbol-observable/es/index.js
var es_exports = {};
__export(es_exports, {
  default: () => es_default
});
var root, result, es_default;
var init_es = __esm({
  "node_modules/subscriptions-transport-ws/node_modules/symbol-observable/es/index.js"() {
    init_ponyfill();
    if (typeof self !== "undefined") {
      root = self;
    } else if (typeof window !== "undefined") {
      root = window;
    } else if (typeof global !== "undefined") {
      root = global;
    } else if (typeof module !== "undefined") {
      root = module;
    } else {
      root = Function("return this")();
    }
    result = symbolObservablePonyfill(root);
    es_default = result;
  }
});

// node_modules/subscriptions-transport-ws/dist/protocol.js
var require_protocol = __commonJS({
  "node_modules/subscriptions-transport-ws/dist/protocol.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GRAPHQL_SUBSCRIPTIONS = exports.GRAPHQL_WS = void 0;
    var GRAPHQL_WS = "graphql-ws";
    exports.GRAPHQL_WS = GRAPHQL_WS;
    var GRAPHQL_SUBSCRIPTIONS = "graphql-subscriptions";
    exports.GRAPHQL_SUBSCRIPTIONS = GRAPHQL_SUBSCRIPTIONS;
  }
});

// node_modules/subscriptions-transport-ws/dist/defaults.js
var require_defaults = __commonJS({
  "node_modules/subscriptions-transport-ws/dist/defaults.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WS_TIMEOUT = exports.MIN_WS_TIMEOUT = void 0;
    var MIN_WS_TIMEOUT = 1e3;
    exports.MIN_WS_TIMEOUT = MIN_WS_TIMEOUT;
    var WS_TIMEOUT = 3e4;
    exports.WS_TIMEOUT = WS_TIMEOUT;
  }
});

// node_modules/subscriptions-transport-ws/dist/message-types.js
var require_message_types = __commonJS({
  "node_modules/subscriptions-transport-ws/dist/message-types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MessageTypes = function() {
      function MessageTypes2() {
        throw new Error("Static Class");
      }
      MessageTypes2.GQL_CONNECTION_INIT = "connection_init";
      MessageTypes2.GQL_CONNECTION_ACK = "connection_ack";
      MessageTypes2.GQL_CONNECTION_ERROR = "connection_error";
      MessageTypes2.GQL_CONNECTION_KEEP_ALIVE = "ka";
      MessageTypes2.GQL_CONNECTION_TERMINATE = "connection_terminate";
      MessageTypes2.GQL_START = "start";
      MessageTypes2.GQL_DATA = "data";
      MessageTypes2.GQL_ERROR = "error";
      MessageTypes2.GQL_COMPLETE = "complete";
      MessageTypes2.GQL_STOP = "stop";
      MessageTypes2.SUBSCRIPTION_START = "subscription_start";
      MessageTypes2.SUBSCRIPTION_DATA = "subscription_data";
      MessageTypes2.SUBSCRIPTION_SUCCESS = "subscription_success";
      MessageTypes2.SUBSCRIPTION_FAIL = "subscription_fail";
      MessageTypes2.SUBSCRIPTION_END = "subscription_end";
      MessageTypes2.INIT = "init";
      MessageTypes2.INIT_SUCCESS = "init_success";
      MessageTypes2.INIT_FAIL = "init_fail";
      MessageTypes2.KEEP_ALIVE = "keepalive";
      return MessageTypes2;
    }();
    exports.default = MessageTypes;
  }
});

// node_modules/subscriptions-transport-ws/dist/client.js
var require_client = __commonJS({
  "node_modules/subscriptions-transport-ws/dist/client.js"(exports) {
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
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
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result2) {
          result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SubscriptionClient = void 0;
    var _global = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {};
    var NativeWebSocket = _global.WebSocket || _global.MozWebSocket;
    var Backoff = require_backo2();
    var eventemitter3_1 = require_eventemitter3();
    var is_string_1 = require_is_string();
    var is_object_1 = require_is_object();
    var printer_1 = (init_printer(), __toCommonJS(printer_exports));
    var getOperationAST_1 = (init_getOperationAST(), __toCommonJS(getOperationAST_exports));
    var symbol_observable_1 = (init_es(), __toCommonJS(es_exports));
    var protocol_1 = require_protocol();
    var defaults_1 = require_defaults();
    var message_types_1 = require_message_types();
    var SubscriptionClient = function() {
      function SubscriptionClient2(url, options, webSocketImpl, webSocketProtocols) {
        var _a = options || {}, _b = _a.connectionCallback, connectionCallback = _b === void 0 ? void 0 : _b, _c = _a.connectionParams, connectionParams = _c === void 0 ? {} : _c, _d = _a.minTimeout, minTimeout = _d === void 0 ? defaults_1.MIN_WS_TIMEOUT : _d, _e = _a.timeout, timeout = _e === void 0 ? defaults_1.WS_TIMEOUT : _e, _f = _a.reconnect, reconnect = _f === void 0 ? false : _f, _g = _a.reconnectionAttempts, reconnectionAttempts = _g === void 0 ? Infinity : _g, _h = _a.lazy, lazy = _h === void 0 ? false : _h, _j = _a.inactivityTimeout, inactivityTimeout = _j === void 0 ? 0 : _j, _k = _a.wsOptionArguments, wsOptionArguments = _k === void 0 ? [] : _k;
        this.wsImpl = webSocketImpl || NativeWebSocket;
        if (!this.wsImpl) {
          throw new Error("Unable to find native implementation, or alternative implementation for WebSocket!");
        }
        this.wsProtocols = webSocketProtocols || protocol_1.GRAPHQL_WS;
        this.connectionCallback = connectionCallback;
        this.url = url;
        this.operations = {};
        this.nextOperationId = 0;
        this.minWsTimeout = minTimeout;
        this.wsTimeout = timeout;
        this.unsentMessagesQueue = [];
        this.reconnect = reconnect;
        this.reconnecting = false;
        this.reconnectionAttempts = reconnectionAttempts;
        this.lazy = !!lazy;
        this.inactivityTimeout = inactivityTimeout;
        this.closedByUser = false;
        this.backoff = new Backoff({ jitter: 0.5 });
        this.eventEmitter = new eventemitter3_1.EventEmitter();
        this.middlewares = [];
        this.client = null;
        this.maxConnectTimeGenerator = this.createMaxConnectTimeGenerator();
        this.connectionParams = this.getConnectionParams(connectionParams);
        this.wsOptionArguments = wsOptionArguments;
        if (!this.lazy) {
          this.connect();
        }
      }
      Object.defineProperty(SubscriptionClient2.prototype, "status", {
        get: function() {
          if (this.client === null) {
            return this.wsImpl.CLOSED;
          }
          return this.client.readyState;
        },
        enumerable: false,
        configurable: true
      });
      SubscriptionClient2.prototype.close = function(isForced, closedByUser) {
        if (isForced === void 0) {
          isForced = true;
        }
        if (closedByUser === void 0) {
          closedByUser = true;
        }
        this.clearInactivityTimeout();
        if (this.client !== null) {
          this.closedByUser = closedByUser;
          if (isForced) {
            this.clearCheckConnectionInterval();
            this.clearMaxConnectTimeout();
            this.clearTryReconnectTimeout();
            this.unsubscribeAll();
            this.sendMessage(void 0, message_types_1.default.GQL_CONNECTION_TERMINATE, null);
          }
          this.client.close();
          this.client.onopen = null;
          this.client.onclose = null;
          this.client.onerror = null;
          this.client.onmessage = null;
          this.client = null;
          this.eventEmitter.emit("disconnected");
          if (!isForced) {
            this.tryReconnect();
          }
        }
      };
      SubscriptionClient2.prototype.request = function(request) {
        var _a;
        var getObserver = this.getObserver.bind(this);
        var executeOperation = this.executeOperation.bind(this);
        var unsubscribe = this.unsubscribe.bind(this);
        var opId;
        this.clearInactivityTimeout();
        return _a = {}, _a[symbol_observable_1.default] = function() {
          return this;
        }, _a.subscribe = function(observerOrNext, onError, onComplete) {
          var observer = getObserver(observerOrNext, onError, onComplete);
          opId = executeOperation(request, function(error, result2) {
            if (error === null && result2 === null) {
              if (observer.complete) {
                observer.complete();
              }
            } else if (error) {
              if (observer.error) {
                observer.error(error[0]);
              }
            } else {
              if (observer.next) {
                observer.next(result2);
              }
            }
          });
          return {
            unsubscribe: function() {
              if (opId) {
                unsubscribe(opId);
                opId = null;
              }
            }
          };
        }, _a;
      };
      SubscriptionClient2.prototype.on = function(eventName, callback, context) {
        var handler = this.eventEmitter.on(eventName, callback, context);
        return function() {
          handler.off(eventName, callback, context);
        };
      };
      SubscriptionClient2.prototype.onConnected = function(callback, context) {
        return this.on("connected", callback, context);
      };
      SubscriptionClient2.prototype.onConnecting = function(callback, context) {
        return this.on("connecting", callback, context);
      };
      SubscriptionClient2.prototype.onDisconnected = function(callback, context) {
        return this.on("disconnected", callback, context);
      };
      SubscriptionClient2.prototype.onReconnected = function(callback, context) {
        return this.on("reconnected", callback, context);
      };
      SubscriptionClient2.prototype.onReconnecting = function(callback, context) {
        return this.on("reconnecting", callback, context);
      };
      SubscriptionClient2.prototype.onError = function(callback, context) {
        return this.on("error", callback, context);
      };
      SubscriptionClient2.prototype.unsubscribeAll = function() {
        var _this = this;
        Object.keys(this.operations).forEach(function(subId) {
          _this.unsubscribe(subId);
        });
      };
      SubscriptionClient2.prototype.applyMiddlewares = function(options) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          var queue = function(funcs, scope) {
            var next = function(error) {
              if (error) {
                reject(error);
              } else {
                if (funcs.length > 0) {
                  var f = funcs.shift();
                  if (f) {
                    f.applyMiddleware.apply(scope, [options, next]);
                  }
                } else {
                  resolve(options);
                }
              }
            };
            next();
          };
          queue(__spreadArrays(_this.middlewares), _this);
        });
      };
      SubscriptionClient2.prototype.use = function(middlewares) {
        var _this = this;
        middlewares.map(function(middleware) {
          if (typeof middleware.applyMiddleware === "function") {
            _this.middlewares.push(middleware);
          } else {
            throw new Error("Middleware must implement the applyMiddleware function.");
          }
        });
        return this;
      };
      SubscriptionClient2.prototype.getConnectionParams = function(connectionParams) {
        return function() {
          return new Promise(function(resolve, reject) {
            if (typeof connectionParams === "function") {
              try {
                return resolve(connectionParams.call(null));
              } catch (error) {
                return reject(error);
              }
            }
            resolve(connectionParams);
          });
        };
      };
      SubscriptionClient2.prototype.executeOperation = function(options, handler) {
        var _this = this;
        if (this.client === null) {
          this.connect();
        }
        var opId = this.generateOperationId();
        this.operations[opId] = { options, handler };
        this.applyMiddlewares(options).then(function(processedOptions) {
          _this.checkOperationOptions(processedOptions, handler);
          if (_this.operations[opId]) {
            _this.operations[opId] = { options: processedOptions, handler };
            _this.sendMessage(opId, message_types_1.default.GQL_START, processedOptions);
          }
        }).catch(function(error) {
          _this.unsubscribe(opId);
          handler(_this.formatErrors(error));
        });
        return opId;
      };
      SubscriptionClient2.prototype.getObserver = function(observerOrNext, error, complete) {
        if (typeof observerOrNext === "function") {
          return {
            next: function(v) {
              return observerOrNext(v);
            },
            error: function(e) {
              return error && error(e);
            },
            complete: function() {
              return complete && complete();
            }
          };
        }
        return observerOrNext;
      };
      SubscriptionClient2.prototype.createMaxConnectTimeGenerator = function() {
        var minValue = this.minWsTimeout;
        var maxValue = this.wsTimeout;
        return new Backoff({
          min: minValue,
          max: maxValue,
          factor: 1.2
        });
      };
      SubscriptionClient2.prototype.clearCheckConnectionInterval = function() {
        if (this.checkConnectionIntervalId) {
          clearInterval(this.checkConnectionIntervalId);
          this.checkConnectionIntervalId = null;
        }
      };
      SubscriptionClient2.prototype.clearMaxConnectTimeout = function() {
        if (this.maxConnectTimeoutId) {
          clearTimeout(this.maxConnectTimeoutId);
          this.maxConnectTimeoutId = null;
        }
      };
      SubscriptionClient2.prototype.clearTryReconnectTimeout = function() {
        if (this.tryReconnectTimeoutId) {
          clearTimeout(this.tryReconnectTimeoutId);
          this.tryReconnectTimeoutId = null;
        }
      };
      SubscriptionClient2.prototype.clearInactivityTimeout = function() {
        if (this.inactivityTimeoutId) {
          clearTimeout(this.inactivityTimeoutId);
          this.inactivityTimeoutId = null;
        }
      };
      SubscriptionClient2.prototype.setInactivityTimeout = function() {
        var _this = this;
        if (this.inactivityTimeout > 0 && Object.keys(this.operations).length === 0) {
          this.inactivityTimeoutId = setTimeout(function() {
            if (Object.keys(_this.operations).length === 0) {
              _this.close();
            }
          }, this.inactivityTimeout);
        }
      };
      SubscriptionClient2.prototype.checkOperationOptions = function(options, handler) {
        var query = options.query, variables = options.variables, operationName = options.operationName;
        if (!query) {
          throw new Error("Must provide a query.");
        }
        if (!handler) {
          throw new Error("Must provide an handler.");
        }
        if (!is_string_1.default(query) && !getOperationAST_1.getOperationAST(query, operationName) || operationName && !is_string_1.default(operationName) || variables && !is_object_1.default(variables)) {
          throw new Error("Incorrect option types. query must be a string or a document,`operationName` must be a string, and `variables` must be an object.");
        }
      };
      SubscriptionClient2.prototype.buildMessage = function(id, type, payload) {
        var payloadToReturn = payload && payload.query ? __assign(__assign({}, payload), { query: typeof payload.query === "string" ? payload.query : printer_1.print(payload.query) }) : payload;
        return {
          id,
          type,
          payload: payloadToReturn
        };
      };
      SubscriptionClient2.prototype.formatErrors = function(errors) {
        if (Array.isArray(errors)) {
          return errors;
        }
        if (errors && errors.errors) {
          return this.formatErrors(errors.errors);
        }
        if (errors && errors.message) {
          return [errors];
        }
        return [{
          name: "FormatedError",
          message: "Unknown error",
          originalError: errors
        }];
      };
      SubscriptionClient2.prototype.sendMessage = function(id, type, payload) {
        this.sendMessageRaw(this.buildMessage(id, type, payload));
      };
      SubscriptionClient2.prototype.sendMessageRaw = function(message) {
        switch (this.status) {
          case this.wsImpl.OPEN:
            var serializedMessage = JSON.stringify(message);
            try {
              JSON.parse(serializedMessage);
            } catch (e) {
              this.eventEmitter.emit("error", new Error("Message must be JSON-serializable. Got: " + message));
            }
            this.client.send(serializedMessage);
            break;
          case this.wsImpl.CONNECTING:
            this.unsentMessagesQueue.push(message);
            break;
          default:
            if (!this.reconnecting) {
              this.eventEmitter.emit("error", new Error("A message was not sent because socket is not connected, is closing or is already closed. Message was: " + JSON.stringify(message)));
            }
        }
      };
      SubscriptionClient2.prototype.generateOperationId = function() {
        return String(++this.nextOperationId);
      };
      SubscriptionClient2.prototype.tryReconnect = function() {
        var _this = this;
        if (!this.reconnect || this.backoff.attempts >= this.reconnectionAttempts) {
          return;
        }
        if (!this.reconnecting) {
          Object.keys(this.operations).forEach(function(key) {
            _this.unsentMessagesQueue.push(_this.buildMessage(key, message_types_1.default.GQL_START, _this.operations[key].options));
          });
          this.reconnecting = true;
        }
        this.clearTryReconnectTimeout();
        var delay = this.backoff.duration();
        this.tryReconnectTimeoutId = setTimeout(function() {
          _this.connect();
        }, delay);
      };
      SubscriptionClient2.prototype.flushUnsentMessagesQueue = function() {
        var _this = this;
        this.unsentMessagesQueue.forEach(function(message) {
          _this.sendMessageRaw(message);
        });
        this.unsentMessagesQueue = [];
      };
      SubscriptionClient2.prototype.checkConnection = function() {
        if (this.wasKeepAliveReceived) {
          this.wasKeepAliveReceived = false;
          return;
        }
        if (!this.reconnecting) {
          this.close(false, true);
        }
      };
      SubscriptionClient2.prototype.checkMaxConnectTimeout = function() {
        var _this = this;
        this.clearMaxConnectTimeout();
        this.maxConnectTimeoutId = setTimeout(function() {
          if (_this.status !== _this.wsImpl.OPEN) {
            _this.reconnecting = true;
            _this.close(false, true);
          }
        }, this.maxConnectTimeGenerator.duration());
      };
      SubscriptionClient2.prototype.connect = function() {
        var _a;
        var _this = this;
        this.client = new ((_a = this.wsImpl).bind.apply(_a, __spreadArrays([void 0, this.url, this.wsProtocols], this.wsOptionArguments)))();
        this.checkMaxConnectTimeout();
        this.client.onopen = function() {
          return __awaiter(_this, void 0, void 0, function() {
            var connectionParams, error_1;
            return __generator(this, function(_a2) {
              switch (_a2.label) {
                case 0:
                  if (!(this.status === this.wsImpl.OPEN))
                    return [3, 4];
                  this.clearMaxConnectTimeout();
                  this.closedByUser = false;
                  this.eventEmitter.emit(this.reconnecting ? "reconnecting" : "connecting");
                  _a2.label = 1;
                case 1:
                  _a2.trys.push([1, 3, , 4]);
                  return [4, this.connectionParams()];
                case 2:
                  connectionParams = _a2.sent();
                  this.sendMessage(void 0, message_types_1.default.GQL_CONNECTION_INIT, connectionParams);
                  this.flushUnsentMessagesQueue();
                  return [3, 4];
                case 3:
                  error_1 = _a2.sent();
                  this.sendMessage(void 0, message_types_1.default.GQL_CONNECTION_ERROR, error_1);
                  this.flushUnsentMessagesQueue();
                  return [3, 4];
                case 4:
                  return [2];
              }
            });
          });
        };
        this.client.onclose = function() {
          if (!_this.closedByUser) {
            _this.close(false, false);
          }
        };
        this.client.onerror = function(err) {
          _this.eventEmitter.emit("error", err);
        };
        this.client.onmessage = function(_a2) {
          var data = _a2.data;
          _this.processReceivedData(data);
        };
      };
      SubscriptionClient2.prototype.processReceivedData = function(receivedData) {
        var parsedMessage;
        var opId;
        try {
          parsedMessage = JSON.parse(receivedData);
          opId = parsedMessage.id;
        } catch (e) {
          throw new Error("Message must be JSON-parseable. Got: " + receivedData);
        }
        if ([
          message_types_1.default.GQL_DATA,
          message_types_1.default.GQL_COMPLETE,
          message_types_1.default.GQL_ERROR
        ].indexOf(parsedMessage.type) !== -1 && !this.operations[opId]) {
          this.unsubscribe(opId);
          return;
        }
        switch (parsedMessage.type) {
          case message_types_1.default.GQL_CONNECTION_ERROR:
            if (this.connectionCallback) {
              this.connectionCallback(parsedMessage.payload);
            }
            break;
          case message_types_1.default.GQL_CONNECTION_ACK:
            this.eventEmitter.emit(this.reconnecting ? "reconnected" : "connected", parsedMessage.payload);
            this.reconnecting = false;
            this.backoff.reset();
            this.maxConnectTimeGenerator.reset();
            if (this.connectionCallback) {
              this.connectionCallback();
            }
            break;
          case message_types_1.default.GQL_COMPLETE:
            var handler = this.operations[opId].handler;
            delete this.operations[opId];
            handler.call(this, null, null);
            break;
          case message_types_1.default.GQL_ERROR:
            this.operations[opId].handler(this.formatErrors(parsedMessage.payload), null);
            delete this.operations[opId];
            break;
          case message_types_1.default.GQL_DATA:
            var parsedPayload = !parsedMessage.payload.errors ? parsedMessage.payload : __assign(__assign({}, parsedMessage.payload), { errors: this.formatErrors(parsedMessage.payload.errors) });
            this.operations[opId].handler(null, parsedPayload);
            break;
          case message_types_1.default.GQL_CONNECTION_KEEP_ALIVE:
            var firstKA = typeof this.wasKeepAliveReceived === "undefined";
            this.wasKeepAliveReceived = true;
            if (firstKA) {
              this.checkConnection();
            }
            if (this.checkConnectionIntervalId) {
              clearInterval(this.checkConnectionIntervalId);
              this.checkConnection();
            }
            this.checkConnectionIntervalId = setInterval(this.checkConnection.bind(this), this.wsTimeout);
            break;
          default:
            throw new Error("Invalid message type!");
        }
      };
      SubscriptionClient2.prototype.unsubscribe = function(opId) {
        if (this.operations[opId]) {
          delete this.operations[opId];
          this.setInactivityTimeout();
          this.sendMessage(opId, message_types_1.default.GQL_STOP, void 0);
        }
      };
      return SubscriptionClient2;
    }();
    exports.SubscriptionClient = SubscriptionClient;
  }
});

export {
  require_client
};
//# sourceMappingURL=chunk-VHLXFAR4.js.map
