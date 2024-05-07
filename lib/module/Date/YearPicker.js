import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import { range } from '../utils';
const ITEM_HEIGHT = 62;
export default function YearPicker(_ref) {
  let {
    selectedYear,
    selectingYear,
    onPressYear,
    startYear,
    endYear
  } = _ref;
  const theme = useTheme();
  const flatList = React.useRef(null);
  const years = range(isNaN(startYear) ? 1800 : startYear, isNaN(endYear) ? 2200 : endYear); // scroll to selected year

  React.useEffect(() => {
    if (flatList.current && selectedYear) {
      const indexToGo = selectedYear - startYear;
      flatList.current.scrollToOffset({
        offset: indexToGo / 3 * ITEM_HEIGHT - ITEM_HEIGHT,
        animated: false
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [flatList, selectedYear]);
  return /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, styles.root, {
      backgroundColor: theme.colors.surface
    }, selectingYear ? styles.opacity1 : styles.opacity0],
    pointerEvents: selectingYear ? 'auto' : 'none'
  }, /*#__PURE__*/React.createElement(FlatList, {
    ref: flatList,
    style: styles.list,
    data: years,
    renderItem: _ref2 => {
      let {
        item
      } = _ref2;
      return /*#__PURE__*/React.createElement(Year, {
        year: item,
        selected: selectedYear === item,
        onPressYear: onPressYear
      });
    },
    keyExtractor: item => `${item}`,
    numColumns: 3
  }));
}

function YearPure(_ref3) {
  let {
    year,
    selected,
    onPressYear
  } = _ref3;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.year
  }, /*#__PURE__*/React.createElement(TouchableRipple, {
    onPress: () => onPressYear(year),
    accessibilityRole: "button",
    accessibilityLabel: String(year),
    style: styles.yearButton
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.yearInner, selected ? {
      backgroundColor: '#0B3C29'
    } : null]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.yearLabel, selected ? styles.selectedYear : null, {
      fontFamily: 'Poppins-SemiBold'
    }],
    selectable: false
  }, year))));
}

const Year = /*#__PURE__*/React.memo(YearPure);
const styles = StyleSheet.create({
  root: {
    flex: 1,
    top: 56,
    zIndex: 100
  },
  list: {
    flex: 1
  },
  year: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    height: ITEM_HEIGHT,
    justifyContent: 'center'
  },
  selectedYear: {
    color: '#fff'
  },
  yearButton: {
    borderRadius: 46 / 2,
    overflow: 'hidden'
  },
  yearInner: {
    borderRadius: 46 / 2,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center'
  },
  yearLabel: {
    fontSize: 16
  },
  opacity0: {
    opacity: 0
  },
  opacity1: {
    opacity: 1
  }
});
//# sourceMappingURL=YearPicker.js.map