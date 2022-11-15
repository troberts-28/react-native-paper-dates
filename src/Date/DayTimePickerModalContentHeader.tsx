import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, IconButton, Text } from 'react-native-paper'
import type { ModeType } from './Calendar'
import { useHeaderTextColor } from '../utils'
import Color from 'color'
import { getTranslation } from '../translations/utils'

export interface HeaderPickProps {
  moreLabel?: string
  label?: string
  emptyLabel?: string
  saveLabel?: string
  uppercase?: boolean
  headerSeparator?: string
  startLabel?: string
  endLabel?: string
  editIcon?: string
  calendarIcon?: string
  closeIcon?: string
}

export interface HeaderContentProps extends HeaderPickProps {
  dayIndex: number
  hours: number
  minutes: number
  mode: ModeType
  collapsed: boolean
  onToggle?: () => any
  locale: string | undefined
  showSaveButton?: boolean
  saveLabel?: string
  saveLabelDisabled?: boolean
  onSave?: () => void
}

function getLabel(
  locale: string | undefined,
  mode: ModeType,
  configuredLabel?: string
) {
  if (configuredLabel) {
    return configuredLabel
  }
  if (mode === 'range') {
    return getTranslation(locale, 'selectRange')
  }
  if (mode === 'multiple') {
    return getTranslation(locale, 'selectMultiple')
  }
  if (mode === 'single') {
    return getTranslation(locale, 'selectSingle')
  }
  return '...?'
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function DayTimePickerModalContentHeader(
  props: HeaderContentProps
) {
  const {
    onToggle,
    collapsed,
    mode,
    editIcon = 'pencil',
    calendarIcon = 'calendar',
  } = props

  const saveLabel = props.saveLabel || getTranslation(props.locale, 'save')

  const label = getLabel(props.locale, props.mode, props.label)

  const color = useHeaderTextColor()
  const allowEditing = mode !== 'multiple'
  return (
    <View style={[styles.header]}>
      <View>
        <Text style={[styles.label, { color, fontFamily: 'Poppins-SemiBold' }]}>
          {label}
        </Text>
        <View style={styles.headerContentContainer}>
          <HeaderContentSingle {...props} color={color} />
        </View>
      </View>
      <View style={styles.fill} />
      {allowEditing && onToggle ? (
        <IconButton
          size={32}
          icon={collapsed ? editIcon : calendarIcon}
          accessibilityLabel={
            collapsed
              ? getTranslation(props.locale, 'typeInDate')
              : getTranslation(props.locale, 'pickDateFromCalendar')
          }
          color={color}
          onPress={onToggle}
        />
      ) : null}
      {props.showSaveButton ? (
        <Button
          color={color}
          onPress={props.onSave}
          disabled={props.saveLabelDisabled || false}
          uppercase={false}
          labelStyle={{ fontFamily: 'Poppins-SemiBold', fontSize: 25 }}
          testID="react-native-paper-dates-save"
        >
          {saveLabel}
        </Button>
      ) : null}
    </View>
  )
}

export function HeaderContentSingle({
  dayIndex,
  hours,
  minutes,
  color,
  locale,
}: HeaderContentProps & { color: string }) {
  const lighterColor = Color(color).fade(0.5).rgb().toString()
  const dateColor = dayIndex ? color : lighterColor

  const formatter = React.useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })
  }, [locale])

  let time
  if (hours && minutes) {
    time = new Date()
    time.setHours(hours)
    time.setMinutes(minutes)
  }

  return (
    <Text
      style={[
        styles.singleHeaderText,
        { color: dateColor, fontFamily: 'Poppins-SemiBold' },
      ]}
    >
      {`${daysOfWeek[dayIndex]} ${time ? formatter.format(time) : ''}`}
    </Text>
  )
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  animated: {
    paddingBottom: 0,
    elevation: 4,
  },
  safeContent: {
    paddingBottom: 0,
  },
  header: {
    height: 75,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 12,
  },
  headerContentContainer: { marginTop: 5, flexDirection: 'row' },
  label: { color: '#fff', letterSpacing: 1, fontSize: 13 },
  singleHeaderText: { color: '#fff', fontSize: 25 },
  rangeHeaderText: { color: '#fff', fontSize: 25 },
  excludeInRangeHeaderText: { fontSize: 25 },
  excludeInRangeHeaderTextSmall: {
    fontSize: 14,
    marginTop: -3,
    marginLeft: 3,
  },

  headerSeparator: {
    color: 'rgba(255,255,255,1)',
    fontSize: 25,
    paddingLeft: 6,
    paddingRight: 6,
  },
  appbarHeader: {
    elevation: 0,
  },
  column: { flexDirection: 'column' },
  row: { flexDirection: 'row' },
})
