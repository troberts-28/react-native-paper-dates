import * as React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import DatePickerModalHeader from './DatePickerModalHeader';
import DayTimePickerModalContentHeader from './DayTimePickerModalContentHeader';
import DatePickerModalHeaderBackground from './DatePickerModalHeaderBackground';
import AnalogClock from '../Time/AnalogClock';
import { toHourInputFormat, toHourOutputFormat, circleSize, clockTypes } from '../Time/timeUtils';
import { DisplayModeContext } from '../Time/TimePicker';
import TimeInputs from '../Time/TimeInputs';
import DayOfWeek from './DayOfWeek';
export function DateTimePickerModalContent(props) {
  const {
    onChange,
    onConfirm,
    onDismiss,
    disableSafeTop,
    locale,
    hideDayPicker
  } = props;
  const anyProps = props;
  const dimensions = useWindowDimensions();
  const isLandscape = dimensions.width > dimensions.height;
  const [focused, setFocused] = React.useState(clockTypes.hours);
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
    params.hours = toHourOutputFormat(params.hours, localHours, true);
    onChangeClock(params);
  }, [localHours, onChangeClock]);
  const onInnerConfirm = React.useCallback(() => {
    onConfirm({
      dayIndex: localDayIndex,
      hours: localHours,
      minutes: localMinutes
    });
  }, [onConfirm, localDayIndex, localHours, localMinutes]);
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
    saveLabelDisabled: props.saveLabelDisabled || false,
    uppercase: props.uppercase || true,
    disableSafeTop: disableSafeTop,
    closeIcon: props.closeIcon,
    hideSaveButton: true
  }), /*#__PURE__*/React.createElement(DayTimePickerModalContentHeader, {
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
  })), !hideDayPicker ? /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      marginTop: 32
    }
  }, Array.from(Array(7)).map((_, index) => {
    // required for Monday to show first
    const adjustedIndex = index < 6 ? index + 1 : 0;
    return /*#__PURE__*/React.createElement(DayOfWeek, {
      dayIndex: adjustedIndex,
      selected: localDayIndex === adjustedIndex,
      onPressDay: onInnerChangeDay,
      primaryColor: "#0B6327",
      disabled: false,
      textColorOnPrimary: "#fff"
    });
  })) : null, /*#__PURE__*/React.createElement(DisplayModeContext.Provider, {
    value: {
      mode: displayMode,
      setMode: setDisplayMode
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: isLandscape ? styles.rootLandscape : styles.rootPortrait
  }, /*#__PURE__*/React.createElement(TimeInputs, {
    inputType: 'picker',
    hours: localHours,
    minutes: localMinutes,
    is24Hour: true,
    onChange: onChangeClock,
    onFocusInput: onFocusInput,
    focused: focused
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.clockContainer
  }, /*#__PURE__*/React.createElement(AnalogClock, {
    hours: toHourInputFormat(localHours, true),
    minutes: localMinutes,
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
function getDayIndex(dayIndex) {
  return dayIndex === undefined || dayIndex === null || dayIndex < 0 || dayIndex > 6 ? 0 : dayIndex;
}
const styles = StyleSheet.create({
  rootLandscape: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24 * 3 + 96 * 2 + circleSize
  },
  rootPortrait: {},
  clockContainer: {
    padding: 12
  }
});
export default /*#__PURE__*/React.memo(DateTimePickerModalContent);
//# sourceMappingURL=DayTimePickerModalContent.js.map