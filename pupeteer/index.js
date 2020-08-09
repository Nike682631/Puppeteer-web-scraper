const puppeteer = require("puppeteer");
const FKART_URL = (product_name, item_id, pid) =>
  `https://www.flipkart.com/${product_name}/p/${item_id}?pid=${pid}`;
// You can either enter the url above directly or enter the below three details
const PRODUCT_NAME = `realme-3-pro-nitro-blue-64-gb`;
const ITEM_ID = `itmfgzr2jckcttnx`;
const PID = `MOBFFMG3QQMGHYMH`;
(async () => {
  /* Initiate the Puppeteer browser */
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  /* Go to the flipkart product page and wait for it to load */
  await page.goto(FKART_URL(PRODUCT_NAME, ITEM_ID, PID), {
    waitUntil: "networkidle0",
  });
  /* Run javascript inside of the page */
  let data = await page.evaluate(() => {
    let availability = document.querySelectorAll(
      'div[class="_3gijNv col-12-12"]'
    )[3].innerText;
    /* Returning an object filled with the scraped data */
    let Availability =
      availability.slice(0, 4) === "Sold" ? "Sold out" : "In Stock";
    return {
      Availability,
    };
  });
  /* Outputting what we scraped */
  console.log(data);
  await browser.close();
})();
