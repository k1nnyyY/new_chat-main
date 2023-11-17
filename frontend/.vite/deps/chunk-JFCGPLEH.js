import {
  __esm,
  __export
} from "./chunk-AUZ3RYOM.js";

// node_modules/graphql/jsutils/nodejsCustomInspectSymbol.mjs
var nodejsCustomInspectSymbol, nodejsCustomInspectSymbol_default;
var init_nodejsCustomInspectSymbol = __esm({
  "node_modules/graphql/jsutils/nodejsCustomInspectSymbol.mjs"() {
    nodejsCustomInspectSymbol = typeof Symbol === "function" && typeof Symbol.for === "function" ? Symbol.for("nodejs.util.inspect.custom") : void 0;
    nodejsCustomInspectSymbol_default = nodejsCustomInspectSymbol;
  }
});

// node_modules/graphql/jsutils/inspect.mjs
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function inspect(value) {
  return formatValue(value, []);
}
function formatValue(value, seenValues) {
  switch (_typeof(value)) {
    case "string":
      return JSON.stringify(value);
    case "function":
      return value.name ? "[function ".concat(value.name, "]") : "[function]";
    case "object":
      if (value === null) {
        return "null";
      }
      return formatObjectValue(value, seenValues);
    default:
      return String(value);
  }
}
function formatObjectValue(value, previouslySeenValues) {
  if (previouslySeenValues.indexOf(value) !== -1) {
    return "[Circular]";
  }
  var seenValues = [].concat(previouslySeenValues, [value]);
  var customInspectFn = getCustomFn(value);
  if (customInspectFn !== void 0) {
    var customValue = customInspectFn.call(value);
    if (customValue !== value) {
      return typeof customValue === "string" ? customValue : formatValue(customValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }
  return formatObject(value, seenValues);
}
function formatObject(object, seenValues) {
  var keys = Object.keys(object);
  if (keys.length === 0) {
    return "{}";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[" + getObjectTag(object) + "]";
  }
  var properties = keys.map(function(key) {
    var value = formatValue(object[key], seenValues);
    return key + ": " + value;
  });
  return "{ " + properties.join(", ") + " }";
}
function formatArray(array, seenValues) {
  if (array.length === 0) {
    return "[]";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[Array]";
  }
  var len = Math.min(MAX_ARRAY_LENGTH, array.length);
  var remaining = array.length - len;
  var items = [];
  for (var i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }
  if (remaining === 1) {
    items.push("... 1 more item");
  } else if (remaining > 1) {
    items.push("... ".concat(remaining, " more items"));
  }
  return "[" + items.join(", ") + "]";
}
function getCustomFn(object) {
  var customInspectFn = object[String(nodejsCustomInspectSymbol_default)];
  if (typeof customInspectFn === "function") {
    return customInspectFn;
  }
  if (typeof object.inspect === "function") {
    return object.inspect;
  }
}
function getObjectTag(object) {
  var tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
  if (tag === "Object" && typeof object.constructor === "function") {
    var name = object.constructor.name;
    if (typeof name === "string" && name !== "") {
      return name;
    }
  }
  return tag;
}
var MAX_ARRAY_LENGTH, MAX_RECURSIVE_DEPTH;
var init_inspect = __esm({
  "node_modules/graphql/jsutils/inspect.mjs"() {
    init_nodejsCustomInspectSymbol();
    MAX_ARRAY_LENGTH = 10;
    MAX_RECURSIVE_DEPTH = 2;
  }
});

// node_modules/graphql/jsutils/invariant.mjs
function invariant(condition, message) {
  var booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message != null ? message : "Unexpected invariant triggered.");
  }
}
var init_invariant = __esm({
  "node_modules/graphql/jsutils/invariant.mjs"() {
  }
});

// node_modules/graphql/jsutils/defineInspect.mjs
function defineInspect(classObject) {
  var fn = classObject.prototype.toJSON;
  typeof fn === "function" || invariant(0);
  classObject.prototype.inspect = fn;
  if (nodejsCustomInspectSymbol_default) {
    classObject.prototype[nodejsCustomInspectSymbol_default] = fn;
  }
}
var init_defineInspect = __esm({
  "node_modules/graphql/jsutils/defineInspect.mjs"() {
    init_invariant();
    init_nodejsCustomInspectSymbol();
  }
});

