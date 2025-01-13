/*
 * Copyright (C) 2022-2024 David C. Harrison. All right reserved.
 *
 * You may not use, distribute, publish, or modify this code without
 * the express written permission of the copyright holder.
 */
/*
 * *****************************************************
 * YOU CAN DELETE, BUT DO NOT MODIFY THIS FILE
 * *****************************************************
 */
const puppeteer = require('puppeteer');
const http = require('http');
const path = require('path');
const express = require('express');

require('dotenv').config();
const app = require('../../backend/src/app');

let backend;
let frontend;
let browser;
let page;

/**
 * Start an API server on port 3010 connected to the DEV database
 * Start a Web server for the built ("comliled") version of the UI
 * on port 3000.
 */
beforeAll(() => {
  backend = http.createServer(app);
  backend.listen(3010, () => {
    console.log('Backend Running at http://localhost:3010');
  });
  frontend = http.createServer(
    express()
      .use('/assets', express.static(
        path.join(__dirname, '..', '..', 'frontend', 'dist', 'assets')))
      .get('*', function(req, res) {
        res.sendFile('index.html',
          {root: path.join(__dirname, '..', '..', 'frontend', 'dist')});
      }),
  );
  frontend.listen(3000, () => {
    console.log('Frontend Running at http://localhost:3000');
  });
});

/**
 * Shotdown the API server then the Web server.
 */
afterAll((done) => {
  backend.close(() => {
    frontend.close(done);
  });
});

/**
 * Create a headless (not visible) instance of Chrome for each test
 * and open a new page (tab).
 */
beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true,
  });
  page = await browser.newPage();
});

/**
 * Close the headless instance of Chrome as we no longer need it.
 */
afterEach(async () => {
  await browser.close();
});

/**
 * Click the 'Get Dummy' button and check the expected server response
 * replaces the static text.
 */
test('Login Renders', async () => {
  await page.goto('http://localhost:3000/login');
  // login in as molly
  // const email = await page.$('::-p-aria([name="email"]');
  // const password = await page.$('::-p-aria([name="password"]');
//   console.log(email);
//   await email.type('molly@books.com');
//   await password.type('mollymember');
//   await page.click('#sign in');
//   // logged in
//   await page.waitForFunction(
//     'document.querySelector("body").innerText.includes("Hello Mollly!")',
//   );
//   const greet = await page.$('#greeting');
//   const val = await (await greet.getProperty('textContent')).jsonValue();
//   expect(val).toBe('Hello Molly!');
});
