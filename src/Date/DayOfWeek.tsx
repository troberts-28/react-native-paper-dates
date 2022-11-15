import * as React from 'react'
import { Text, TouchableRipple } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { daySize } from './dateUtils'

function EmptyDayPure() {
  return <View style={styles.empty} />
}
export const EmptyDay = React.memo(EmptyDayPure)

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function DayOfWeek(props: {
  dayIndex: number
  selected: boolean
  onPressDay: (dayIndex: number) => any
  primaryColor: string
  disabled: boolean
  textColorOnPrimary: string
}) {
  const {
    dayIndex,
    selected,
    onPressDay,
    primaryColor,
    disabled,
    textColorOnPrimary,
  } = props

  const onPress = React.useCallback(() => {
    onPressDay(dayIndex)
  }, [onPressDay, dayIndex])

  const textColor = selected ? textColorOnPrimary : undefined

  return (
    <View style={[styles.root, disabled && styles.disabled]}>
      <TouchableRipple
        testID={`react-native-paper-dates-day-${dayIndex}`}
        disabled={disabled}
        borderless={true}
        onPress={disabled ? undefined : onPress}
        style={[styles.button]}
        accessibilityRole="button"
      >
        <View
          style={[
            styles.day,
            selected ? { backgroundColor: primaryColor } : null,
          ]}
        >
          <Text
            style={
              textColor
                ? { color: textColor, fontFamily: 'Poppins-SemiBold' }
                : { fontFamily: 'Poppins-SemiBold' }
            }
            selectable={false}
          >
            {daysOfWeek[dayIndex]}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  )
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    flexBasis: 0,
  },
  disabled: {
    opacity: 0.3,
  },
  root: {
    flexBasis: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  button: {
    width: daySize,
    height: daySize,
    overflow: 'hidden',
    borderRadius: daySize / 2,
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
    borderColor: 'transparent',
  },
  flex1: {
    flex: 1,
  },
})

export default React.memo(DayOfWeek)
