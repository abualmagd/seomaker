

const puppeteer = require("puppeteer");
const fs = require('fs');
const Client = require('ftp');

async function screenShot(tool) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const url = 'https://www.solutrend.com/store/' + tool;
  await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: 600000 // 1 minute
  });






  /*  // Take screenshot and save as HTML
  const shot = await page.screenshot({
    fullPage: true
  });*/




  const html = await page.content(); // serialized HTML of page DOM.

  //write html file
  const cleanHtml = html.replace(
    /<script defer="defer" src="https:\/\/solutrend\.com\/static\/js\/main\.9017fa4d\.js"><\/script>/,
    ""
  );


  // Save clean HTML  
  fs.writeFileSync("myshots/hostinger.html", cleanHtml);

  // Upload to FTP server to shots 
  const c = new Client();
  c.connect({
    host: 'ftp.solutrend.com',
    user: 'u917118114.ismail89',
    password: 'Ismail#89118911'
  });


  c.on('ready', function () {
    c.put("myshots/hostinger.html", `${tool}.html`, function (err) {
      if (err) throw err;
      c.end();
      console.log('file uploaded');
      console.log("job done");

    });
  });




  console.log('done will close');
  await browser.close();

}


module.exports = screenShot;