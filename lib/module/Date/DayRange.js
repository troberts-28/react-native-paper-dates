import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { calendarDaySize } from './dateUtils';

function DayRange(_ref) {
  let {
    leftCrop,
    rightCrop,
    inRange,
    selectColor
  } = _ref;
  const bothWays = inRange && leftCrop && rightCrop;
  const isCrop = inRange && (leftCrop || rightCrop) && !(leftCrop && rightCrop);

  if (inRange || isCrop) {
    return /*#__PURE__*/React.createElement(View, {
      pointerEvents: "none",
      style: [StyleSheet.absoluteFill, styles.rangeRoot, bothWays && styles.rangeRootBoth, inRange && !isCrop ? {
        backgroundColor: selectColor
      } : null]
    }, isCrop && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
      style: [styles.flex1, rightCrop ? {
        backgroundColor: selectColor
      } : null]
    }), /*#__PURE__*/React.createElement(View, {
      style: [{
        backgroundColor: selectColor,
        minWidth: calendarDaySize,
        minHeight: calendarDaySize
      }, leftCrop ? styles.leftRadius : null, rightCrop ? styles.rightRadius : null]
    }), /*#__PURE__*/React.createElement(View, {
      style: [styles.flex1, leftCrop ? {
        backgroundColor: selectColor
      } : null]
    })));
  }

  return null;
}

const styles = StyleSheet.create({
  leftRadius: {
    borderBottomLeftRadius: calendarDaySize / 2,
    borderTopLeftRadius: calendarDaySize / 2
  },
  rightRadius: {
    borderBottomRightRadius: calendarDaySize / 2,
    borderTopRightRadius: calendarDaySize / 2
  },
  rangeRootBoth: {
    borderRadius: calendarDaySize / 2
  },
  flex1: {
    flex: 1
  },
  rangeRoot: {
    flexDirection: 'row'
  }
});
export default /*#__PURE__*/React.memo(DayRange);
//# sourceMappingURL=DayRange.js.map