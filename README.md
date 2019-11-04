# StudioLab Calendar

This is a set of scripts that generate an HTML file, which gets turned into a
PDF through [Prince](https://princexml.com).

## Prerequisites

These scripts are compatible with macOS (should also be compatible with Linux
but hasn't been tested).

- `make` (tested with `GNU Make 3.81`)
- [`node.js`](https://nodejs.org) (tested with `v12.12.0`)

The current stylesheet also uses the font Lato ([downloadable from Google Fonts](https://fonts.google.com/specimen/Lato)).

## Usage

Edit the [`data.js`](./data.js) file with the necessary parameters. You can run
`make check` from the command-line to test that the file is accepted by the
program.

Then you run `make all` to create the PDF, which will be placed at
`out/calendar.pdf`.

If you're making a lot of changes, you might want to run `make watch` to
continuosly create a PDF each time a change is detected.
