import { DateTime } from "luxon"

export interface ConfigData {
  year: number
  language: string
  row_increment_mins: number
  shown_hours: ConfigData.HourPattern
  active_hours: ConfigData.HourPattern[]
  holidays: ConfigData.DayPattern[]
}

export declare namespace ConfigData {
  export type Hour = string
  export type HourPattern = { from: Hour; to: Hour }
  export type Day = string
  export type DayPattern = Day | { from: Day; to: Day }
}

export interface TemplateData {
  year: number
  days: TemplateData.Day[]
}

export declare namespace TemplateData {
  export interface Day {
    date: DateTime
    hours: Hour[]
  }

  export interface Hour {
    date: DateTime
    active: boolean
  }
}
