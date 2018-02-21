# Vue my ClearScore
#### _or_ Out of my comfort zone and (almost) back again

> A task for ClearScore.com written in Vue

## TL;DR

This demo replicates the ClearScore animated credit score dial, built according to task sheet from ClearScore.

Build:
``` bash
npm install

npm run dev
# or
npm run build
# or
npm run unit
```

### A live demo is available here: <http://aepicos.com/clear-score/>

```
                                 R2 says the chances
                                 of this working
                           /~\   are 725... to 1!
                          (O O) _/
                          _\=/_
          ___            /  _  \
         / ()\          //|/.\|\\
       _|_____|_       ||  \_/  ||
      | | === | |      || |\ /| ||
      |_|  O  |_|       # \_ _/ #
       ||  O  ||          | | |
       ||__*__||          | | |
      |~ \___/ ~|         []|[]
      /=\ /=\ /=\         | | |
      [_] [_] [_]        /_] [_\
```

## Task

Build our circular score indicator, as shown on
- <https://www.clearscore.com/account/>
- <https://youtu.be/tIjtcL5Z0Wk?t=5.>

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

## My approach

I am a designer, who can code - rather than a coder, who can design - so I approach tasks visually. I think about what the user sees and interacts with and then create code to underpin that.

Looking at the dial on my ClearScore page I broke it down to the following issues to consider:

- Blurring the background image inside the dial ("frosting")
- Animating the circular graph to a point relative to a maximum score - both passed from data
- Animating the score to an integer (passed by the data) - not required by the task

### Choice of framework

I chose to write the task in Vue.js through the Vue-CLI, because
- I have some experience with Vue and Ember, but none with Angular 4 or React
- I'd rather do a good task than learn a new framework and deliver a half-baked result
- Vue is more light-weight, less verbose and less opinionated than Ember
- Vue's default build tool is Webpack, whereas Ember-CLI is bundled with Broccoli

### Architecture

Breaking the page down into components

``` bash
index.html
|
+- #app - the main window to the Vue application
   |
   +- ClearScore component - user’s start page
      |
      + MainDial component - ignoring the other dials
           |
           +- CircularGraph component
           |
           +- CreditScore component
```

_(In hindsight #app should probably be renamed ClearScore and ClearScore renamed Home - live and learn...)_

### Getting and passing the data

Vue no longer comes bundled with VueResource, so we have to import it. Including Vuex would be overkill for the data required (and I only have little experience with it).

The data is imported by the ClearScore component (the user’s start page, where everything theoretically needs access to it). It is then passed down via props to the child components.

The child components have watchers so the animations get triggered when the information is received.

### Frosting the dial

The dials on the ClearScore app and website have a frosted effect with a blurred and lightened background. This can be done in two ways:
- With two images (as done currently on the website)
- With modern CSS properties

I chose the later and started by testing with CodePen (<https://codepen.io/aepicos/pen/ZrXPzB>). As `backdrop-filters` currently don’t enjoy good support, I used pseudo elements to blur and lighten the main dial.

### Animating the circular graph

The easiest way to create a circular graph is to convert an SVG circle to a path and then set the `stroke-dasharray` property. This can be done easily with a transition (again see the [Codepen](https://codepen.io/aepicos/pen/ZrXPzB)), but as the requirement is for a bouncy animation it had to be done with Javascript.

Whilst looking for a formula for a good bounce (that kind of math is not my strong side) I came across [an article](https://javascript.info/js-animation) by [Ilya Kantor](https://github.com/iliakan), which not only gave a good formula but also a well-written function to implement it. I decided to use it as a `mixin` so it could be used by both the _CircularGraph_ and _CreditScore_ components.

### Animating the score

Animating the score was not part of the task, but I think it works well in conjunction with the animated graph, so I decided to put it in. Using the animation mixin, I faffed about for some time to get a reference to the data.

### Testing

~~A complete and utter failure!~~

This is a work in progress. I have never written unit tests in Mocha and it is currently hard going. I am currently ploughing the depths of Stack Overflow to figure out how to defer a test until the animation has finished...

I will get this. I will not give up. There _will_ be test coverage.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

#run unit tests
npm run unit
```

## Todos

- [ ] *fix testing*
  - [ ] write unit test for ClearScore
    - [ ] data received
  - [ ] write unit test for CircularGraph
    - [ ] data received
    - [ ] graph path length correct
  - [ ] write unit test for CreditScore
    - [ ] data received
    - [ ] score showing correct number
    - [x] max-score showing correct number

- [x] fix CircularGraph path width on iOS (where it is only 1px wide)
