import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { Cover } from "../components/Cover"
import { Days } from "../components/Day"
import { Params, ParamsProvider } from "../components/Params"

const CalendarPage: NextPage = () => {
  const router = useRouter()

  const [params, setParams] = useState<Params>()
  useEffect(() => {
    setParams(new Params(router.query))
  }, [router.query])

  if (!params) {
    return <p>Loading...</p>
  }

  return (
    <ParamsProvider value={params}>
      <Cover />
      <style jsx>{`
        @media print {
          .instructions {
            display: none;
          }
        }
      `}</style>
      <div className="instructions">
        <p>
          <button onClick={() => window.print()}>
            Print {params.max_days} pages
          </button>{" "}
          <em>Remember to check the background graphics checkbox</em>
        </p>
        <hr />
        <p />
      </div>
      <Days />
    </ParamsProvider>
  )
}
export default CalendarPage
