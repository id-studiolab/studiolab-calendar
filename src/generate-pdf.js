// @ts-check

const pptr = require("puppeteer")
const url = require("url")
const path = require("path")

const INPUT_FILE = url.pathToFileURL(process.argv[2]).href

const OUTPUT_FILE = path.resolve(process.argv[3])

void (async () => {
  console.log("Starting Chromium")
  const browser = await pptr.launch({ headless: true })
  const page = await browser.newPage()
  console.log("Opening HTML file")
  await page.goto(INPUT_FILE)
  await page.emulateMedia("print")
  console.log("Printing to PDF")
  await page.pdf({
    format: "A4",
    printBackground: true,
    path: OUTPUT_FILE,
    margin: { top: "5mm", left: "5mm", right: "5mm", bottom: "5mm" }
  })
  await browser.close()
  console.log("PDF Done")
})()
