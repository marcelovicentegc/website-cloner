import scrape from "website-scraper";
import PuppeteerPlugin from "website-scraper-puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import { argv } from "process";

const urls = argv.slice(2);

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, `website-cloner-artifacts`);

scrape({
  // Provide the URL(s) of the website(s) that you want to clone
  // In this example, you can clone the Our Code World website
  urls: urls.map((url) => `https://${url}`),
  // Specify the path where the content should be saved
  // In this case, in the current directory inside the ourcodeworld dir
  directory: outputDir,
  // Load the Puppeteer plugin
  plugins: [
    new PuppeteerPlugin({
      launchOptions: {
        // If you set  this to true, the headless browser will show up on screen
        headless: true,
      } /* optional */,
      scrollToBottom: {
        timeout: 10000,
        viewportN: 10,
      } /* optional */,
    }),
  ],
});
