# StudioLab Calendar Creator

This website generates an HTML file that can be saved as a PDF through your
browser and then printed. Google Chrome is recommended.

## Usage

Just download the latest build, put it in a static web server (`localhost` is
enough). You can then visit your webserver address and follow the instructions.

> The current stylesheet also uses the font Lato
> ([downloadable from Google Fonts](https://fonts.google.com/specimen/Lato)).
> Make sure it is installed on your system.

## How to build

It's not necessary to build the creator just to use it, you can download the
latest build instead.

If you're going to make changes then you will have to build it yourself. Make
sure you have [Node.js](https://nodejs.org/) installed. Download the files, and
run `npm install` on the folder. During development you can use `npm run dev` to
see your changes instantly. To make a finished build, run `npm run build`. The
build will be in the `out` folder.

## Architecture

This tool is a [Next.js](https://nextjs.org/) app written in
[TypeScript](https://www.typescriptlang.org/). You have the main page at
[./src/pages/index.tsx](./src/pages/index.tsx) and the calendar page at
[./src/pages/calendar.tsx](./src/pages/calendar.tsx). It is a regular Next app,
nothing too fancy being used.
