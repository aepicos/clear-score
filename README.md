# Vue my ClearScore

> A test

## Task

Build our circular score indicator, as shown on
- https://www.clearscore.com/account/
- https://youtu.be/tIjtcL5Z0Wk?t=5.

Send your solution as a link to a public git repository with clear instructions and your thoughts in the README.

### Requirements
- Show the given score in the middle and with an arc outside that represents the score out of 700
- The arc animates on load with a bouncing effect at the end
- Write a service to connect to the dashboard data https://s3.amazonaws.com/cdn.clearscore.com/native/interview_test/creditReportInfo.json
- Build the first score indicator slide using take data from the above json
- The solution displays correctly on modern browsers (including mobile)
- Use a current JavaScript framework/library such as Angular 4+, React, and justify your choice.
- Use Webpack to build your application
- Add tests coverage

What we're looking for
- A stylish solution with unit test coverage
- Clean, concise code
- Knowledge of ES6 syntax
- Good use of your chosen technologies
- A detailed Read.me for the application
- A live site we can see if possible

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
