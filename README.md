# Interview Scheduler

Interview Scheduler is a project intended to learn and improve skills used in designing a single-page web app using:

- React
- Webpack, Babel
- Axios
- Storybook, Webpack Dev Server, Jest, Testing Library

The Scheduler client application created initialized using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

It allows the creation of appointments on a schedule. Creation, editing (both student names and interviewer), and deletion are all supported. Any of these actions pushes data to the DB, and upon OK response from server updates state with the new data.

There are appropriate error messages when a server request fails, and the app correctly redirects the user in such an event.

## Screenshots

!['default'](https://github.com/adamgrharvey/scheduler/blob/master/IMAGES/default.png?raw=true)
!['create'](https://github.com/adamgrharvey/scheduler/blob/master/IMAGES/create.png?raw=true)
!['cantbeblank'](https://github.com/adamgrharvey/scheduler/blob/master/IMAGES/cantbeblank.png?raw=true)
!['error'](https://github.com/adamgrharvey/scheduler/blob/master/IMAGES/error.png?raw=true)
!['screensize'](https://github.com/adamgrharvey/scheduler/blob/master/IMAGES/screensize.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
