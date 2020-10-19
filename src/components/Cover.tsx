import React, { FunctionComponent } from "react"
import { useParams } from "./Params"

export const Cover: FunctionComponent = () => {
  const { year, created_date } = useParams()

  return (
    <div className="page cover">
      <h1>StudioLab Calendar {year.getFullYear()}</h1>
      <p>Generated on {created_date.toLocaleString()}</p>
      <p>
        For best printing results, use Acrobat Reader. Other readers create
        minor visual artifacts.
      </p>
    </div>
  )
}
