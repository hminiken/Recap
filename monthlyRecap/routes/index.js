var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  var books_read = [];
  res.render('index', { books_read: books_read });
});

router.get('/book-container', function(req, res, next) {
  var books_read = [];
  res.render('image_export');
});

router.post('/send-content', (req, res) => {
  const content = req.body.content;
  console.log("Send content")
  // Store the content in the session or a global variable
  req.app.locals.content = content;
  res.json({ redirectUrl: '/screenshot' });
});

router.get('/display-content', (req, res) => {
  const content = req.app.locals.content;
  console.log("display content")
  res.render('image_export', { content: content });
//   res.render('image_export', { content: content }, async (err, html) => {
//     if (err) {
//         return res.status(500).send(err);
//     }

//     // Use a callback to make sure the content is rendered before taking the screenshot
//     const url = 'display-content';
//     const outputPath = 'screenshot.png';

//     await takeScreenshot(content, url);

//     res.send('Screenshot taken');
// });

});


router.get('/screenshot', async (req, res) => {
  // Render the page with the text
  const url = 'http://localhost:3000/display-content'; // Adjust URL if necessary

  // Launch Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1400,
    height: 2800,
    deviceScaleFactor: 1
  });

  // Go to the page that generates the content
  await page.goto(url);

  const element = await page.$('#image_container'); 

  // Take a screenshot of the rendered page
  const screenshotPath = 'screenshot.png'; // Path to save the screenshot
  await element.screenshot({ path: screenshotPath });

  await browser.close();

    // Set the appropriate headers to suggest a file download
    res.setHeader('Content-Disposition', `attachment; filename=${path.basename(screenshotPath)}`);
    res.setHeader('Content-Type', 'image/png');
  // Pipe the file to the response
  fs.createReadStream(path.join(__dirname, screenshotPath)).pipe(res);

  // Optionally delete the file after sending
  // res.on('finish', () => {
  //   fs.unlink(path.join(__dirname, screenshotPath), err => {
  //     if (err) {
  //       console.error('Error deleting screenshot file:', err);
  //     }
  //   });
  // });


  // // Send the screenshot file as a response
  // res.sendFile(path.join(__dirname, screenshotPath), err => {
  //   if (err) {
  //     console.error('Error sending screenshot:', err);
  //     res.status(500).send('Error occurred while generating screenshot');
  //   } else {
  //     // Optionally delete the file after sending
  //     fs.unlink(screenshotPath, err => {
  //       if (err) console.error('Error deleting screenshot file:', err);
  //     });
  //   }
  // });
});




router.post('/get-data', async (req, res) => {
  console.log("POST");
  console.log((req.body).read_books);
  books_read = JSON.parse((req.body).read_books);
  console.log("Books read:", books_read);


  res.render('index', { books_read: books_read })
  
});


async function takeScreenshot(divContent, url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.goto(url)

  // Set the content of the page directly if you're not navigating
  // await page.setContent(`<html><body>${divContent}</body></html>`);
  await page.setContent(`<!doctype html>
<html>
  <%- include('./templates/head'); %>
  <body>
    <main>
        <div id="displayDiv">${divContent}</div>
    </main>
</body>
<%- include('./templates/foot'); %>
</html>`);

  // Or navigate to a route that renders the page with the div content
  // await page.goto('http://localhost:3000/renderPage2', {
  //     waitUntil: 'networkidle2'
  // });

  // Wait for the div with the content to load (if you navigated to a route)
  // await page.waitForSelector('#your-div-id', { visible: true });

  // Take a screenshot
  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
}


// app.get('/render-page', async (req, res) => {
//   const url = 'https://example.com'; // Replace with the URL you want to scrape
//   const text = await getTextFromPage(url);

//   res.render('page', { text });
// });






// router.get('/screenshot', async (req, res) => {
//   try {
//     // Launch the browser
//     const browser = await puppeteer.launch({ headless: false  });
//     // const page = await browser.newPage();

//     // // Navigate to the route that generates dynamic content
//     // // await page.goto('http://localhost:3000/get-data', { waitUntil: 'networkidle2' });
//     // const  currentPage = browser.pages().then(allPages => allPages[0]);
//     // console.log("Got page");

//     async function getActivePage(browser, timeout) {
//       var start = new Date().getTime();
//       while(new Date().getTime() - start < timeout) {
//           var pages = await browser.pages();
//           var arr = [];
//           for (const p of pages) {
//               if(await p.evaluate(() => { return document.visibilityState == 'visible' })) {
//                   arr.push(p);
//               }
//           }
//           if(arr.length == 1) return arr[0];
//       }
//       throw "Unable to get active page";
//   }

//     page = getActivePage(browser, 2000);

//     // Wait for the specific dynamic content to load
//     await page.waitForSelector('.card'); // Adjust selector as needed
//     console.log("Got Card")
    
//     // Get the element handle
//     const element = await page.$('#image_container');
//     console.log("Got Container")

//     // Ensure the element and its children are fully visible
//     await page.evaluate((element) => {
//       element.scrollIntoView();
//     }, element);

//     // Take a screenshot of the element including its children
//     if (element) {
//       const screenshotBuffer = await element.screenshot();

//       // Set the response headers to prompt download
//       res.setHeader('Content-Disposition', 'attachment; filename=main-content.png');
//       res.setHeader('Content-Type', 'image/png');

//       // Send the screenshot buffer as the response
//       res.send(screenshotBuffer);
//     } else {
//       res.status(404).send('Element not found');
//     }

//     // Close the browser
//     await browser.close();
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });




module.exports = router;