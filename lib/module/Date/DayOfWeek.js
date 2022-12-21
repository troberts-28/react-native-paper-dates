import * as React from 'react';
import { Text, TouchableRipple } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { daySize } from './dateUtils';

function EmptyDayPure() {
  return /*#__PURE__*/React.createElement(View, {
    style: styles.empty
  });
}

export const EmptyDay = /*#__PURE__*/React.memo(EmptyDayPure);
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
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.root, disabled && styles.disabled]
  }, /*#__PURE__*/React.createElement(TouchableRipple, {
    testID: `react-native-paper-dates-day-${dayIndex}`,
    disabled: disabled,
    borderless: true,
    onPress: disabled ? undefined : onPress,
    style: [styles.button],
    accessibilityRole: "button"
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.day, selected ? {
      backgroundColor: primaryColor
    } : null]
  }, /*#__PURE__*/React.createElement(Text, {
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

const styles = StyleSheet.create({
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
    width: daySize,
    height: daySize,
    overflow: 'hidden',
    borderRadius: daySize / 2
  },
  day: {
    flexBasis: 0,
    flex: 1,
    borderRadius: daySize / 2,
    width: daySize,
    height: daySize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent'
  },
  flex1: {
    flex: 1
  }
});
export default /*#__PURE__*/React.memo(DayOfWeek);
//# sourceMappingURL=DayOfWeek.js.map