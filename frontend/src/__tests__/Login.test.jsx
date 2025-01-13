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
import {it, beforeAll, afterAll, afterEach, expect} from 'vitest';
import {BrowserRouter as Router} from 'react-router-dom';
import {render, fireEvent, screen} from '@testing-library/react';
import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';

import SignIn from '../components/MobileLogin';

const URL='http://localhost:3010/v0/login';

const server = setupServer();
const component = (
  <Router>
    <SignIn />
  </Router>
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/**
 * checks if login forms are present
 */
it('Has login form and can Login', async () => {
  server.use(
      http.post(URL, async () => {
        return HttpResponse.json({
          'name': 'molly',
          'accessToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik' +
          'pXVCJ9.eyJlbWFpbCI6Im1vbGx5QGJvb2tzLmNvbSIsIn' +
          'JvbGUiOiJ1c2VyIiwiaWF0IjoxNzEwMjI1NjYwLCJleHA' +
          'iOjE3MTAyMjc0NjB9.Jpqx4G0_8IRwnPhwOuicvrqKwYA' +
          'xwKQD5N5zH00yOj0'}, {status: 200},
        );
      }),
  );
  const {getByText} = render(component);

  const email = document.getElementById('Email Address');
  const pass = document.getElementById('password');
  const login = document.getElementById('sign in');

  expect(email).toBeInTheDocument();
  expect(pass).toBeInTheDocument();
  expect(login).toBeInTheDocument();
  expect(getByText('Incorrect Email or Password').style.visibility)
      .toBe('hidden');

  fireEvent.change(email, {target: {value: 'molly@books.com'}});
  fireEvent.change(pass, {target: {value: 'mollymember'}});
  fireEvent.click(login);
  expect(getByText('Incorrect Email or Password').style.visibility)
      .toBe('hidden');
});

it('Can Denie Unexisting User', async () => {
  server.use(
      http.post(URL, async () => {
        return HttpResponse.json(
            {message: 'Invalid Credential'}, {status: 401});
      }),
  );
  const {getByText} = render(component);

  const email = document.getElementById('Email Address');
  const pass = document.getElementById('password');
  const login = document.getElementById('sign in');

  expect(email).toBeInTheDocument();
  expect(pass).toBeInTheDocument();
  expect(login).toBeInTheDocument();
  expect(getByText('Incorrect Email or Password').style.visibility)
      .toBe('hidden');

  fireEvent.change(email, {target: {value: 'gibber@email.com'}});
  fireEvent.change(pass, {target: {value: 'somewords'}});
  fireEvent.click(login);
  await screen.findByText('Incorrect Email or Password');
  expect(getByText('Incorrect Email or Password').style.visibility)
      .toBe('visible');
});

// it('Handles Server Error', async () => {
//   server.use(
//       http.post(URL, async () => {
//         return HttpResponse.json({status: 401});
//       }),
//   );
//   render(component);
//   const login = document.getElementById('sign in');
//   fireEvent.click(login);
//   await screen.findByText('Incorrect Email or Password');
// });
