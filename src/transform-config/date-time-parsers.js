// @ts-check
const luxon = require("luxon")

/** @type {(hour: string) => luxon.DateTime} */
const parseHour = hour =>
  luxon.DateTime.fromFormat(hour, "H:m").startOf("minute")

/** @type {(day: string) => luxon.DateTime} */
const parseDay = day => luxon.DateTime.fromFormat(day, "d/M/yy").startOf("day")

/** @type {(interval: {from: string, to: string}) => luxon.Interval} */
const makeHourInterval = ({ from, to }) =>
  luxon.Interval.fromDateTimes(parseHour(from), parseHour(to))

/** @type {(interval: {from: string, to: string}|string) => luxon.Interval} */
const makeDayInterval = interval => {
  const [from, to] =
    (typeof interval === "string")
      ? [interval, interval]
      : [interval.from, interval.to]

  return luxon.Interval.fromDateTimes(
    parseDay(from).startOf("day"),
    parseDay(to).endOf("day")
  )
}

/** @type {(pattern: import("./types").InputData.HourPattern) => (moment: luxon.DateTime) => boolean} */
const hourPatternMatcher = pattern => {
  const hourInterval = makeHourInterval(pattern)
  return ({ hour, minute }) =>
    hourInterval.contains(hourInterval.start.set({ hour, minute }))
}

/** @type {(pattern: import("./types").InputData.HourPattern) => (moment: luxon.DateTime) => boolean} */
const dayPatternMatcher = pattern => {
  const dayInterval = makeDayInterval(pattern)
  return ({ year, month, day }) =>
    dayInterval.contains(dayInterval.start.set({ year, month, day }))
}

/** @type {(patterns: (import("./types").InputData.HourPattern)[]) => (moment: luxon.DateTime) => boolean} */
const matchesAnyHour = patterns => {
  const matchers = patterns.map(hourPatternMatcher)
  return moment => matchers.some(matcher => matcher(moment))
}

/** @type {(patterns: (import("./types").InputData.DayPattern)[]) => (moment: luxon.DateTime) => boolean} */
const matchesAnyDay = patterns => {
  const matchers = patterns.map(dayPatternMatcher)
  return moment => matchers.some(matcher => matcher(moment))
}

exports.parseHour = parseHour
exports.parseDay = parseDay
exports.makeHourInterval = makeHourInterval
exports.makeDayInterval = makeDayInterval
exports.hourPatternMatcher = hourPatternMatcher
exports.dayPatternMatcher = dayPatternMatcher
exports.matchesAnyHour = matchesAnyHour
exports.matchesAnyDay = matchesAnyDay
