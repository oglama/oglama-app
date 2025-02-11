## Launching the Next.js web admin

1. Launch emulator from `oglama-app-dev`
2. Run `npm run dev`
3. Next.js supports hot reloading

## Using the repository

 * Format: `npm run format`
 * Lint: `npm run lint`
 * Test: `npm run test`
 * Build Electron.js application: `npm run build`
 * Export Electron.js resources: `npm run build res` 

## Publishing the Desktop application

Available only if the `Publisher` repository is installed on this machine.

`npm run publish [{options}]`

### Options

 * `clean`: Clean all temporary files before run
 * `release`: *Release app* immediately after publishing
 * `v{n}.{n}.{n}`: Specify published version; example: `v0.1.2`