// node_modules/graphql/language/ast.mjs
function isNode(maybeNode) {
  return maybeNode != null && typeof maybeNode.kind === "string";
}
var Location, Token;
var init_ast = __esm({
  "node_modules/graphql/language/ast.mjs"() {
    init_defineInspect();
    Location = function() {
      function Location2(startToken, endToken, source) {
        this.start = startToken.start;
        this.end = endToken.end;
        this.startToken = startToken;
        this.endToken = endToken;
        this.source = source;
      }
      var _proto = Location2.prototype;
      _proto.toJSON = function toJSON() {
        return {
          start: this.start,
          end: this.end
        };
      };
      return Location2;
    }();
    defineInspect(Location);
    Token = function() {
      function Token2(kind, start, end, line, column, prev, value) {
        this.kind = kind;
        this.start = start;
        this.end = end;
        this.line = line;
        this.column = column;
        this.value = value;
        this.prev = prev;
        this.next = null;
      }
      var _proto2 = Token2.prototype;
      _proto2.toJSON = function toJSON() {
        return {
          kind: this.kind,
          value: this.value,
          line: this.line,
          column: this.column
        };
      };
      return Token2;
    }();
    defineInspect(Token);
  }
});

// node_modules/graphql/language/visitor.mjs
function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : QueryDocumentKeys;
  var stack = void 0;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = void 0;
  var key = void 0;
  var parent = void 0;
  var path = [];
  var ancestors = [];
  var newRoot = root;
  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? void 0 : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};
          for (var _i2 = 0, _Object$keys2 = Object.keys(node); _i2 < _Object$keys2.length; _i2++) {
            var k = _Object$keys2[_i2];
            clone[k] = node[k];
          }
          node = clone;
        }
        var editOffset = 0;
        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];
          if (inArray) {
            editKey -= editOffset;
          }
          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : void 0;
      node = parent ? parent[key] : newRoot;
      if (node === null || node === void 0) {
        continue;
      }
      if (parent) {
        path.push(key);
      }
    }
    var result = void 0;
    if (!Array.isArray(node)) {
      if (!isNode(node)) {
        throw new Error("Invalid AST Node: ".concat(inspect(node), "."));
      }
      var visitFn = getVisitFn(visitor, node.kind, isLeaving);
      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);
        if (result === BREAK) {
          break;
        }
        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== void 0) {
          edits.push([key, result]);
          if (!isLeaving) {
            if (isNode(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }
    if (result === void 0 && isEdited) {
      edits.push([key, node]);
    }
    if (isLeaving) {
      path.pop();
    } else {
      var _visitorKeys$node$kin;
      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_visitorKeys$node$kin = visitorKeys[node.kind]) !== null && _visitorKeys$node$kin !== void 0 ? _visitorKeys$node$kin : [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== void 0);
  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }
  return newRoot;
}
function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];
  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === "function") {
      return kindVisitor;
    }
    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;
    if (typeof kindSpecificVisitor === "function") {
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;
    if (specificVisitor) {
      if (typeof specificVisitor === "function") {
        return specificVisitor;
      }
      var specificKindVisitor = specificVisitor[kind];
      if (typeof specificKindVisitor === "function") {
        return specificKindVisitor;
      }
    }
  }
}
var QueryDocumentKeys, BREAK;
var init_visitor = __esm({
  "node_modules/graphql/language/visitor.mjs"() {
    init_inspect();
    init_ast();
    QueryDocumentKeys = {
      Name: [],
      Document: ["definitions"],
      OperationDefinition: ["name", "variableDefinitions", "directives", "selectionSet"],
      VariableDefinition: ["variable", "type", "defaultValue", "directives"],
      Variable: ["name"],
      SelectionSet: ["selections"],
      Field: ["alias", "name", "arguments", "directives", "selectionSet"],
      Argument: ["name", "value"],
      FragmentSpread: ["name", "directives"],
      InlineFragment: ["typeCondition", "directives", "selectionSet"],
      FragmentDefinition: [
        "name",
        // Note: fragment variable definitions are experimental and may be changed
        // or removed in the future.
        "variableDefinitions",
        "typeCondition",
        "directives",
        "selectionSet"
      ],
      IntValue: [],
      FloatValue: [],
      StringValue: [],
      BooleanValue: [],
      NullValue: [],
      EnumValue: [],
      ListValue: ["values"],
      ObjectValue: ["fields"],
      ObjectField: ["name", "value"],
      Directive: ["name", "arguments"],
      NamedType: ["name"],
      ListType: ["type"],
      NonNullType: ["type"],
      SchemaDefinition: ["description", "directives", "operationTypes"],
      OperationTypeDefinition: ["type"],
      ScalarTypeDefinition: ["description", "name", "directives"],
      ObjectTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
      FieldDefinition: ["description", "name", "arguments", "type", "directives"],
      InputValueDefinition: ["description", "name", "type", "defaultValue", "directives"],
      InterfaceTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
      UnionTypeDefinition: ["description", "name", "directives", "types"],
      EnumTypeDefinition: ["description", "name", "directives", "values"],
      EnumValueDefinition: ["description", "name", "directives"],
      InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
      DirectiveDefinition: ["description", "name", "arguments", "locations"],
      SchemaExtension: ["directives", "operationTypes"],
      ScalarTypeExtension: ["name", "directives"],
      ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
      InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
      UnionTypeExtension: ["name", "directives", "types"],
      EnumTypeExtension: ["name", "directives", "values"],
      InputObjectTypeExtension: ["name", "directives", "fields"]
    };
    BREAK = Object.freeze({});
  }
});

