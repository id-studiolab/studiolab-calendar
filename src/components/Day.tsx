import * as dateFns from "date-fns"
import React, { FunctionComponent, useMemo } from "react"
import { Hours } from "./Hour"
import { useParams } from "./Params"

const Day: FunctionComponent<{
  day: Date
}> = ({ day }) => {
  const { locale, studios } = useParams()

  return (
    <div className="page">
      <style jsx>{`
        .studio-col {
          width: calc(100% / ${studios.length});
        }
      `}</style>

      <table className="hourlist" cellSpacing="0" cellPadding="0">
        <colgroup>
          <col className="hour-col" />
          {studios.map((studio) => (
            <col className="studio-col" key={studio} />
          ))}
          <col className="hour-col" />
        </colgroup>

        <thead>
          <tr>
            <td />
            {studios.map((studio) => (
              <td key={studio}>{studio}</td>
            ))}
            <td />
          </tr>
        </thead>
        <tbody>
          <Hours day={day} />
        </tbody>
      </table>
      <div className="daybox">
        <p className="date-info">
          <span>{day.toLocaleString(locale, { day: "numeric" })}</span>
        </p>
        <div className="extra-info">
          <p className="month-info">
            <span>&nbsp;</span>
            <span>{day.toLocaleString(locale, { month: "long" })}</span>
          </p>
          <p className="week-info">
            <span>{day.toLocaleString(locale, { weekday: "long" })}</span>
            <span>,&nbsp;</span>
            <span>week {dateFns.getISOWeek(day)}</span>
          </p>
        </div>
        <div className="year-info">{day.getFullYear()}</div>
      </div>
    </div>
  )
}

export const Days: FunctionComponent = () => {
  const { year, max_days } = useParams()

  const days = useMemo(
    () =>
      dateFns
        .eachDayOfInterval({
          start: dateFns.startOfYear(year),
          end: dateFns.endOfYear(year),
        })
        .filter((date) => !dateFns.isWeekend(date))
        .slice(0, max_days),
    [year, max_days]
  )

  return (
    <>
      {days.map((day) => (
        <Day key={+day} day={day} />
      ))}
    </>
  )
}
