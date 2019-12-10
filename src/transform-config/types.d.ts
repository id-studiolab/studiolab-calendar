import { DateTime } from "luxon"

export interface InputData {
  year: number
  language: string
  row_increment_mins: number
  shown_hours: InputData.HourPattern
  active_hours: InputData.HourPattern[]
  holidays: InputData.DayPattern[]
}

export declare namespace InputData {
  export type Hour = string
  export type HourPattern = { from: Hour; to: Hour }
  export type Day = string
  export type DayPattern = Day | { from: Day; to: Day }
}

export interface TemplateLocals {
  year: number
  days: TemplateLocals.Day[]
}

export declare namespace TemplateLocals {
  export interface Day {
    date: DateTime
    hours: Hour[]
  }

  export interface Hour {
    date: DateTime
    active: boolean
  }
}
