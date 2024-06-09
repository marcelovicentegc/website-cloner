#!/usr/bin/env node
import scrape from "website-scraper";
import PuppeteerPlugin from "website-scraper-puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import { parseArgs } from "node:util";

const defaultOutputDir = "website-cloner-artifacts";

const args = parseArgs({
  options: {
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
  },
});

const { urls, outputDir: _outputDir } = args.values;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(
  __dirname,
  _outputDir + "_" + new Date().toISOString().replace(/:/g, "-")
);

scrape({
  urls: urls.map((url) => `https://${url}`),
  directory: outputDir,
  plugins: [
    new PuppeteerPlugin({
      launchOptions: {
        headless: true,
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
