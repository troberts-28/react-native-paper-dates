function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import { useHeaderTextColor } from '../utils';
import { getTranslation } from '../translations/utils';
function getLabel(locale, mode, configuredLabel) {
  if (configuredLabel) {
    return configuredLabel;
  }
  if (mode === 'range') {
    return getTranslation(locale, 'selectRange');
  }
  if (mode === 'multiple') {
    return getTranslation(locale, 'selectMultiple');
  }
  if (mode === 'single') {
    return getTranslation(locale, 'selectSingle');
  }
  return '...?';
}
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export default function DayTimePickerModalContentHeader(props) {
  const {
    onToggle,
    collapsed,
    mode,
    editIcon = 'pencil',
    calendarIcon = 'calendar'
  } = props;
  const saveLabel = props.saveLabel || getTranslation(props.locale, 'save');
  const label = getLabel(props.locale, props.mode, props.label);
  const color = useHeaderTextColor();
  const allowEditing = mode !== 'multiple';
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.header]
  }, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
    style: [styles.label, {
      color,
      fontFamily: 'Poppins-SemiBold'
    }]
  }, label), /*#__PURE__*/React.createElement(View, {
    style: styles.headerContentContainer
  }, /*#__PURE__*/React.createElement(HeaderContentSingle, _extends({}, props, {
    color: color
  })))), /*#__PURE__*/React.createElement(View, {
    style: styles.fill
  }), allowEditing && onToggle ? /*#__PURE__*/React.createElement(IconButton, {
    size: 32,
    icon: collapsed ? editIcon : calendarIcon,
    accessibilityLabel: collapsed ? getTranslation(props.locale, 'typeInDate') : getTranslation(props.locale, 'pickDateFromCalendar'),
    color: color,
    onPress: onToggle
  }) : null, props.showSaveButton ? /*#__PURE__*/React.createElement(Button, {
    color: color,
    onPress: props.onSave,
    disabled: props.saveLabelDisabled || false,
    uppercase: false,
    labelStyle: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 25
    },
    testID: "react-native-paper-dates-save",
    loading: props.isLoading
  }, saveLabel) : null);
}
export function HeaderContentSingle(_ref) {
  let {
    dayIndex,
    hours,
    minutes,
    duration,
    color,
    locale
  } = _ref;
  const formatter = React.useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23'
    });
  }, [locale]);
  const time = new Date();
  time.setHours(hours);
  time.setMinutes(minutes);
  return /*#__PURE__*/React.createElement(Text, {
    style: [styles.singleHeaderText, {
      color: color,
      fontFamily: 'Poppins-SemiBold'
    }]
  }, `${daysOfWeek[dayIndex]} ${formatter.format(time)}${duration ? ' - ' + formatter.format(new Date(time.getTime() + duration * 60000)) : ''}`);
}
const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  animated: {
    paddingBottom: 0,
    elevation: 4
  },
  safeContent: {
    paddingBottom: 0
  },
  header: {
    height: 75,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 12
  },
  headerContentContainer: {
    marginTop: 5,
    flexDirection: 'row'
  },
  label: {
    color: '#fff',
    letterSpacing: 1,
    fontSize: 13
  },
  singleHeaderText: {
    color: '#fff',
    fontSize: 25
  },
  rangeHeaderText: {
    color: '#fff',
    fontSize: 25
  },
  excludeInRangeHeaderText: {
    fontSize: 25
  },
  excludeInRangeHeaderTextSmall: {
    fontSize: 14,
    marginTop: -3,
    marginLeft: 3
  },
  headerSeparator: {
    color: 'rgba(255,255,255,1)',
    fontSize: 25,
    paddingLeft: 6,
    paddingRight: 6
  },
  appbarHeader: {
    elevation: 0
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  }
});
//# sourceMappingURL=DayTimePickerModalContentHeader.js.map