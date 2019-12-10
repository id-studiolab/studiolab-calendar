// @ts-check

const data = require("./config-data.js")
const { transformConfig } = require("./src/transform-config")

const locals = transformConfig(data)
exports.locals = locals

if (require.main === module) {
  console.log(JSON.stringify({ locals }, null, 2))
}
