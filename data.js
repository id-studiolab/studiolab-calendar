// @ts-check

/** @type {import("./types/data").InputData} */
const data = {
  year: 2020,
  language: "en-GB",
  row_increment_mins: 15,
  shown_hours: { from: "8:00", to: "21:00" },
  active_hours: [{ from: "9:00", to: "20:00" }],
  holidays: [
    { from: "3/2/2020", to: "7/2/2020" },
    "10/4/2020",
    "13/4/2020",
    "27/4/2020",
    "5/5/2020",
    "21/5/2020",
    "22/5/2020",
    "1/6/2020",
    { from: "6/7/2020", to: "28/8/2020" }
  ]
}

module.exports = data
