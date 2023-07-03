

const puppeteer = require("puppeteer");


async function render(url) {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 600000 // 1 minute
    });


    const html = await page.content(); // serialized HTML of page DOM.

    const cleanHtml = html.replace(
        /<script defer="defer" src="https:\/\/solutrend\.com\/static\/js\/main\.9017fa4d\.js"><\/script>/,
        ""
    );


    await browser.close();

    return cleanHtml;

}


module.exports = render;