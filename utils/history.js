const axios = require("axios");
const puppeteer = require("puppeteer");
require("dotenv").config();

async function history(url) {
  try {
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--no-zygote",
        "--single-process",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0", timeout: 600000 });

    const data = await page.evaluate(() => {
      const rows = document.querySelectorAll("table tbody tr");
      const result = [];

      rows.forEach((row) => {
        const columns = row.querySelectorAll("td");
        if (columns.length > 0) {
          const date = columns[0].innerText;
          const open = columns[1].innerText;
          const high = columns[2].innerText;
          const low = columns[3].innerText;
          const close = columns[4].innerText;
          const adjClose = columns[5].innerText;
          result.push({ date, open, high, low, close, adjClose });
        }
      });
      return result;
    });
    await browser.close();
    return data;
  } catch (error) {
    console.error("Error scraping data", error);
  }
}

module.exports = { history };
