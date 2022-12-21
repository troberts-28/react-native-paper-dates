function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import TextInputWithMask from '../TextInputMask';
import { HelperText, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import useDateInput from './inputUtils';

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
  const theme = useTheme();
  const {
    formattedValue,
    inputFormat,
    onChangeText,
    error
  } = useDateInput({
    locale,
    value,
    validRange,
    inputMode,
    onChange
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(TextInputWithMask, _extends({}, rest, {
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
  })), inputButtons, !!error ? /*#__PURE__*/React.createElement(View, {
    style: styles.helperText
  }, /*#__PURE__*/React.createElement(HelperText, {
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

const styles = StyleSheet.create({
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
export default /*#__PURE__*/React.forwardRef(DatePickerInputWithoutModal);
//# sourceMappingURL=DatePickerInputWithoutModal.js.map