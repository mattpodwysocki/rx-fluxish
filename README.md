# RxJS Flux-ish Implementation #

This is an implementation of a Flux-like architecture using [RxJS](https://github.com/Reactive-Extensions/RxJS) along with React.  If you wish to have a lighter weight version of RxJS, you could do use RxJS-Lite, which you can substitute at any point such as:

```js
var Rx = require('rx-lite');
```

## Running the application ##

To run the application, first clone the repository:

```bash
$ git clone https://github.com/mattpodwysocki/rx-fluxish.git
```

Then install the dependencies via NPM:
```bash
$ npm install
```

Then build the application with the following:
```bash
$ npm start
```

Then simply open `index.html` in your browser of choice.

## Alternate Version ##

Currently, this version uses no keys and each intent is an `Rx.Subject`, however, this doesn't have to be the case.  Instead, we could have a single subject for the entire intent with a set of keys to determine our actions.

Our keys would be stored in the `keys.js` file:
```js
var keyMirror = require('keymirror');

module.exports = keyMirror({
  INCREMENT_COUNTER: null
});
```

Then our intent would be in the `intent.js` file:
```js
var Rx = require('rx');
var Keys = require('./keys');
var intentSubject = new Rx.ReplaySubject(1);

module.exports = {
  subject: intentSubject,

  incrementCounter: function () {
    intentSubject.onNext({
      key: Keys.INCREMENT_COUNTER
    });
  }
};
```

Finally our model would be exposed via the `model.js` file just as before.  Instead of having a subscription on each object exposed in the intent as in the checked in code, we would simply have a `filter` on our intent.

```js
var Rx = require('rx');
var update = require('react/lib/update');
var Keys = require('./keys');
var Intent = require('./intent');

var subject = new Rx.ReplaySubject(1);

var state = {
  counter: 0
};

function incrementCounter() {
  state = update(state, {
    $merge: {
      counter: state.counter + 1
    }
  });
  subject.onNext(state);
}

Intent.subject
  .filter(function (payload) { return payload.key === Keys.INCREMENT_COUNTER; })
  .subscribe(incrementCounter);

subject.onNext(state);

module.exports = {
  subject: subject
};
```

## Resources ##

Here are some resources for learning RxJS:
- [RxJS](https://github.com/Reactive-Extensions/RxJS)
- [RxJS GitBook](http://xgrommx.github.io/rx-book/)
- [Rx + React/Flux Examples](https://github.com/xgrommx/rx-book/blob/master/content/resources/reactive_libraries/rx.md#react)

## LICENSE ##

The MIT License (MIT)

Copyright (c) 2015 Matthew Podwysocki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
