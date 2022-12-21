"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderContentSingle = HeaderContentSingle;
exports.default = DayTimePickerModalContentHeader;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativePaper = require("react-native-paper");

var _utils = require("../utils");

var _utils2 = require("../translations/utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function getLabel(locale, mode, configuredLabel) {
  if (configuredLabel) {
    return configuredLabel;
  }

  if (mode === 'range') {
    return (0, _utils2.getTranslation)(locale, 'selectRange');
  }

  if (mode === 'multiple') {
    return (0, _utils2.getTranslation)(locale, 'selectMultiple');
  }

  if (mode === 'single') {
    return (0, _utils2.getTranslation)(locale, 'selectSingle');
  }

  return '...?';
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function DayTimePickerModalContentHeader(props) {
  const {
    onToggle,
    collapsed,
    mode,
    editIcon = 'pencil',
    calendarIcon = 'calendar'
  } = props;
  const saveLabel = props.saveLabel || (0, _utils2.getTranslation)(props.locale, 'save');
  const label = getLabel(props.locale, props.mode, props.label);
  const color = (0, _utils.useHeaderTextColor)();
  const allowEditing = mode !== 'multiple';
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.header]
  }, /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    style: [styles.label, {
      color,
      fontFamily: 'Poppins-SemiBold'
    }]
  }, label), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.headerContentContainer
  }, /*#__PURE__*/React.createElement(HeaderContentSingle, _extends({}, props, {
    color: color
  })))), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.fill
  }), allowEditing && onToggle ? /*#__PURE__*/React.createElement(_reactNativePaper.IconButton, {
    size: 32,
    icon: collapsed ? editIcon : calendarIcon,
    accessibilityLabel: collapsed ? (0, _utils2.getTranslation)(props.locale, 'typeInDate') : (0, _utils2.getTranslation)(props.locale, 'pickDateFromCalendar'),
    color: color,
    onPress: onToggle
  }) : null, props.showSaveButton ? /*#__PURE__*/React.createElement(_reactNativePaper.Button, {
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

function HeaderContentSingle(_ref) {
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
      hour12: false
    });
  }, [locale]);
  const time = new Date();
  time.setHours(hours);
  time.setMinutes(minutes);
  return /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    style: [styles.singleHeaderText, {
      color: color,
      fontFamily: 'Poppins-SemiBold'
    }]
  }, `${daysOfWeek[dayIndex]} ${formatter.format(time)}${duration ? ' - ' + formatter.format(new Date(time.getTime() + duration * 60000)) : ''}`);
}

const styles = _reactNative.StyleSheet.create({
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