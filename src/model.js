var Rx = require('rx');
var update = require('react/lib/update');
var Intent = require('./intent');

var subject = new Rx.ReplaySubject(1);

var state = {
  counter: 0,
  list: [],
  filterEvens: true
};

Intent.incrementSubject.subscribe(function () {
  state = update(state, {
    $merge: {
      counter: state.counter + 1,
      list: state.list.concat(state.counter)
    }
  });
  subject.onNext(state);
});

Intent.decrementSubject.subscribe(function () {
  state = update(state, {
    $merge: {
      counter: state.counter - 1,
      list: state.list.concat(state.counter)
    }
  });
  subject.onNext(state);
});

Intent.resetSubject.subscribe(function () {
  state = update(state, {
    $merge: {
      counter: 0,
      list: []
    }
  });
  subject.onNext(state);
});

Intent.filterEvensSubject.subscribe(function () {
  state = update(state, {
    $merge: {
      filterEvens: state.filterEvens ? false : true
    }
  });
  subject.onNext(state);
});

subject.onNext(state);

module.exports = {
  subject: subject
};
