import type { NextPage } from "next"
import React, { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { defaultParams, Query } from "../components/Params"

const defaultValues: Query = {
  max_days: "1",
  studios: defaultParams.studios.join(","),
  start_hour: "8",
  end_hour: "21",
  start_active_hour: "9",
  end_active_hour: "20",
  step_minutes: "15",
  locale: "en-GB",
}

const IndexPage: NextPage = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const { register, setValue, watch } = useForm({ defaultValues })

  useEffect(() => {
    setValue("year", `${new Date().getFullYear() + 1}`)
  }, [])

  const calendarUrl = `/calendar?${new URLSearchParams(
    watch() as any
  ).toString()}`

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexFlow: "row nowrpa",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "100%",
        }}
      >
        <fieldset>
          <table>
            <tbody>
              <tr>
                <td>Year</td>
                <td>
                  <input type="number" name="year" ref={register()} />
                </td>
              </tr>
              <tr>
                <td>Language</td>
                <td>
                  <input type="text" name="locale" ref={register()} />
                </td>
              </tr>
              <tr>
                <td>Studios</td>
                <td>
                  <input type="text" name="studios" ref={register()} />
                </td>
                <td>(comma-separated)</td>
              </tr>
              <tr>
                <td>Hours to show</td>
                <td>
                  <input
                    type="number"
                    style={{ width: "3em" }}
                    name="start_hour"
                    ref={register()}
                  />{" "}
                  to{" "}
                  <input
                    type="number"
                    style={{ width: "3em" }}
                    name="end_hour"
                    ref={register()}
                  />
                </td>
              </tr>
              <tr>
                <td>Active hours to show</td>
                <td>
                  <input
                    type="number"
                    style={{ width: "3em" }}
                    name="start_active_hour"
                    ref={register()}
                  />{" "}
                  to{" "}
                  <input
                    type="number"
                    style={{ width: "3em" }}
                    name="end_active_hour"
                    ref={register()}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Row every <em>x</em> minutes
                </td>
                <td>
                  <input type="number" name="step_minutes" ref={register()} />
                </td>
              </tr>
              <tr>
                <td>
                  <hr />
                </td>
                <td>
                  <hr />
                </td>
                <td>
                  <hr />
                </td>
              </tr>
              <tr>
                <td>
                  Render <em>x</em> pages
                </td>
                <td>
                  <input type="text" name="max_days" ref={register()} />
                </td>
                <td>
                  (Enter a number or{" "}
                  <a
                    onClick={() => {
                      setValue("max_days", "all")
                    }}
                  >
                    <em>all</em>
                  </a>
                  )
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>
      <div
        style={{
          width: "50%",
          height: "100%",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          ref={iframeRef}
          src={calendarUrl}
          style={{ border: 0, borderLeft: "1px solid black" }}
        />
      </div>
    </div>
  )
}

export default IndexPage
