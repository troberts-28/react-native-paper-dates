"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.darkenBy = darkenBy;
exports.lightenBy = lightenBy;
exports.range = range;
exports.useHeaderBackgroundColor = useHeaderBackgroundColor;
exports.useHeaderColorIsLight = useHeaderColorIsLight;
exports.useHeaderTextColor = useHeaderTextColor;
exports.useLatest = useLatest;
exports.useTextColorOnPrimary = useTextColorOnPrimary;
var React = _interopRequireWildcard(require("react"));
var _color = _interopRequireDefault(require("color"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useLatest(value) {
  const ref = React.useRef(value);
  ref.current = value;
  return ref;
}
function useHeaderBackgroundColor() {
  return '#0B3C29';
}
function useHeaderColorIsLight() {
  const background = '#0B3C29';
  return (0, _color.default)(background).isLight();
}
function useHeaderTextColor() {
  const isLight = useHeaderColorIsLight();
  return !isLight ? '#CCE4D9' : '#3D3C3C';
}
function useTextColorOnPrimary() {
  const isDark = !(0, _color.default)('#0B3C29').isLight();
  return isDark ? '#CCE4D9' : '#3D3C3C';
}
function range(start, end) {
  return Array(end - start + 1).fill(null).map((_, i) => start + i);
}
function lightenBy(color, ratio) {
  const lightness = color.lightness();
  return color.lightness(lightness + (100 - lightness) * ratio);
}
function darkenBy(color, ratio) {
  const lightness = color.lightness();
  return color.lightness(lightness - lightness * ratio);
}
//# sourceMappingURL=utils.js.map