// node_modules/graphql/language/blockString.mjs
function dedentBlockStringValue(rawString) {
  var lines = rawString.split(/\r\n|[\n\r]/g);
  var commonIndent = getBlockStringIndentation(rawString);
  if (commonIndent !== 0) {
    for (var i = 1; i < lines.length; i++) {
      lines[i] = lines[i].slice(commonIndent);
    }
  }
  var startLine = 0;
  while (startLine < lines.length && isBlank(lines[startLine])) {
    ++startLine;
  }
  var endLine = lines.length;
  while (endLine > startLine && isBlank(lines[endLine - 1])) {
    --endLine;
  }
  return lines.slice(startLine, endLine).join("\n");
}
function isBlank(str) {
  for (var i = 0; i < str.length; ++i) {
    if (str[i] !== " " && str[i] !== "	") {
      return false;
    }
  }
  return true;
}
function getBlockStringIndentation(value) {
  var _commonIndent;
  var isFirstLine = true;
  var isEmptyLine = true;
  var indent2 = 0;
  var commonIndent = null;
  for (var i = 0; i < value.length; ++i) {
    switch (value.charCodeAt(i)) {
      case 13:
        if (value.charCodeAt(i + 1) === 10) {
          ++i;
        }
      case 10:
        isFirstLine = false;
        isEmptyLine = true;
        indent2 = 0;
        break;
      case 9:
      case 32:
        ++indent2;
        break;
      default:
        if (isEmptyLine && !isFirstLine && (commonIndent === null || indent2 < commonIndent)) {
          commonIndent = indent2;
        }
        isEmptyLine = false;
    }
  }
  return (_commonIndent = commonIndent) !== null && _commonIndent !== void 0 ? _commonIndent : 0;
}
function printBlockString(value) {
  var indentation = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var preferMultipleLines = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var isSingleLine = value.indexOf("\n") === -1;
  var hasLeadingSpace = value[0] === " " || value[0] === "	";
  var hasTrailingQuote = value[value.length - 1] === '"';
  var hasTrailingSlash = value[value.length - 1] === "\\";
  var printAsMultipleLines = !isSingleLine || hasTrailingQuote || hasTrailingSlash || preferMultipleLines;
  var result = "";
  if (printAsMultipleLines && !(isSingleLine && hasLeadingSpace)) {
    result += "\n" + indentation;
  }
  result += indentation ? value.replace(/\n/g, "\n" + indentation) : value;
  if (printAsMultipleLines) {
    result += "\n";
  }
  return '"""' + result.replace(/"""/g, '\\"""') + '"""';
}
var init_blockString = __esm({
  "node_modules/graphql/language/blockString.mjs"() {
  }
});

// node_modules/graphql/language/printer.mjs
var printer_exports = {};
__export(printer_exports, {
  print: () => print
});
function print(ast) {
  return visit(ast, {
    leave: printDocASTReducer
  });
}
function addDescription(cb) {
  return function(node) {
    return join([node.description, cb(node)], "\n");
  };
}
function join(maybeArray) {
  var _maybeArray$filter$jo;
  var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter(function(x) {
    return x;
  }).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : "";
}
function block(array) {
  return wrap("{\n", indent(join(array, "\n")), "\n}");
}
function wrap(start, maybeString) {
  var end = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  return maybeString != null && maybeString !== "" ? start + maybeString + end : "";
}
function indent(str) {
  return wrap("  ", str.replace(/\n/g, "\n  "));
}
function isMultiline(str) {
  return str.indexOf("\n") !== -1;
}
function hasMultilineItems(maybeArray) {
  return maybeArray != null && maybeArray.some(isMultiline);
}
var MAX_LINE_LENGTH, printDocASTReducer;
var init_printer = __esm({
  "node_modules/graphql/language/printer.mjs"() {
    init_visitor();
    init_blockString();
    MAX_LINE_LENGTH = 80;
    printDocASTReducer = {
      Name: function Name(node) {
        return node.value;
      },
      Variable: function Variable(node) {
        return "$" + node.name;
      },
      // Document
      Document: function Document(node) {
        return join(node.definitions, "\n\n") + "\n";
      },
      OperationDefinition: function OperationDefinition(node) {
        var op = node.operation;
        var name = node.name;
        var varDefs = wrap("(", join(node.variableDefinitions, ", "), ")");
        var directives = join(node.directives, " ");
        var selectionSet = node.selectionSet;
        return !name && !directives && !varDefs && op === "query" ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], " ");
      },
      VariableDefinition: function VariableDefinition(_ref) {
        var variable = _ref.variable, type = _ref.type, defaultValue = _ref.defaultValue, directives = _ref.directives;
        return variable + ": " + type + wrap(" = ", defaultValue) + wrap(" ", join(directives, " "));
      },
      SelectionSet: function SelectionSet(_ref2) {
        var selections = _ref2.selections;
        return block(selections);
      },
      Field: function Field(_ref3) {
        var alias = _ref3.alias, name = _ref3.name, args = _ref3.arguments, directives = _ref3.directives, selectionSet = _ref3.selectionSet;
        var prefix = wrap("", alias, ": ") + name;
        var argsLine = prefix + wrap("(", join(args, ", "), ")");
        if (argsLine.length > MAX_LINE_LENGTH) {
          argsLine = prefix + wrap("(\n", indent(join(args, "\n")), "\n)");
        }
        return join([argsLine, join(directives, " "), selectionSet], " ");
      },
      Argument: function Argument(_ref4) {
        var name = _ref4.name, value = _ref4.value;
        return name + ": " + value;
      },
      // Fragments
      FragmentSpread: function FragmentSpread(_ref5) {
        var name = _ref5.name, directives = _ref5.directives;
        return "..." + name + wrap(" ", join(directives, " "));
      },
      InlineFragment: function InlineFragment(_ref6) {
        var typeCondition = _ref6.typeCondition, directives = _ref6.directives, selectionSet = _ref6.selectionSet;
        return join(["...", wrap("on ", typeCondition), join(directives, " "), selectionSet], " ");
      },
      FragmentDefinition: function FragmentDefinition(_ref7) {
        var name = _ref7.name, typeCondition = _ref7.typeCondition, variableDefinitions = _ref7.variableDefinitions, directives = _ref7.directives, selectionSet = _ref7.selectionSet;
        return (
          // Note: fragment variable definitions are experimental and may be changed
          // or removed in the future.
          "fragment ".concat(name).concat(wrap("(", join(variableDefinitions, ", "), ")"), " ") + "on ".concat(typeCondition, " ").concat(wrap("", join(directives, " "), " ")) + selectionSet
        );
      },
      // Value
      IntValue: function IntValue(_ref8) {
        var value = _ref8.value;
        return value;
      },
      FloatValue: function FloatValue(_ref9) {
        var value = _ref9.value;
        return value;
      },
      StringValue: function StringValue(_ref10, key) {
        var value = _ref10.value, isBlockString = _ref10.block;
        return isBlockString ? printBlockString(value, key === "description" ? "" : "  ") : JSON.stringify(value);
      },
      BooleanValue: function BooleanValue(_ref11) {
        var value = _ref11.value;
        return value ? "true" : "false";
      },
      NullValue: function NullValue() {
        return "null";
      },
      EnumValue: function EnumValue(_ref12) {
        var value = _ref12.value;
        return value;
      },
      ListValue: function ListValue(_ref13) {
        var values = _ref13.values;
        return "[" + join(values, ", ") + "]";
      },
      ObjectValue: function ObjectValue(_ref14) {
        var fields = _ref14.fields;
        return "{" + join(fields, ", ") + "}";
      },
      ObjectField: function ObjectField(_ref15) {
        var name = _ref15.name, value = _ref15.value;
        return name + ": " + value;
      },
      // Directive
      Directive: function Directive(_ref16) {
        var name = _ref16.name, args = _ref16.arguments;
        return "@" + name + wrap("(", join(args, ", "), ")");
      },
      // Type
      NamedType: function NamedType(_ref17) {
        var name = _ref17.name;
        return name;
      },
      ListType: function ListType(_ref18) {
        var type = _ref18.type;
        return "[" + type + "]";
      },
      NonNullType: function NonNullType(_ref19) {
        var type = _ref19.type;
        return type + "!";
      },
      // Type System Definitions
      SchemaDefinition: addDescription(function(_ref20) {
        var directives = _ref20.directives, operationTypes = _ref20.operationTypes;
        return join(["schema", join(directives, " "), block(operationTypes)], " ");
      }),
      OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
        var operation = _ref21.operation, type = _ref21.type;
        return operation + ": " + type;
      },
      ScalarTypeDefinition: addDescription(function(_ref22) {
        var name = _ref22.name, directives = _ref22.directives;
        return join(["scalar", name, join(directives, " ")], " ");
      }),
      ObjectTypeDefinition: addDescription(function(_ref23) {
        var name = _ref23.name, interfaces = _ref23.interfaces, directives = _ref23.directives, fields = _ref23.fields;
        return join(["type", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
      }),
      FieldDefinition: addDescription(function(_ref24) {
        var name = _ref24.name, args = _ref24.arguments, type = _ref24.type, directives = _ref24.directives;
        return name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + ": " + type + wrap(" ", join(directives, " "));
      }),
      InputValueDefinition: addDescription(function(_ref25) {
        var name = _ref25.name, type = _ref25.type, defaultValue = _ref25.defaultValue, directives = _ref25.directives;
        return join([name + ": " + type, wrap("= ", defaultValue), join(directives, " ")], " ");
      }),
      InterfaceTypeDefinition: addDescription(function(_ref26) {
        var name = _ref26.name, interfaces = _ref26.interfaces, directives = _ref26.directives, fields = _ref26.fields;
        return join(["interface", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
      }),
      UnionTypeDefinition: addDescription(function(_ref27) {
        var name = _ref27.name, directives = _ref27.directives, types = _ref27.types;
        return join(["union", name, join(directives, " "), types && types.length !== 0 ? "= " + join(types, " | ") : ""], " ");
      }),
      EnumTypeDefinition: addDescription(function(_ref28) {
        var name = _ref28.name, directives = _ref28.directives, values = _ref28.values;
        return join(["enum", name, join(directives, " "), block(values)], " ");
      }),
      EnumValueDefinition: addDescription(function(_ref29) {
        var name = _ref29.name, directives = _ref29.directives;
        return join([name, join(directives, " ")], " ");
      }),
      InputObjectTypeDefinition: addDescription(function(_ref30) {
        var name = _ref30.name, directives = _ref30.directives, fields = _ref30.fields;
        return join(["input", name, join(directives, " "), block(fields)], " ");
      }),
      DirectiveDefinition: addDescription(function(_ref31) {
        var name = _ref31.name, args = _ref31.arguments, repeatable = _ref31.repeatable, locations = _ref31.locations;
        return "directive @" + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ");
      }),
      SchemaExtension: function SchemaExtension(_ref32) {
        var directives = _ref32.directives, operationTypes = _ref32.operationTypes;
        return join(["extend schema", join(directives, " "), block(operationTypes)], " ");
      },
      ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
        var name = _ref33.name, directives = _ref33.directives;
        return join(["extend scalar", name, join(directives, " ")], " ");
      },
      ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
        var name = _ref34.name, interfaces = _ref34.interfaces, directives = _ref34.directives, fields = _ref34.fields;
        return join(["extend type", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
      },
      InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
        var name = _ref35.name, interfaces = _ref35.interfaces, directives = _ref35.directives, fields = _ref35.fields;
        return join(["extend interface", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
      },
      UnionTypeExtension: function UnionTypeExtension(_ref36) {
        var name = _ref36.name, directives = _ref36.directives, types = _ref36.types;
        return join(["extend union", name, join(directives, " "), types && types.length !== 0 ? "= " + join(types, " | ") : ""], " ");
      },
      EnumTypeExtension: function EnumTypeExtension(_ref37) {
        var name = _ref37.name, directives = _ref37.directives, values = _ref37.values;
        return join(["extend enum", name, join(directives, " "), block(values)], " ");
      },
      InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
        var name = _ref38.name, directives = _ref38.directives, fields = _ref38.fields;
        return join(["extend input", name, join(directives, " "), block(fields)], " ");
      }
    };
  }
});

// node_modules/graphql/language/kinds.mjs
var Kind;
var init_kinds = __esm({
  "node_modules/graphql/language/kinds.mjs"() {
    Kind = Object.freeze({
      // Name
      NAME: "Name",
      // Document
      DOCUMENT: "Document",
      OPERATION_DEFINITION: "OperationDefinition",
      VARIABLE_DEFINITION: "VariableDefinition",
      SELECTION_SET: "SelectionSet",
      FIELD: "Field",
      ARGUMENT: "Argument",
      // Fragments
      FRAGMENT_SPREAD: "FragmentSpread",
      INLINE_FRAGMENT: "InlineFragment",
      FRAGMENT_DEFINITION: "FragmentDefinition",
      // Values
      VARIABLE: "Variable",
      INT: "IntValue",
      FLOAT: "FloatValue",
      STRING: "StringValue",
      BOOLEAN: "BooleanValue",
      NULL: "NullValue",
      ENUM: "EnumValue",
      LIST: "ListValue",
      OBJECT: "ObjectValue",
      OBJECT_FIELD: "ObjectField",
      // Directives
      DIRECTIVE: "Directive",
      // Types
      NAMED_TYPE: "NamedType",
      LIST_TYPE: "ListType",
      NON_NULL_TYPE: "NonNullType",
      // Type System Definitions
      SCHEMA_DEFINITION: "SchemaDefinition",
      OPERATION_TYPE_DEFINITION: "OperationTypeDefinition",
      // Type Definitions
      SCALAR_TYPE_DEFINITION: "ScalarTypeDefinition",
      OBJECT_TYPE_DEFINITION: "ObjectTypeDefinition",
      FIELD_DEFINITION: "FieldDefinition",
      INPUT_VALUE_DEFINITION: "InputValueDefinition",
      INTERFACE_TYPE_DEFINITION: "InterfaceTypeDefinition",
      UNION_TYPE_DEFINITION: "UnionTypeDefinition",
      ENUM_TYPE_DEFINITION: "EnumTypeDefinition",
      ENUM_VALUE_DEFINITION: "EnumValueDefinition",
      INPUT_OBJECT_TYPE_DEFINITION: "InputObjectTypeDefinition",
      // Directive Definitions
      DIRECTIVE_DEFINITION: "DirectiveDefinition",
      // Type System Extensions
      SCHEMA_EXTENSION: "SchemaExtension",
      // Type Extensions
      SCALAR_TYPE_EXTENSION: "ScalarTypeExtension",
      OBJECT_TYPE_EXTENSION: "ObjectTypeExtension",
      INTERFACE_TYPE_EXTENSION: "InterfaceTypeExtension",
      UNION_TYPE_EXTENSION: "UnionTypeExtension",
      ENUM_TYPE_EXTENSION: "EnumTypeExtension",
      INPUT_OBJECT_TYPE_EXTENSION: "InputObjectTypeExtension"
    });
  }
});

// node_modules/graphql/utilities/getOperationAST.mjs
var getOperationAST_exports = {};
__export(getOperationAST_exports, {
  getOperationAST: () => getOperationAST
});
function getOperationAST(documentAST, operationName) {
  var operation = null;
  for (var _i2 = 0, _documentAST$definiti2 = documentAST.definitions; _i2 < _documentAST$definiti2.length; _i2++) {
    var definition = _documentAST$definiti2[_i2];
    if (definition.kind === Kind.OPERATION_DEFINITION) {
      var _definition$name;
      if (operationName == null) {
        if (operation) {
          return null;
        }
        operation = definition;
      } else if (((_definition$name = definition.name) === null || _definition$name === void 0 ? void 0 : _definition$name.value) === operationName) {
        return definition;
      }
    }
  }
  return operation;
}
var init_getOperationAST = __esm({
  "node_modules/graphql/utilities/getOperationAST.mjs"() {
    init_kinds();
  }
});

export {
  Kind,
  init_kinds,
  invariant,
  init_invariant,
  defineInspect,
  init_defineInspect,
  Location,
  Token,
  isNode,
  init_ast,
  inspect,
  init_inspect,
  dedentBlockStringValue,
  init_blockString,
  BREAK,
  visit,
  getVisitFn,
  init_visitor,
  print,
  printer_exports,
  init_printer,
  getOperationAST_exports,
  init_getOperationAST
};
//# sourceMappingURL=chunk-JFCGPLEH.js.map
