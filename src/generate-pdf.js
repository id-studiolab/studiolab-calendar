// @ts-check

const { transformConfig } = require("./transform-config")
const ejs = require("ejs")
const execa = require("execa")
const fse = require("fs-extra")
const path = require("path")
const pptr = require("puppeteer")
const tempy = require("tempy")
const url = require("url")

const TEMPLATE_FOLDER = path.resolve(process.argv[2])
const TEMPLATE_FILE = path.resolve(process.argv[3])
const DATA_FILE = path.resolve(process.argv[4])
const OUTPUT_FILE = path.resolve(process.argv[5])

;(async () => {
  try {
    console.log("Reading and processing data")
    const data = require(DATA_FILE)
    const templateInputData = transformConfig(data)

    const bundlerIntermediateDir = tempy.directory()
    const pdfIntermediateDir = tempy.directory()
    console.log("Temp dir for HTML:", bundlerIntermediateDir)
    console.log("Temp dir for PDF:", pdfIntermediateDir)

    console.log("Preparing assets")
    await fse.copy(TEMPLATE_FOLDER, bundlerIntermediateDir)

    console.log("Generating HTML")
    const output = await ejs.renderFile(TEMPLATE_FILE, templateInputData)

    console.log("Writing HTML")
    const intermediateFile = path.resolve(
      bundlerIntermediateDir,
      path.basename(TEMPLATE_FILE, path.extname(TEMPLATE_FILE)) + ".html"
    )

    await fse.writeFile(intermediateFile, output)

    console.log("Bundling assets")
    await execa(
      "parcel",
      [
        "build",
        "-d",
        pdfIntermediateDir,
        "--public-url",
        "./",
        "--no-minify",
        "--no-cache",
        "--no-source-maps",
        "--no-autoinstall",
        "--no-content-hash",
        "-t",
        "browser",
        intermediateFile
      ],
      { stdout: "inherit", stderr: "inherit", cwd: bundlerIntermediateDir }
    )

    console.log("Starting Chromium")
    const browser = await pptr.launch({ headless: true })
    const page = await browser.newPage()

    console.log("Opening HTML file")
    await page.goto(
      url.pathToFileURL(
        path.resolve(pdfIntermediateDir, path.basename(intermediateFile))
      ).href
    )
    await page.emulateMediaType("print")

    console.log("Printing to PDF")
    await page.pdf({
      format: "A4",
      printBackground: true,
      path: OUTPUT_FILE,
      margin: { top: "5mm", left: "5mm", right: "5mm", bottom: "5mm" }
    })
    browser.close()

    console.log("Done")
  } catch (err) {
    console.error("Error")
    console.error(err)
    process.exit(1)
  }
})()
