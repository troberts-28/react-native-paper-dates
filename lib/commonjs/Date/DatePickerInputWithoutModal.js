"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _TextInputMask = _interopRequireDefault(require("../TextInputMask"));

var _reactNativePaper = require("react-native-paper");

var _reactNative = require("react-native");

var _inputUtils = _interopRequireDefault(require("./inputUtils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function DatePickerInputWithoutModal(_ref, ref) {
  let {
    label,
    value,
    onChange,
    style,
    locale,
    validRange,
    inputMode,
    withDateFormatInLabel = true,
    modal,
    inputButtons,
    ...rest
  } = _ref;
  const theme = (0, _reactNativePaper.useTheme)();
  const {
    formattedValue,
    inputFormat,
    onChangeText,
    error
  } = (0, _inputUtils.default)({
    locale,
    value,
    validRange,
    inputMode,
    onChange
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(_TextInputMask.default, _extends({}, rest, {
    ref: ref,
    label: getLabel({
      // TODO: support label components?
      label: label,
      inputFormat,
      withDateFormatInLabel
    }),
    value: formattedValue,
    keyboardType: 'number-pad',
    placeholder: inputFormat,
    mask: inputFormat,
    onChangeText: onChangeText,
    keyboardAppearance: theme.dark ? 'dark' : 'default',
    error: !!error,
    style: [styles.input, style]
  })), inputButtons, !!error ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.helperText
  }, /*#__PURE__*/React.createElement(_reactNativePaper.HelperText, {
    style: styles.helperText,
    type: "error",
    visible: !!error
  }, error)) : null), modal === null || modal === void 0 ? void 0 : modal({
    value,
    locale,
    inputMode,
    validRange
  }));
}

function getLabel(_ref2) {
  let {
    withDateFormatInLabel,
    inputFormat,
    label
  } = _ref2;

  if (withDateFormatInLabel) {
    return label ? `${label} (${inputFormat})` : inputFormat;
  }

  return label || '';
}

const styles = _reactNative.StyleSheet.create({
  root: {
    minWidth: 150,
    flexGrow: 1,
    justifyContent: 'center'
  },
  helperTextContainer: {
    flexDirection: 'row'
  },
  helperText: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold'
  },
  input: {
    fontFamily: 'Poppins-SemiBold',
    color: '#3D3C3C'
  }
});

var _default = /*#__PURE__*/React.forwardRef(DatePickerInputWithoutModal);

exports.default = _default;
//# sourceMappingURL=DatePickerInputWithoutModal.js.map