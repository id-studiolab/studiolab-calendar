import React, { FunctionComponent, useMemo } from "react"
import { useParams } from "./Params"

const Hour: FunctionComponent<{ hour: Date }> = ({ hour }) => {
  const hour_num = hour.getHours().toString(10)
  const hour_min = hour.getMinutes().toString(10).padStart(2, "0")
  const emptyMin = hour.getMinutes() === 0

  return (
    <td className="hour-cell">
      <span className="hour-num empty">{hour_num.length === 1 ? "0" : ""}</span>
      <span className="hour-num">{hour_num}</span>
      <span className={emptyMin ? "empty" : ""}>
        <span className="hour-sep">:</span>
        <span className="hour-min">{hour_min}</span>
      </span>
    </td>
  )
}

export const Hours: FunctionComponent<{ day: Date }> = ({ day }) => {
  const { makeHours, isActiveHour, studios } = useParams()

  const hours = useMemo(() => makeHours(day), [day])

  return (
    <>
      {hours.map((hour) => (
        <tr key={+hour} className={isActiveHour(hour) ? "active" : ""}>
          <Hour hour={hour} />
          {studios.map((studio) => (
            <td key={studio} />
          ))}
          <Hour hour={hour} />
        </tr>
      ))}
    </>
  )
}
