"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EmptyDay = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNativePaper = require("react-native-paper");
var _reactNative = require("react-native");
var _dateUtils = require("./dateUtils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function EmptyDayPure() {
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.empty
  });
}
const EmptyDay = /*#__PURE__*/React.memo(EmptyDayPure);
exports.EmptyDay = EmptyDay;
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function DayOfWeek(props) {
  const {
    dayIndex,
    selected,
    onPressDay,
    primaryColor,
    disabled,
    textColorOnPrimary
  } = props;
  const onPress = React.useCallback(() => {
    onPressDay(dayIndex);
  }, [onPressDay, dayIndex]);
  const textColor = selected ? textColorOnPrimary : undefined;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.root, disabled && styles.disabled]
  }, /*#__PURE__*/React.createElement(_reactNativePaper.TouchableRipple, {
    testID: `react-native-paper-dates-day-${dayIndex}`,
    disabled: disabled,
    borderless: true,
    onPress: disabled ? undefined : onPress,
    style: [styles.button],
    accessibilityRole: "button"
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.day, selected ? {
      backgroundColor: primaryColor
    } : null]
  }, /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    style: textColor ? {
      color: textColor,
      fontFamily: 'Poppins-SemiBold',
      fontSize: 18
    } : {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 18
    },
    selectable: false
  }, daysOfWeek[dayIndex]))));
}
const styles = _reactNative.StyleSheet.create({
  empty: {
    flex: 1,
    flexBasis: 0
  },
  disabled: {
    opacity: 0.3
  },
  root: {
    flexBasis: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: 6
  },
  button: {
    width: _dateUtils.daySize,
    height: _dateUtils.daySize,
    overflow: 'hidden',
    borderRadius: _dateUtils.daySize / 2
  },
  day: {
    flexBasis: 0,
    flex: 1,
    borderRadius: _dateUtils.daySize / 2,
    width: _dateUtils.daySize,
    height: _dateUtils.daySize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent'
  },
  flex1: {
    flex: 1
  }
});
var _default = /*#__PURE__*/React.memo(DayOfWeek);
exports.default = _default;
//# sourceMappingURL=DayOfWeek.js.map