"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimePickerModalContent = DateTimePickerModalContent;
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _DatePickerModalHeader = _interopRequireDefault(require("./DatePickerModalHeader"));
var _DayTimePickerModalContentHeader = _interopRequireDefault(require("./DayTimePickerModalContentHeader"));
var _DatePickerModalHeaderBackground = _interopRequireDefault(require("./DatePickerModalHeaderBackground"));
var _AnalogClock = _interopRequireDefault(require("../Time/AnalogClock"));
var _timeUtils = require("../Time/timeUtils");
var _TimePicker = require("../Time/TimePicker");
var _TimeInputs = _interopRequireDefault(require("../Time/TimeInputs"));
var _DayOfWeek = _interopRequireDefault(require("./DayOfWeek"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function DateTimePickerModalContent(props) {
  const {
    onChange,
    onConfirm,
    onDismiss,
    disableSafeTop,
    locale,
    hideDayPicker,
    hideTimePicker
  } = props;
  const anyProps = props;
  const dimensions = (0, _reactNative.useWindowDimensions)();
  const isLandscape = dimensions.width > dimensions.height;
  const [focused, setFocused] = React.useState(_timeUtils.clockTypes.hours);
  const [localHours, setLocalHours] = React.useState(anyProps.hours);
  const [localMinutes, setLocalMinutes] = React.useState(getMinutes(anyProps.minutes));
  const [localDayIndex, setLocalDayIndex] = React.useState(getDayIndex(anyProps.dayIndex));
  const [displayMode, setDisplayMode] = React.useState(undefined);

  // Initialize display Mode according the hours value
  React.useEffect(() => {
    if ((props.hours ?? 0) >= 12) {
      setDisplayMode('PM');
    } else {
      setDisplayMode('AM');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update local state if changed from outside or if modal is opened
  React.useEffect(() => {
    setLocalDayIndex(getDayIndex(anyProps.dayIndex));
    setLocalHours(getHours(anyProps.hours));
    setLocalMinutes(getMinutes(anyProps.minutes));
  }, [anyProps.hours, anyProps.minutes, anyProps.dayIndex]);
  const onInnerChangeDay = React.useCallback(dayIndex => {
    onChange && onChange({
      dayIndex: dayIndex,
      hours: localHours,
      minutes: localMinutes
    });
    setLocalDayIndex(dayIndex);
  }, [localHours, localMinutes, onChange]);
  const onFocusInput = React.useCallback(type => setFocused(type), []);
  const onChangeClock = React.useCallback(params => {
    if (params.focused) {
      setFocused(params.focused);
    }
    setLocalHours(params.hours);
    setLocalMinutes(params.minutes);
  }, [setFocused, setLocalHours, setLocalMinutes]);
  const onInnerChangeClock = React.useCallback(params => {
    params.hours = (0, _timeUtils.toHourOutputFormat)(params.hours, localHours, true);
    onChangeClock(params);
  }, [localHours, onChangeClock]);
  const onInnerConfirm = React.useCallback(() => {
    onConfirm({
      dayIndex: localDayIndex,
      hours: localHours,
      minutes: localMinutes
    });
  }, [onConfirm, localDayIndex, localHours, localMinutes]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(_DatePickerModalHeaderBackground.default, null, /*#__PURE__*/React.createElement(_DatePickerModalHeader.default, {
    locale: locale,
    onSave: onInnerConfirm,
    isLoading: props.isLoading,
    onDismiss: onDismiss,
    saveLabel: props.saveLabel,
    saveLabelDisabled: props.saveLabelDisabled || false,
    uppercase: props.uppercase || true,
    disableSafeTop: disableSafeTop,
    closeIcon: props.closeIcon,
    hideSaveButton: true
  }), /*#__PURE__*/React.createElement(_DayTimePickerModalContentHeader.default, {
    dayIndex: localDayIndex,
    hours: localHours,
    minutes: localMinutes,
    duration: anyProps.duration,
    mode: "single",
    collapsed: true,
    headerSeparator: props.headerSeparator,
    emptyLabel: props.emptyLabel,
    label: props.label,
    moreLabel: props.moreLabel,
    startLabel: props.startLabel,
    endLabel: props.endLabel,
    uppercase: props.uppercase || true,
    locale: locale,
    showSaveButton: true,
    saveLabel: props.saveLabel,
    saveLabelDisabled: props.saveLabelDisabled || false,
    isLoading: props.isLoading,
    onSave: onInnerConfirm
  })), !hideDayPicker ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: !hideDayPicker ? {
      flexDirection: 'row',
      marginTop: 32
    } : {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, Array.from(Array(7)).map((_, index) => {
    // required for Monday to show first
    const adjustedIndex = index < 6 ? index + 1 : 0;
    return /*#__PURE__*/React.createElement(_DayOfWeek.default, {
      dayIndex: adjustedIndex,
      selected: localDayIndex === adjustedIndex,
      onPressDay: onInnerChangeDay,
      primaryColor: "#0B6327",
      disabled: false,
      textColorOnPrimary: "#fff"
    });
  })) : null, !hideTimePicker ? /*#__PURE__*/React.createElement(_TimePicker.DisplayModeContext.Provider, {
    value: {
      mode: displayMode,
      setMode: setDisplayMode
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: isLandscape ? styles.rootLandscape : styles.rootPortrait
  }, /*#__PURE__*/React.createElement(_TimeInputs.default, {
    inputType: 'keyboard',
    hours: localHours,
    minutes: localMinutes,
    is24Hour: true,
    onChange: onChangeClock,
    onFocusInput: onFocusInput,
    focused: focused
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.clockContainer
  }, /*#__PURE__*/React.createElement(_AnalogClock.default, {
    hours: (0, _timeUtils.toHourInputFormat)(localHours, true),
    minutes: localMinutes,
    focused: focused,
    is24Hour: true,
    onChange: onInnerChangeClock
  })))) : null);
}
function getMinutes(minutes) {
  return minutes === undefined || minutes === null ? new Date().getMinutes() : minutes;
}
function getHours(hours) {
  return hours === undefined || hours === null ? new Date().getHours() : hours;
}
function getDayIndex(dayIndex) {
  return dayIndex === undefined || dayIndex === null || dayIndex < 0 || dayIndex > 6 ? 0 : dayIndex;
}
const styles = _reactNative.StyleSheet.create({
  rootLandscape: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24 * 3 + 96 * 2 + _timeUtils.circleSize
  },
  rootPortrait: {},
  clockContainer: {
    padding: 12
  }
});
var _default = /*#__PURE__*/React.memo(DateTimePickerModalContent);
exports.default = _default;
//# sourceMappingURL=DayTimePickerModalContent.js.map