import * as React from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Linking,
  Image,
  Animated,
  useColorScheme,
} from 'react-native'

import {
  Title,
  Button,
  Text,
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
  useTheme,
  overlay,
  Paragraph,
  Portal,
} from 'react-native-paper'

import {
  DatePickerModal,
  DatePickerModalContent,
  TimePickerModal,
  DatePickerInput,
  // @ts-ignore TODO: try to fix expo to work with local library
} from 'react-native-paper-dates'

function App() {
  const theme = useTheme()
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })
  const [inputDate, setInputDate] = React.useState<Date | undefined>(undefined)

  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [dates, setDates] = React.useState<Date[] | undefined>()
  const [range, setRange] = React.useState<{
    startDate: Date | undefined
    endDate: Date | undefined
  }>({ startDate: undefined, endDate: undefined })
  const [time, setTime] = React.useState<{
    hours: number | undefined
    minutes: number | undefined
  }>({ hours: undefined, minutes: undefined })
  const [timeOpen, setTimeOpen] = React.useState(false)
  const [rangeOpen, setRangeOpen] = React.useState(false)

  const [singleOpen, setSingleOpen] = React.useState(false)
  const [customOpen, setCustomOpen] = React.useState(false)
  const onDismissTime = React.useCallback(() => {
    setTimeOpen(false)
  }, [setTimeOpen])
  const [multiOpen, setMultiOpen] = React.useState(false)

  const onDismissRange = React.useCallback(() => {
    setRangeOpen(false)
  }, [setRangeOpen])

  const onDismissSingle = React.useCallback(() => {
    setSingleOpen(false)
  }, [setSingleOpen])

  const onDismissMulti = React.useCallback(() => {
    setMultiOpen(false)
  }, [])

  const onDismissCustom = React.useCallback(() => {
    setCustomOpen(false)
  }, [setCustomOpen])

  const onChangeRange = React.useCallback(
    ({ startDate, endDate }) => {
      setRangeOpen(false)
      setRange({ startDate, endDate })
    },
    [setRangeOpen, setRange]
  )

  const onChangeSingle = React.useCallback(
    (params) => {
      setSingleOpen(false)
      setDate(params.date)
    },
    [setSingleOpen, setDate]
  )

  const onChangeMulti = React.useCallback((params) => {
    setMultiOpen(false)
    setDates(params.dates)
    console.log('[on-change-multi]', params)
  }, [])

  const onConfirmTime = React.useCallback(
    ({ hours, minutes }) => {
      setTimeOpen(false)
      setTime({ hours, minutes })
    },
    [setTimeOpen, setTime]
  )

  // generate date from time
  let timeDate = new Date()
  time.hours !== undefined && timeDate.setHours(time.hours)
  time.minutes !== undefined && timeDate.setMinutes(time.minutes)

  const backgroundColor =
    theme.dark && theme.mode === 'adaptive'
      ? overlay(3, theme.colors.surface)
      : (theme.colors.surface as any)

  const pastDate = new Date(new Date().setDate(new Date().getDate() - 5))
  const futureDate = new Date(new Date().setDate(new Date().getDate() + 5))

  const locale = 'en-GB'
  return (
    <>
      <ScrollView
        style={[
          styles.root,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Image source={require('./schedule.png')} style={styles.logo} />
            <Title>react-native-paper-dates</Title>
          </View>

          <Paragraph>
            Smooth and fast cross platform Material Design date picker for React
            Native Paper brought to you by{' '}
            <Text
              onPress={() => Linking.openURL('https://webridge.nl')}
              style={styles.underline}
            >
              webRidge
            </Text>
          </Paragraph>
          <Paragraph>Example version: 0.9.0</Paragraph>
        </View>
        <View style={styles.content}>
          <Button
            uppercase={false}
            mode="contained"
            icon="github"
            style={styles.twitterButton}
            onPress={() =>
              Linking.openURL(
                'https://github.com/web-ridge/react-native-paper-dates'
              )
            }
          >
            GitHub
          </Button>
          <TwitterFollowButton userName={'RichardLindhout'} />
          <TwitterFollowButton userName={'web_ridge'} />
        </View>
        <Animated.View
          style={[
            styles.content,
            styles.contentShadow,
            {
              backgroundColor,
            },
          ]}
        >
          {/*<View style={styles.switchContainer}>*/}
          {/*  <Text style={[styles.switchLabel, { ...theme.fonts.medium }]}>*/}
          {/*    Dark mode (does not wo*/}
          {/*  </Text>*/}
          {/*  <View style={styles.switchSpace} />*/}
          {/*  <Switch value={dark} onValueChange={onToggleDarkMode} />*/}
          {/*</View>*/}
          {/*<Enter />*/}
          {/*<Enter />*/}
          {/*<Enter />*/}
          {/*<Enter />*/}
          <View>
            <Row>
              <Label>Input</Label>

              <DatePickerInput
                locale={locale}
                value={inputDate}
                onChange={setInputDate}
                inputMode="start"
                autoComplete={'birthdate-full'}
              />
            </Row>
            <Row>
              <Label>Date</Label>
              <Text>{date ? dateFormatter.format(date) : '-'}</Text>
            </Row>
            <Row>
              <Label>Range</Label>
              <Text>
                {[
                  range.startDate ? dateFormatter.format(range.startDate) : '',
                  range.endDate ? dateFormatter.format(range.endDate) : '',
                ].join(' - ')}
              </Text>
            </Row>
            <Row>
              <Label>Time</Label>
              <Text>
                {time && time.hours !== undefined && time.minutes !== undefined
                  ? timeFormatter.format(timeDate)
                  : '-'}
              </Text>
            </Row>
            <Row>
              <Label>Dates</Label>
              <Text>
                {dates
                  ?.map((d) => dateFormatter.format(d))
                  .filter(Boolean)
                  .join(', ') || '-'}
              </Text>
            </Row>
          </View>
          <Enter />
          <Enter />
          <View style={styles.buttons}>
            <Button
              onPress={() => setSingleOpen(true)}
              uppercase={false}
              mode="outlined"
              style={styles.pickButton}
            >
              Pick single date
            </Button>
            <View style={styles.buttonSeparator} />
            <Button
              onPress={() => setMultiOpen(true)}
              uppercase={false}
              mode="outlined"
              style={styles.pickButton}
            >
              Pick multiple dates
            </Button>
            <View style={styles.buttonSeparator} />
            <Button
              onPress={() => setRangeOpen(true)}
              uppercase={false}
              mode="outlined"
              style={styles.pickButton}
            >
              Pick range
            </Button>

            <View style={styles.buttonSeparator} />
            <Button
              onPress={() => setTimeOpen(true)}
              uppercase={false}
              mode="outlined"
              style={styles.pickButton}
            >
              Pick time
            </Button>
            <View style={styles.buttonSeparator} />
            <Button
              onPress={() => setCustomOpen(true)}
              uppercase={false}
              mode="outlined"
              style={styles.pickButton}
            >
              Custom modal
            </Button>
          </View>
          <Enter />
        </Animated.View>

        <Enter />
        <Enter />
        <Enter />
      </ScrollView>
      <Portal>
        {customOpen ? (
          <View style={[StyleSheet.absoluteFill, styles.customModal]}>
            <DatePickerModalContent
              locale={locale}
              mode="range"
              onDismiss={onDismissCustom}
              startDate={range.startDate}
              endDate={range.endDate}
              onConfirm={onChangeRange}
            />
          </View>
        ) : null}
      </Portal>

      <DatePickerModal
        locale={locale}
        mode="range"
        visible={rangeOpen}
        onDismiss={onDismissRange}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onChangeRange}
        // locale={'nl'} // optional
        // saveLabel="Save" // optional
        // uppercase={false} // optional, default is true
        // label="Select period" // optional
        // startLabel="From" // optional
        // endLabel="To" // optional
        // animationType="slide" // optional, default is slide on ios/android and none on web
        // startYear={2000} // optional, default is 1800
        // endYear={2100} // optional, default is 2200
      />

      <DatePickerModal
        locale={locale}
        mode="single"
        visible={singleOpen}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onChangeSingle}
        validRange={{
          startDate: pastDate,
          disabledDates: [futureDate],
          // startDate: new Date(2021, 1, 2), // optional
          // endDate: new Date(), // optional
        }}
        // saveLabel="Save" // optional
        // uppercase={false} // optional, default is true
        // label="Select date" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        // startYear={2000} // optional, default is 1800
        // endYear={2100} // optional, default is 2200
      />

      <DatePickerModal
        locale={locale}
        mode="multiple"
        visible={multiOpen}
        onDismiss={onDismissMulti}
        dates={dates}
        validRange={{
          startDate: new Date(),
        }}
        onConfirm={onChangeMulti}
        // moreLabel="more" // optional, if multiple are selected this will show if we can't show all dates
        // onChange={onChangeMulti}
        // saveLabel="Save" // optional
        // uppercase={false} // optional, default is true
        // label="Select date" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        // startYear={2000} // optional, default is 1800
        // endYear={2100} // optional, default is 2200
      />

      <TimePickerModal
        locale={locale}
        visible={timeOpen}
        onDismiss={onDismissTime}
        onConfirm={onConfirmTime}
        hours={time.hours} // optional, default: current hours
        minutes={time.minutes} // optional, default: current minutes
        // label="Select time" // optional, default 'Select time'
        // cancelLabel="Cancel" // optional, default: 'Cancel'
        // confirmLabel="Ok" // optional, default: 'Ok'
        // animationType="fade" // optional, default is 'none'
      />
    </>
  )
}

