// @ts-check

/** @type {import("./types/data").InputData} */
const data = {
  // Year for the calendar
  year: 2020,

  // Language for the month and day names
  language: "en-GB",

  // Each row's time will increment the previous by this amount of minutes
  row_increment_mins: 15,

  // The hours that are shown in each page
  shown_hours: { from: "8:00", to: "21:00" },

  // The hours that are highlighted in each page
  active_hours: [{ from: "9:00", to: "20:00" }],

  // Days that will be faded out, allows `"DD/MM/YYYY"` format, or `{from: "DD/MM/YYYY", to: "DD/MM/YYYY"}`
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
