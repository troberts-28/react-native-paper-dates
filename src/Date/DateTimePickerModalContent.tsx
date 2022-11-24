import * as React from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'

import Calendar, {
  BaseCalendarProps,
  CalendarDate,
  CalendarDates,
} from './Calendar'
import DatePickerModalHeader from './DatePickerModalHeader'
import DateTimePickerModalContentHeader, {
  HeaderPickProps,
} from './DateTimePickerModalContentHeader'
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

type onChangeFunc = ({
  hours,
  minutes,
  focused,
}: {
  hours: number
  minutes: number
  focused?: undefined | PossibleClockTypes
}) => any

export type LocalState = {
  startDate: CalendarDate
  endDate: CalendarDate
  date: CalendarDate
  dates: CalendarDates
}

export interface DateTimePickerModalContentProps
  extends HeaderPickProps,
    BaseCalendarProps {
  inputFormat?: string
  locale: string
  onDismiss: () => any
  disableSafeTop?: boolean
  saveLabelDisabled?: boolean
  date?: CalendarDate
  hours?: number | undefined
  minutes?: number | undefined
  duration?: number | undefined | null
  isLoading?: boolean
  onChange?: (params: {
    date: CalendarDate
    hours: number
    minutes: number
  }) => void
  onConfirm: (params: {
    date: CalendarDate
    hours: number
    minutes: number
  }) => void
  dateMode?: 'start' | 'end'
}

export function DatePickerModalContent(props: DateTimePickerModalContentProps) {
  const {
    onChange,
    onConfirm,
    onDismiss,
    disableSafeTop,
    disableWeekDays,
    locale,
    validRange,
    dateMode,
    startYear,
    endYear,
  } = props

  const anyProps = props as any

  const dimensions = useWindowDimensions()
  const isLandscape = dimensions.width > dimensions.height

  // use local state to add only onConfirm state changes
  const [state, setState] = React.useState<LocalState>({
    date: anyProps.date,
    startDate: anyProps.startDate,
    endDate: anyProps.endDate,
    dates: anyProps.dates,
  })
  const [focused, setFocused] = React.useState<PossibleClockTypes>(
    clockTypes.hours
  )
  const [localHours, setLocalHours] = React.useState<number>(anyProps.hours)
  const [localMinutes, setLocalMinutes] = React.useState<number>(
    getMinutes(anyProps.minutes)
  )

  // update local state if changed from outside or if modal is opened
  React.useEffect(() => {
    setState({
      date: anyProps.date,
      startDate: anyProps.startDate,
      endDate: anyProps.endDate,
      dates: anyProps.dates,
    })
    setLocalHours(getHours(anyProps.hours))
    setLocalMinutes(getMinutes(anyProps.minutes))
  }, [
    anyProps.date,
    anyProps.startDate,
    anyProps.endDate,
    anyProps.dates,
    anyProps.hours,
    anyProps.minutes,
  ])

  const onInnerChangeDate = React.useCallback(
    (params: any) => {
      onChange && onChange(params)
      setState((prev) => ({ ...prev, ...params }))
    },
    [onChange, setState]
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
    onConfirm({ date: state.date, hours: localHours, minutes: localMinutes })
  }, [onConfirm, state.date, localHours, localMinutes])

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
        <DateTimePickerModalContentHeader
          state={state}
          hours={localHours}
          minutes={localMinutes}
          mode="single"
          duration={anyProps.duration}
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

      <Calendar
        locale={locale}
        mode="single"
        startDate={state.startDate}
        endDate={state.endDate}
        date={state.date}
        onChange={onInnerChangeDate}
        disableWeekDays={disableWeekDays}
        dates={state.dates}
        validRange={validRange}
        dateMode={dateMode}
        startYear={startYear}
        endYear={endYear}
      />

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

export default React.memo(DatePickerModalContent)