function Enter() {
  return <View style={styles.enter} />
}

function Row({ children }: { children: any }) {
  return <View style={styles.row}>{children}</View>
}

function Label({ children }: { children: string }) {
  const theme = useTheme()
  return (
    <Text style={[styles.label, { ...theme.fonts.medium }]}>{children}</Text>
  )
}

export default function AppWithProviders() {
  const dark = useColorScheme() === 'dark'

  return (
    <PaperProvider
      theme={
        dark
          ? {
              ...DarkTheme,
              roundness: 10,
              colors: {
                ...DarkTheme.colors,
                // primary: '#F59E00',
                // accent: '#FBBE5E',
              },
            }
          : {
              ...DefaultTheme,
              roundness: 10,
              colors: {
                ...DefaultTheme.colors,
                // primary: '#F59E00',
                // accent: '#FBBE5E',
              },
            }
      }
    >
      <App />
    </PaperProvider>
  )
}

function TwitterFollowButton({ userName }: { userName: string }) {
  return (
    <Button
      uppercase={false}
      mode="outlined"
      icon="twitter"
      style={styles.twitterButton}
      onPress={() => Linking.openURL(`https://twitter.com/${userName}`)}
    >
      @{userName}
    </Button>
  )
}

const styles = StyleSheet.create({
  underline: { textDecorationLine: 'underline' },
  logo: { width: 56, height: 56, marginRight: 24 },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  twitterButton: { marginBottom: 16 },
  root: { flex: 1 },
  content: {
    width: '100%',
    maxWidth: 500,
    marginTop: 24,
    padding: 24,
    alignSelf: 'center',
    // flex: 1,
  },
  contentInline: {
    padding: 0,
    height: 600,
  },
  contentShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
  },
  switchSpace: { flex: 1 },
  switchLabel: { fontSize: 16 },
  buttons: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 24 },
  pickButton: { marginTop: 6 },
  buttonSeparator: { width: 6 },
  enter: { height: 12 },
  label: { width: 100, fontSize: 16 },
  row: { paddingTop: 12, paddingBottom: 12, flexDirection: 'row' },
  customModal: {
    top: 12,
    left: 12,
    right: 12,
    bottom: 12,
    // borderTopRightRadius: 20,
    // borderBottomRightRadius: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
