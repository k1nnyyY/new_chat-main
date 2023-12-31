import {
  require_react
} from "./chunk-UOIPVTYB.js";
import {
  __toESM
} from "./chunk-AUZ3RYOM.js";

// node_modules/react-alert-template-basic/dist/esm/react-alert-template-basic.js
var import_react = __toESM(require_react());
var BaseIcon = function BaseIcon2(_ref) {
  var color = _ref.color, _ref$pushRight = _ref.pushRight, pushRight = _ref$pushRight === void 0 ? true : _ref$pushRight, children = _ref.children;
  return import_react.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: { marginRight: pushRight ? "20px" : "0", minWidth: 24 }
    },
    children
  );
};
var InfoIcon = function InfoIcon2() {
  return import_react.default.createElement(
    BaseIcon,
    { color: "#2E9AFE" },
    import_react.default.createElement("circle", { cx: "12", cy: "12", r: "10" }),
    import_react.default.createElement("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
    import_react.default.createElement("line", { x1: "12", y1: "8", x2: "12", y2: "8" })
  );
};
var SuccessIcon = function SuccessIcon2() {
  return import_react.default.createElement(
    BaseIcon,
    { color: "#31B404" },
    import_react.default.createElement("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
    import_react.default.createElement("polyline", { points: "22 4 12 14.01 9 11.01" })
  );
};
var ErrorIcon = function ErrorIcon2() {
  return import_react.default.createElement(
    BaseIcon,
    { color: "#FF0040" },
    import_react.default.createElement("circle", { cx: "12", cy: "12", r: "10" }),
    import_react.default.createElement("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
    import_react.default.createElement("line", { x1: "12", y1: "16", x2: "12", y2: "16" })
  );
};
var CloseIcon = function CloseIcon2() {
  return import_react.default.createElement(
    BaseIcon,
    { color: "#FFFFFF", pushRight: false },
    import_react.default.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    import_react.default.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
  );
};
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var alertStyle = {
  backgroundColor: "#151515",
  color: "white",
  padding: "10px",
  textTransform: "uppercase",
  borderRadius: "3px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.03)",
  fontFamily: "Arial",
  width: "300px",
  boxSizing: "border-box"
};
var buttonStyle = {
  marginLeft: "20px",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  color: "#FFFFFF"
};
var AlertTemplate = function AlertTemplate2(_ref) {
  var message = _ref.message, options = _ref.options, style = _ref.style, close = _ref.close;
  return import_react.default.createElement(
    "div",
    { style: _extends({}, alertStyle, style) },
    options.type === "info" && import_react.default.createElement(InfoIcon, null),
    options.type === "success" && import_react.default.createElement(SuccessIcon, null),
    options.type === "error" && import_react.default.createElement(ErrorIcon, null),
    import_react.default.createElement(
      "span",
      { style: { flex: 2 } },
      message
    ),
    import_react.default.createElement(
      "button",
      { onClick: close, style: buttonStyle },
      import_react.default.createElement(CloseIcon, null)
    )
  );
};
var react_alert_template_basic_default = AlertTemplate;
export {
  react_alert_template_basic_default as default
};
//# sourceMappingURL=react-alert-template-basic.js.map
