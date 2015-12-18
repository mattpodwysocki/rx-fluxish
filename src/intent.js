var Rx = require('rx');

var incrementSubject = new Rx.ReplaySubject(1);
var decrementSubject = new Rx.ReplaySubject(1);
var resetSubject = new Rx.ReplaySubject(1);
var filterEvensSubject = new Rx.ReplaySubject(1);

module.exports = {
  incrementSubject: incrementSubject,
  decrementSubject: decrementSubject,
  resetSubject: resetSubject,
  filterEvensSubject: filterEvensSubject,

  incrementCounter: function () {
    incrementSubject.onNext();
  },
  decrementCounter: function () {
    decrementSubject.onNext();
  },
  resetCounter: function () {
    resetSubject.onNext();
  },
  toggleFilterEvens: function () {
    filterEvensSubject.onNext();
  }
};
