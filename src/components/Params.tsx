import * as dateFns from "date-fns"
import { createContext, useContext } from "react"

export type ParamsData = {
  locale: string | undefined
  year: Date
  created_date: Date
  max_days?: number
  start_hour: number
  start_active_hour: number
  end_hour: number
  end_active_hour: number
  step_minutes: number
  studios: string[]
}
export type Query = { [K in keyof ParamsData]?: string }

export const parseNumber = (s?: string) => {
  if (s == null) return
  const n = Number.parseInt(s, 10)
  if (Number.isNaN(n)) return
  return n
}

export const parseYear = (s?: string) => {
  const year = parseNumber(s)
  if (year) return new Date(year, 0)
  return
}

export interface Params extends ParamsData {}
export class Params {
  constructor(query: Query = {}) {
    this.locale = query.locale
    this.year = parseYear(query.year) ?? new Date()
    this.created_date = new Date()
    this.max_days =
      query.max_days?.toLowerCase() === "all"
        ? undefined
        : parseNumber(query.max_days) ?? 0
    this.start_hour = parseNumber(query.start_hour) ?? 8
    this.start_active_hour = parseNumber(query.start_active_hour) ?? 9
    this.end_hour = parseNumber(query.end_hour) ?? 21
    this.end_active_hour = parseNumber(query.end_active_hour) ?? 20
    this.step_minutes = parseNumber(query.step_minutes) ?? 15
    this.studios = query.studios?.split(",") ?? [
      "Say",
      "Talk",
      "Join",
      "Tell",
      "Show",
      "Hatch",
    ]
  }

  makeHours = (day: Date) => {
    const interval = {
      start: dateFns.setHours(dateFns.startOfDay(day), this.start_hour),
      end: dateFns.setHours(dateFns.startOfDay(day), this.end_hour),
    }

    const hours: Date[] = []
    for (
      let hour = interval.start;
      dateFns.isWithinInterval(hour, interval);
      hour = dateFns.addMinutes(hour, this.step_minutes)
    )
      hours.push(hour)

    return hours
  }

  isActiveHour = (hour: Date) =>
    dateFns.isWithinInterval(hour, {
      start: dateFns.setHours(dateFns.startOfDay(hour), this.start_active_hour),
      end: dateFns.setHours(dateFns.startOfDay(hour), this.end_active_hour),
    })
}

export const defaultParams = new Params()

const ParamsContext = createContext(defaultParams)
ParamsContext.displayName = "Params"
export const ParamsProvider = ParamsContext.Provider
export const useParams = () => useContext(ParamsContext)
