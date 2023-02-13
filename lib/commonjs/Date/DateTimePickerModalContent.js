"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePickerModalContent = DatePickerModalContent;
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Calendar = _interopRequireDefault(require("./Calendar"));
var _DatePickerModalHeader = _interopRequireDefault(require("./DatePickerModalHeader"));
var _DateTimePickerModalContentHeader = _interopRequireDefault(require("./DateTimePickerModalContentHeader"));
var _DatePickerModalHeaderBackground = _interopRequireDefault(require("./DatePickerModalHeaderBackground"));
var _AnalogClock = _interopRequireDefault(require("../Time/AnalogClock"));
var _timeUtils = require("../Time/timeUtils");
var _AmPmSwitcher = require("../Time/AmPmSwitcher");
var _TimeInputs = _interopRequireDefault(require("../Time/TimeInputs"));
var _reactNativePaper = require("react-native-paper");
var _TimePicker = require("../Time/TimePicker");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function DatePickerModalContent(props) {
  var _state$date2, _state$endDate2, _state$date3, _state$endDate3, _state$date4, _state$endDate4, _state$date5, _state$endDate5;
  const {
    onConfirm,
    onDismiss,
    disableSafeTop,
    disableWeekDays,
    locale,
    validRange,
    dateMode,
    startYear,
    endYear
  } = props;
  const theme = (0, _reactNativePaper.useTheme)();
  const anyProps = props;

  // use local state to add only onConfirm state changes
  const [state, setState] = React.useState({
    date: anyProps.date,
    startDate: anyProps.startDate,
    endDate: anyProps.endDate,
    dates: anyProps.dates
  });
  const [focused, setFocused] = React.useState(_timeUtils.clockTypes.hours);
  const [isStart, setIsStart] = React.useState(true);

  // update local state if changed from outside or if modal is opened
  React.useEffect(() => {
    const date = anyProps.date;
    date === null || date === void 0 ? void 0 : date.setHours(getHours(anyProps.hours));
    date === null || date === void 0 ? void 0 : date.setMinutes(getMinutes(anyProps.minutes));
    let endDate;
    if (typeof anyProps.duration === 'number' && date) {
      endDate = new Date(date.getTime() + anyProps.duration * 60000);
    }
    setState({
      date: date,
      startDate: anyProps.startDate,
      endDate: endDate ?? anyProps.endDate,
      dates: anyProps.dates
    });
  }, [anyProps.date, anyProps.startDate, anyProps.endDate, anyProps.dates, anyProps.hours, anyProps.minutes, anyProps.duration]);
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
  const onInnerChangeDate = React.useCallback(params => {
    const date = params.date;
    if (typeof state.date !== 'undefined') {
      date === null || date === void 0 ? void 0 : date.setHours(state.date.getHours());
      date === null || date === void 0 ? void 0 : date.setMinutes(state.date.getMinutes());
    }
    let endDate;
    if (typeof state.endDate !== 'undefined') {
      var _endDate, _endDate2;
      endDate = params.date;
      (_endDate = endDate) === null || _endDate === void 0 ? void 0 : _endDate.setHours(state.endDate.getHours());
      (_endDate2 = endDate) === null || _endDate2 === void 0 ? void 0 : _endDate2.setMinutes(state.endDate.getMinutes());
    }
    setState(prev => ({
      ...prev,
      ...{
        date: date,
        endDate: endDate
      }
    }));
  }, [state.date, state.endDate]);
  const onFocusInput = React.useCallback(type => setFocused(type), []);
  const onChangeClock = React.useCallback(params => {
    if (params.focused) {
      setFocused(params.focused);
    }
    const date = isStart ? state.date : state.endDate;
    date === null || date === void 0 ? void 0 : date.setHours(params.hours);
    date === null || date === void 0 ? void 0 : date.setMinutes(params.minutes);
    setState(prev => ({
      ...prev,
      ...(isStart ? {
        date: date
      } : {
        endDate: date
      })
    }));
  }, [isStart, state.date, state.endDate]);
  const onInnerChangeClock = React.useCallback(params => {
    var _state$date, _state$endDate;
    params.hours = (0, _timeUtils.toHourOutputFormat)(params.hours, isStart ? (state === null || state === void 0 ? void 0 : (_state$date = state.date) === null || _state$date === void 0 ? void 0 : _state$date.getHours()) ?? 0 : (state === null || state === void 0 ? void 0 : (_state$endDate = state.endDate) === null || _state$endDate === void 0 ? void 0 : _state$endDate.getHours()) ?? 0, true);
    onChangeClock(params);
  }, [isStart, onChangeClock, state === null || state === void 0 ? void 0 : state.date, state === null || state === void 0 ? void 0 : state.endDate]);
  const onInnerConfirm = React.useCallback(() => {
    onConfirm({
      date: state.date,
      duration: state.endDate && state.date ? Math.round((state.endDate.getTime() - state.date.getTime()) / 60000) : undefined
    });
  }, [onConfirm, state.date, state.endDate]);
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
    saveLabelDisabled: anyProps.canChooseEndTime && state.endDate && state.date ? state.endDate.getTime() < state.date.getTime() : props.saveLabelDisabled || false,
    uppercase: props.uppercase || true,
    disableSafeTop: disableSafeTop,
    closeIcon: props.closeIcon,
    hideSaveButton: true
  }), /*#__PURE__*/React.createElement(_DateTimePickerModalContentHeader.default, {
    state: state,
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
    saveLabelDisabled: anyProps.canChooseEndTime && state.endDate && state.date ? state.endDate.getTime() < state.date.getTime() : props.saveLabelDisabled || false,
    isLoading: props.isLoading,
    onSave: onInnerConfirm
  })), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.calendarContainer
  }, /*#__PURE__*/React.createElement(_Calendar.default, {
    locale: locale,
    mode: "single",
    date: isStart ? state.date : state.endDate,
    onChange: onInnerChangeDate,
    disableWeekDays: disableWeekDays,
    dates: state.dates,
    validRange: validRange,
    dateMode: dateMode,
    startYear: startYear,
    endYear: endYear
  })), /*#__PURE__*/React.createElement(_TimePicker.DisplayModeContext.Provider, {
    value: {
      mode: displayMode,
      setMode: setDisplayMode
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.timeContainer
  }, anyProps.canChooseEndTime ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.switchContainer, {
      borderColor: '#0B6327',
      borderRadius: theme.roundness
    }]
  }, /*#__PURE__*/React.createElement(_AmPmSwitcher.SwitchButton, {
    label: "Start",
    onPress: () => {
      setIsStart(true);
      setFocused('hours');
    },
    selected: isStart,
    disabled: isStart
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.switchSeparator, {
      backgroundColor: '#0B6327'
    }]
  }), /*#__PURE__*/React.createElement(_AmPmSwitcher.SwitchButton, {
    label: "End",
    onPress: () => {
      setIsStart(false);
      setFocused('hours');
    },
    selected: !isStart,
    disabled: !isStart
  })) : null, /*#__PURE__*/React.createElement(_TimeInputs.default, {
    inputType: 'picker',
    hours: isStart ? ((_state$date2 = state.date) === null || _state$date2 === void 0 ? void 0 : _state$date2.getHours()) ?? 0 : ((_state$endDate2 = state.endDate) === null || _state$endDate2 === void 0 ? void 0 : _state$endDate2.getHours()) ?? 0,
    minutes: isStart ? ((_state$date3 = state.date) === null || _state$date3 === void 0 ? void 0 : _state$date3.getMinutes()) ?? 0 : ((_state$endDate3 = state.endDate) === null || _state$endDate3 === void 0 ? void 0 : _state$endDate3.getMinutes()) ?? 0,
    is24Hour: true,
    onChange: onChangeClock,
    onFocusInput: onFocusInput,
    focused: focused
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.clockContainer
  }, /*#__PURE__*/React.createElement(_AnalogClock.default, {
    hours: isStart ? (0, _timeUtils.toHourInputFormat)(((_state$date4 = state.date) === null || _state$date4 === void 0 ? void 0 : _state$date4.getHours()) ?? 0, true) : (0, _timeUtils.toHourInputFormat)(((_state$endDate4 = state.endDate) === null || _state$endDate4 === void 0 ? void 0 : _state$endDate4.getHours()) ?? 0, true),
    minutes: isStart ? ((_state$date5 = state.date) === null || _state$date5 === void 0 ? void 0 : _state$date5.getMinutes()) ?? 0 : ((_state$endDate5 = state.endDate) === null || _state$endDate5 === void 0 ? void 0 : _state$endDate5.getMinutes()) ?? 0,
    focused: focused,
    is24Hour: true,
    onChange: onInnerChangeClock
  }))))));
}
function getMinutes(minutes) {
  return minutes === undefined || minutes === null ? new Date().getMinutes() : minutes;
}
function getHours(hours) {
  return hours === undefined || hours === null ? new Date().getHours() : hours;
}
const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400 + _timeUtils.circleSize
  },
  calendarContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 90
  },
  clockContainer: {
    paddingTop: 40
  },
  switchContainer: {
    width: 120,
    height: 40,
    borderWidth: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 25
  },
  switchSeparator: {
    height: 38,
    width: 1
  },
  switchButton: {
    flex: 1
  },
  switchButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
var _default = /*#__PURE__*/React.memo(DatePickerModalContent);
exports.default = _default;
//# sourceMappingURL=DateTimePickerModalContent.js.map