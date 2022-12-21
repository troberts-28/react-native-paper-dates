import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Calendar from './Calendar';
import DatePickerModalHeader from './DatePickerModalHeader';
import DateTimePickerModalContentHeader from './DateTimePickerModalContentHeader';
import DatePickerModalHeaderBackground from './DatePickerModalHeaderBackground';
import AnalogClock from '../Time/AnalogClock';
import { toHourInputFormat, toHourOutputFormat, circleSize, clockTypes } from '../Time/timeUtils';
import { SwitchButton } from '../Time/AmPmSwitcher';
import TimeInputs from '../Time/TimeInputs';
import { useTheme } from 'react-native-paper';
export function DatePickerModalContent(props) {
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
  const theme = useTheme();
  const anyProps = props; // use local state to add only onConfirm state changes

  const [state, setState] = React.useState({
    date: anyProps.date,
    startDate: anyProps.startDate,
    endDate: anyProps.endDate,
    dates: anyProps.dates
  });
  const [focused, setFocused] = React.useState(clockTypes.hours);
  const [isStart, setIsStart] = React.useState(true); // update local state if changed from outside or if modal is opened

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

    setState(prev => ({ ...prev,
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
    setState(prev => ({ ...prev,
      ...(isStart ? {
        date: date
      } : {
        endDate: date
      })
    }));
  }, [isStart, state.date, state.endDate]);
  const onInnerChangeClock = React.useCallback(params => {
    var _state$date, _state$endDate;

    params.hours = toHourOutputFormat(params.hours, isStart ? (state === null || state === void 0 ? void 0 : (_state$date = state.date) === null || _state$date === void 0 ? void 0 : _state$date.getHours()) ?? 0 : (state === null || state === void 0 ? void 0 : (_state$endDate = state.endDate) === null || _state$endDate === void 0 ? void 0 : _state$endDate.getHours()) ?? 0, true);
    onChangeClock(params);
  }, [isStart, onChangeClock, state === null || state === void 0 ? void 0 : state.date, state === null || state === void 0 ? void 0 : state.endDate]);
  const onInnerConfirm = React.useCallback(() => {
    onConfirm({
      date: state.date,
      duration: state.endDate && state.date ? Math.round((state.endDate.getTime() - state.date.getTime()) / 60000) : undefined
    });
  }, [onConfirm, state.date, state.endDate]);
  return /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(DatePickerModalHeaderBackground, null, /*#__PURE__*/React.createElement(DatePickerModalHeader, {
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
  }), /*#__PURE__*/React.createElement(DateTimePickerModalContentHeader, {
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
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.calendarContainer
  }, /*#__PURE__*/React.createElement(Calendar, {
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
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.timeContainer
  }, anyProps.canChooseEndTime ? /*#__PURE__*/React.createElement(View, {
    style: [styles.switchContainer, {
      borderColor: '#0B6327',
      borderRadius: theme.roundness
    }]
  }, /*#__PURE__*/React.createElement(SwitchButton, {
    label: "Start",
    onPress: () => {
      setIsStart(true);
      setFocused('hours');
    },
    selected: isStart,
    disabled: isStart
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.switchSeparator, {
      backgroundColor: '#0B6327'
    }]
  }), /*#__PURE__*/React.createElement(SwitchButton, {
    label: "End",
    onPress: () => {
      setIsStart(false);
      setFocused('hours');
    },
    selected: !isStart,
    disabled: !isStart
  })) : null, /*#__PURE__*/React.createElement(TimeInputs, {
    inputType: 'picker',
    hours: isStart ? ((_state$date2 = state.date) === null || _state$date2 === void 0 ? void 0 : _state$date2.getHours()) ?? 0 : ((_state$endDate2 = state.endDate) === null || _state$endDate2 === void 0 ? void 0 : _state$endDate2.getHours()) ?? 0,
    minutes: isStart ? ((_state$date3 = state.date) === null || _state$date3 === void 0 ? void 0 : _state$date3.getMinutes()) ?? 0 : ((_state$endDate3 = state.endDate) === null || _state$endDate3 === void 0 ? void 0 : _state$endDate3.getMinutes()) ?? 0,
    is24Hour: true,
    onChange: onChangeClock,
    onFocusInput: onFocusInput,
    focused: focused
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.clockContainer
  }, /*#__PURE__*/React.createElement(AnalogClock, {
    hours: isStart ? toHourInputFormat(((_state$date4 = state.date) === null || _state$date4 === void 0 ? void 0 : _state$date4.getHours()) ?? 0, true) : toHourInputFormat(((_state$endDate4 = state.endDate) === null || _state$endDate4 === void 0 ? void 0 : _state$endDate4.getHours()) ?? 0, true),
    minutes: isStart ? ((_state$date5 = state.date) === null || _state$date5 === void 0 ? void 0 : _state$date5.getMinutes()) ?? 0 : ((_state$endDate5 = state.endDate) === null || _state$endDate5 === void 0 ? void 0 : _state$endDate5.getMinutes()) ?? 0,
    focused: focused,
    is24Hour: true,
    onChange: onInnerChangeClock
  })))));
}

function getMinutes(minutes) {
  return minutes === undefined || minutes === null ? new Date().getMinutes() : minutes;
}

function getHours(hours) {
  return hours === undefined || hours === null ? new Date().getHours() : hours;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400 + circleSize
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
export default /*#__PURE__*/React.memo(DatePickerModalContent);
//# sourceMappingURL=DateTimePickerModalContent.js.map