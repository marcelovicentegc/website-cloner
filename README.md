# website-cloner

Do you need to migrate that old website for a friend of yours to a new platform? Or maybe you need to clone a website for a school project? Or maybe you just want to clone a website for fun?

This project is a simple abstraction on top of website-scraper and website-scraper-puppeteer libraries to clone websites with ease from the CLI.

## Usage

```sh
pnpm i -g website-cloner # or npm i -g website-cloner
website-cloner -u website.com -u website2.com -u website3.com # outputs to ./website-cloner-artifacts_timestamp by default
website-cloner -u website.com -o ./abc # outputs to ./abc
```

## Development

```sh
pnpm i 
# make changes to the code
pnpm dev -u website.com # ensure that the changes work
``` 

## Contributing

This code is super simple. It just abstracts the website-scraper and website-scraper-puppeteer libraries' heavy lifting and make it accessible via a CLI that can be easily installed. Its entry point is [./index.mjs](./index.mjs).

Open a pull request or an issue ❤️
