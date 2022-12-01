import * as React from 'react'
import { View, StyleSheet } from 'react-native'

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
import { SwitchButton } from '../Time/AmPmSwitcher'
import TimeInputs from '../Time/TimeInputs'
import { useTheme } from 'react-native-paper'

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
  canChooseEndTime?: boolean
  isLoading?: boolean
  onConfirm: (params: { date: CalendarDate; duration?: number }) => void
  dateMode?: 'start' | 'end'
}

export function DatePickerModalContent(props: DateTimePickerModalContentProps) {
  const {
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

  const theme = useTheme()

  const anyProps = props as any

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
  const [isStart, setIsStart] = React.useState(true)

  // update local state if changed from outside or if modal is opened
  React.useEffect(() => {
    const date = anyProps.date
    date?.setHours(getHours(anyProps.hours))
    date?.setMinutes(getMinutes(anyProps.minutes))

    let endDate: Date | undefined
    if (anyProps.duration && date) {
      endDate = new Date(date.getTime() + anyProps.duration * 60000)
    }
    setState({
      date: date,
      startDate: anyProps.startDate,
      endDate: endDate ?? anyProps.endDate,
      dates: anyProps.dates,
    })
  }, [
    anyProps.date,
    anyProps.startDate,
    anyProps.endDate,
    anyProps.dates,
    anyProps.hours,
    anyProps.minutes,
    anyProps.duration,
  ])

  const onInnerChangeDate = React.useCallback(
    (params: { date: CalendarDate }) => {
      const date = params.date
      if (state.date) {
        date?.setHours(state.date.getHours())
        date?.setMinutes(state.date.getMinutes())
      }
      const endDate = params.date
      if (state.endDate) {
        endDate?.setHours(state.endDate.getHours())
        endDate?.setMinutes(state.endDate.getMinutes())
      }

      setState((prev) => ({
        ...prev,
        ...{
          date: date,
          endDate: anyProps.canChooseEndTime ? endDate : undefined,
        },
      }))
    },
    [anyProps.canChooseEndTime, state.date, state.endDate]
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

      const date = isStart ? state.date : state.endDate
      date?.setHours(params.hours)
      date?.setMinutes(params.minutes)

      setState((prev) => ({
        ...prev,
        ...(isStart ? { date: date } : { endDate: date }),
      }))
    },
    [isStart, state.date, state.endDate]
  )

  const onInnerChangeClock = React.useCallback<onChangeFunc>(
    (params: any) => {
      params.hours = toHourOutputFormat(
        params.hours,
        isStart
          ? state?.date?.getHours() ?? 0
          : state?.endDate?.getHours() ?? 0,
        true
      )
      onChangeClock(params)
    },
    [isStart, onChangeClock, state?.date, state?.endDate]
  )

  const onInnerConfirm = React.useCallback(() => {
    onConfirm({
      date: state.date,
      duration:
        state.endDate && state.date
          ? Math.round((state.endDate.getTime() - state.date.getTime()) / 60000)
          : undefined,
    })
  }, [onConfirm, state.date, state.endDate])

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
          saveLabelDisabled={
            props.saveLabelDisabled ||
            (anyProps.canChooseEndTime && state.endDate && state.date
              ? state.endDate < anyProps.startDate
              : false)
          }
          uppercase={props.uppercase || true}
          disableSafeTop={disableSafeTop}
          closeIcon={props.closeIcon}
          hideSaveButton
        />
        <DateTimePickerModalContentHeader
          state={state}
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
          saveLabelDisabled={
            props.saveLabelDisabled ||
            (anyProps.canChooseEndTime && state.endDate && state.date
              ? state.endDate < anyProps.startDate
              : false)
          }
          isLoading={props.isLoading}
          onSave={onInnerConfirm}
        />
      </DatePickerModalHeaderBackground>

      <View style={styles.root}>
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

        <View style={styles.timeContainer}>
          <View
            style={[
              styles.switchContainer,
              {
                borderColor: '#0B6327',
                borderRadius: theme.roundness,
              },
            ]}
          >
            <SwitchButton
              label="Start"
              onPress={() => {
                setIsStart(true)
              }}
              selected={isStart}
              disabled={isStart}
            />
            <View
              style={[styles.switchSeparator, { backgroundColor: '#0B6327' }]}
            />
            <SwitchButton
              label="End"
              onPress={() => {
                setIsStart(false)
              }}
              selected={!isStart}
              disabled={!isStart}
            />
          </View>
          <TimeInputs
            inputType={'picker'}
            hours={
              isStart
                ? state.date?.getHours() ?? 0
                : state.endDate?.getHours() ?? 0
            }
            minutes={
              isStart
                ? state.date?.getMinutes() ?? 0
                : state.endDate?.getMinutes() ?? 0
            }
            is24Hour
            onChange={onChangeClock}
            onFocusInput={onFocusInput}
            focused={focused}
          />
          <View style={styles.clockContainer}>
            <AnalogClock
              hours={
                isStart
                  ? toHourInputFormat(state.date?.getHours() ?? 0, true)
                  : toHourInputFormat(state.endDate?.getHours() ?? 0, true)
              }
              minutes={
                isStart
                  ? state.date?.getMinutes() ?? 0
                  : state.endDate?.getMinutes() ?? 0
              }
              focused={focused}
              is24Hour
              onChange={onInnerChangeClock}
            />
          </View>
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
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400 + circleSize,
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 90,
  },
  clockContainer: { paddingTop: 40 },
  switchContainer: {
    width: 120,
    height: 40,
    borderWidth: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 25,
  },
  switchSeparator: {
    height: 38,
    width: 1,
  },
  switchButton: {
    flex: 1,
  },
  switchButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default React.memo(DatePickerModalContent)
