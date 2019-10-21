// @ts-check
const luxon = require("luxon")
const matchers = require("./data-matchers")

/** @type {(data: import("../types/data").InputData) => import("../types/data").TemplateLocals} */
const synthesize = data => {
  const isActiveMoment = (() => {
    const isActiveHour = matchers.matchesAnyHour(data.active_hours)
    /** @type { (moment: luxon.DateTime) => boolean } */
    const isWeekday = moment => moment.weekday < 6
    const isHoliday = matchers.matchesAnyDay(data.holidays)
    /** @type { (moment: luxon.DateTime) => boolean } */
    const isNotHoliday = moment => !(isHoliday(moment))

    const activeMatchers = [isActiveHour, isWeekday, isNotHoliday]

    /** @type { (moment: luxon.DateTime) => boolean } */
    return moment => activeMatchers.every(matcher => matcher(moment))
  })()

  const { makeStartHourOnDay, makeEndHourOnDay } = (() => {
    const { start, end } = matchers.makeHourInterval(data.shown_hours)

    /** @type { (day: luxon.DateTime) => luxon.DateTime } */
    const makeStartHourOnDay = day =>
      day.set({ hour: start.hour, minute: start.minute }).startOf("minute")

    /** @type { (day: luxon.DateTime) => luxon.DateTime } */
    const makeEndHourOnDay = day =>
      day.set({ hour: end.hour, minute: end.minute }).endOf("minute")

    return { makeStartHourOnDay, makeEndHourOnDay }
  })()

  /** @type { (initialHour: luxon.DateTime) => Iterable<import("../types/data").TemplateLocals.Hour> } */
  const makeHours = function*(day) {
    for (
      let currentHour = makeStartHourOnDay(day),
        endHour = makeEndHourOnDay(day);
      currentHour <= endHour;
      currentHour = currentHour.plus({ minutes: data.row_increment_mins })
    ) {
      yield {
        date: currentHour,
        active: isActiveMoment(currentHour)
      }
    }
  }

  /** @type { (initialDate: luxon.DateTime) => Iterable<import("../types/data").TemplateLocals.Day> } */
  const makeDays = function*(initialDay) {
    const duringYear = initialDay.year
    for (
      let currentDay = initialDay.startOf("year");
      currentDay.year === duringYear;
      currentDay = currentDay.plus({ days: 1 })
    ) {
      yield {
        date: currentDay,
        hours: [...makeHours(currentDay)]
      }
    }
  }

  /** @type import("../types/data").TemplateLocals */
  const locals = {
    year: data.year,
    days: [
      ...makeDays(
        luxon.DateTime.fromObject({
          year: data.year,
          locale: data.language,
          zone: "Europe/Amsterdam"
        })
      )
    ]
  }

  return locals
}

exports.synthesize = synthesize
