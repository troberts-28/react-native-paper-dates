import * as React from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'

import DatePickerModalHeader from './DatePickerModalHeader'
import DayTimePickerModalContentHeader, {
  HeaderPickProps,
} from './DayTimePickerModalContentHeader'
import DatePickerModalHeaderBackground from './DatePickerModalHeaderBackground'
import AnalogClock from '../Time/AnalogClock'
import {
  toHourInputFormat,
  toHourOutputFormat,
  circleSize,
  clockTypes,
  PossibleClockTypes,
} from '../Time/timeUtils'
import TimeInputs from '../Time/TimeInputs'
import DayOfWeek from './DayOfWeek'

type onChangeFunc = ({
  hours,
  minutes,
  focused,
}: {
  hours: number
  minutes: number
  focused?: undefined | PossibleClockTypes
}) => any

export interface DayTimePickerModalContentProps extends HeaderPickProps {
  inputFormat?: string
  locale: string
  onDismiss: () => any
  isLoading?: boolean
  disableSafeTop?: boolean
  saveLabelDisabled?: boolean
  dayIndex?: number | undefined
  hours?: number | undefined
  minutes?: number | undefined
  duration?: number | undefined | null
  onChange?: (params: {
    dayIndex: number
    hours: number
    minutes: number
  }) => void
  onConfirm: (params: {
    dayIndex: number
    hours: number
    minutes: number
  }) => void
}

export function DateTimePickerModalContent(
  props: DayTimePickerModalContentProps
) {
  const { onChange, onConfirm, onDismiss, disableSafeTop, locale } = props

  const anyProps = props as any

  const dimensions = useWindowDimensions()
  const isLandscape = dimensions.width > dimensions.height

  const [focused, setFocused] = React.useState<PossibleClockTypes>(
    clockTypes.hours
  )
  const [localHours, setLocalHours] = React.useState<number>(anyProps.hours)
  const [localMinutes, setLocalMinutes] = React.useState<number>(
    getMinutes(anyProps.minutes)
  )
  const [localDayIndex, setLocalDayIndex] = React.useState<number>(
    getDayIndex(anyProps.dayIndex)
  )

  // update local state if changed from outside or if modal is opened
  React.useEffect(() => {
    setLocalDayIndex(getDayIndex(anyProps.dayIndex))
    setLocalHours(getHours(anyProps.hours))
    setLocalMinutes(getMinutes(anyProps.minutes))
  }, [anyProps.hours, anyProps.minutes, anyProps.dayIndex])

  const onInnerChangeDay = React.useCallback(
    (dayIndex: number) => {
      onChange &&
        onChange({
          dayIndex: dayIndex,
          hours: localHours,
          minutes: localMinutes,
        })
      setLocalDayIndex(dayIndex)
    },
    [localHours, localMinutes, onChange]
  )

  const onFocusInput = React.useCallback(
    (type: PossibleClockTypes) => setFocused(type),
    []
  )
  const onChangeClock = React.useCallback(
    (params: {
      focused?: PossibleClockTypes | undefined
      hours: number
      minutes: number
    }) => {
      if (params.focused) {
        setFocused(params.focused)
      }

      setLocalHours(params.hours)
      setLocalMinutes(params.minutes)
    },
    [setFocused, setLocalHours, setLocalMinutes]
  )

  const onInnerChangeClock = React.useCallback<onChangeFunc>(
    (params: any) => {
      params.hours = toHourOutputFormat(params.hours, localHours, true)
      onChangeClock(params)
    },
    [localHours, onChangeClock]
  )

  const onInnerConfirm = React.useCallback(() => {
    onConfirm({
      dayIndex: localDayIndex,
      hours: localHours,
      minutes: localMinutes,
    })
  }, [onConfirm, localDayIndex, localHours, localMinutes])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <DatePickerModalHeaderBackground>
        <DatePickerModalHeader
          locale={locale}
          onSave={onInnerConfirm}
          isLoading={props.isLoading}
          onDismiss={onDismiss}
          saveLabel={props.saveLabel}
          saveLabelDisabled={props.saveLabelDisabled || false}
          uppercase={props.uppercase || true}
          disableSafeTop={disableSafeTop}
          closeIcon={props.closeIcon}
          hideSaveButton
        />
        <DayTimePickerModalContentHeader
          dayIndex={localDayIndex}
          hours={localHours}
          minutes={localMinutes}
          duration={anyProps.duration}
          mode="single"
          collapsed={true}
          headerSeparator={props.headerSeparator}
          emptyLabel={props.emptyLabel}
          label={props.label}
          moreLabel={props.moreLabel}
          startLabel={props.startLabel}
          endLabel={props.endLabel}
          uppercase={props.uppercase || true}
          locale={locale}
          showSaveButton
          saveLabel={props.saveLabel}
          saveLabelDisabled={props.saveLabelDisabled || false}
          isLoading={props.isLoading}
          onSave={onInnerConfirm}
        />
      </DatePickerModalHeaderBackground>

      <View style={{ flexDirection: 'row', marginTop: 32 }}>
        {Array.from(Array(7)).map((_, index) => {
          // required for Monday to show first
          const adjustedIndex = index < 6 ? index + 1 : 0
          return (
            <DayOfWeek
              dayIndex={adjustedIndex}
              selected={localDayIndex === adjustedIndex}
              onPressDay={onInnerChangeDay}
              primaryColor="#0B6327"
              disabled={false}
              textColorOnPrimary="#fff"
            />
          )
        })}
      </View>

      <View style={isLandscape ? styles.rootLandscape : styles.rootPortrait}>
        <TimeInputs
          inputType={'picker'}
          hours={localHours}
          minutes={localMinutes}
          is24Hour
          onChange={onChangeClock}
          onFocusInput={onFocusInput}
          focused={focused}
        />
        <View style={styles.clockContainer}>
          <AnalogClock
            hours={toHourInputFormat(localHours, true)}
            minutes={localMinutes}
            focused={focused}
            is24Hour
            onChange={onInnerChangeClock}
          />
        </View>
      </View>
    </View>
  )
}

function getMinutes(minutes: number | undefined | null): number {
  return minutes === undefined || minutes === null
    ? new Date().getMinutes()
    : minutes
}
function getHours(hours: number | undefined | null): number {
  return hours === undefined || hours === null ? new Date().getHours() : hours
}
function getDayIndex(dayIndex: number | undefined | null): number {
  return dayIndex === undefined ||
    dayIndex === null ||
    dayIndex < 0 ||
    dayIndex > 6
    ? 0
    : dayIndex
}

const styles = StyleSheet.create({
  rootLandscape: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24 * 3 + 96 * 2 + circleSize,
  },
  rootPortrait: {},
  clockContainer: { padding: 12 },
})

export default React.memo(DateTimePickerModalContent)
