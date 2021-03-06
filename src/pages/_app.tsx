import { NextPage } from "next"
import { AppProps } from "next/app"
import "../styles/main.global.scss"

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)
export default App
