// @ts-check

const data = require("./data.js")
const { synthesize } = require("./src/data-synthesize")

const locals = synthesize(data)
exports.locals = locals

if (require.main === module) {
  console.log(JSON.stringify({ locals }, null, 2))
}
