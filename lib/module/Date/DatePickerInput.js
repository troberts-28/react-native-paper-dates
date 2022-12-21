function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import DatePickerModal from './DatePickerModal';
import { useLatest } from '../utils';
import DatePickerInputWithoutModal from './DatePickerInputWithoutModal';

function DatePickerInput(_ref, ref) {
  let {
    withModal = true,
    calendarIcon = 'calendar',
    ...rest
  } = _ref;
  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  const onChangeRef = useLatest(rest.onChange);
  const onInnerConfirm = React.useCallback(_ref2 => {
    let {
      date
    } = _ref2;
    setVisible(false);
    onChangeRef.current(date);
  }, [setVisible, onChangeRef]);
  return /*#__PURE__*/React.createElement(DatePickerInputWithoutModal, _extends({
    ref: ref
  }, rest, {
    inputButtons: withModal ? /*#__PURE__*/React.createElement(IconButton, {
      size: 24,
      style: styles.calendarButton,
      icon: calendarIcon,
      onPress: () => setVisible(true)
    }) : null,
    modal: _ref3 => {
      let {
        value,
        locale,
        inputMode,
        validRange
      } = _ref3;
      return withModal ? /*#__PURE__*/React.createElement(DatePickerModal, {
        date: value,
        mode: "single",
        visible: visible,
        onDismiss: onDismiss,
        onConfirm: onInnerConfirm,
        locale: locale,
        dateMode: inputMode,
        validRange: validRange
      }) : null;
    }
  }));
}

const styles = StyleSheet.create({
  calendarButton: {
    position: 'absolute',
    right: 0,
    zIndex: 10
  }
});
export default /*#__PURE__*/React.forwardRef(DatePickerInput);
//# sourceMappingURL=DatePickerInput.js.map