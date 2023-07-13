const puppeteer = require("puppeteer");
const delay = require("./utils/delay");

const start = async (url) => {
  // Launch a new browser instance
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });

    // Create a new page
    const page = await browser.newPage();

    // Navigate to the provided URL
    await page.goto("https://swap.defillama.com");

    // - Enter "Arbitrum One" in the "chain" field
    await page.waitForSelector(`input#${"react-select-2-input"}`);
    await page.type(`input#${"react-select-2-input"}`, "Arbitrum One");

    await page.waitForSelector(".css-pwwjoz");

    // - Enter "12" in "You Sell" field
    const inputfirst = await page.$(".css-lv0ed5");
    await inputfirst.click({ clickCount: 3 });
    await inputfirst.type("12");

    const currencyElements = await page.$$(".css-qjhap");

    // - Enter "WBTC" (Wrapped BTC) in the "select token" field on right hand side to "You Sell" field
    // click on the button

    // await page.click(".css-qjhap");
    await currencyElements[0].click();
    await page.waitForSelector(".css-s1d1f4");
    await page.type(".css-s1d1f4", "WBTC", { delay: 1000 });
    const divElementfirst = await page.$("p.chakra-text.css-xl3lrw");
    await divElementfirst.click();

    // - Enter "USDC" (USDC Coin) in the "select token" field in "You Buy" section
    //click the button

    await currencyElements[1].click();
    // await page.click(".css-qjhap");
    await page.waitForSelector(".css-s1d1f4");
    await page.type(".css-s1d1f4", "USDC", { delay: 1000 });
    const divelements = await page.$$("p.chakra-text.css-xl3lrw");
    await divelements[1].click();

    // - Once you enter this data, a section will appear on right hand side called - "Select a route to perform a swap"
    await page.waitForSelector("div.sc-55ee4011-2.fcGAPg");

    await page.waitForSelector("div.sc-18d0abec-1.itSiES");
    // delay(10000);
    const rightSelectElements = await page.$$("div.sc-18d0abec-1.itSiES");
    await rightSelectElements[1].click();
  } catch (error) {
    console.log(error);
  }
};

start();
