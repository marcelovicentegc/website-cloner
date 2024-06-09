#!/usr/bin/env node
import scrape from "website-scraper";
import PuppeteerPlugin from "website-scraper-puppeteer";
import path from "path";
import { homedir } from "os";
import { parseArgs } from "node:util";

const defaultOutputDir = "website-cloner-artifacts";

const args = parseArgs({
  options: {
    help: {
      type: "boolean",
      short: "h",
    },
    urls: {
      type: "string",
      short: "u",
      multiple: true,
    },
    outputDir: {
      type: "string",
      short: "o",
      default: defaultOutputDir,
    },
    recursive: {
      type: "boolean",
      short: "r",
      default: false,
    },
  },
});

const { urls, outputDir: _outputDir } = args.values;

const outputDir = path.resolve(
  homedir(),
  _outputDir + "_" + new Date().toISOString().replace(/:/g, "-")
);

if (args.values.help || !urls || urls.length === 0) {
  console.log(
    `Usage: website-cloner -u <url1> -u <url2> ... [options]
Options:
  -h, --help              Show this help message and exit
  -u, --urls              List of URLs to clone
  -o, --outputDir         Output directory (default: $HOME/${defaultOutputDir})
  -r, --recursive         Enable recursive cloning (default: false)
`
  );
  process.exit(0);
}

console.log("Cloning websites:", urls);

scrape({
  urls: urls.map((url) => `https://${url}`),
  directory: outputDir,
  recursive: args.values.recursive,
  plugins: [
    new PuppeteerPlugin({
      launchOptions: {
        headless: "new",
      },
      scrollToBottom: {
        timeout: 10000,
        viewportN: 10,
      },
    }),
  ],
}).then(() => {
  console.log(`Website succesfully downloaded at ${outputDir}`);
});
