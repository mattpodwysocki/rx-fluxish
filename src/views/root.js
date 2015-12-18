var React = require('react');

var Intent = require('../intent');

class Root extends React.Component {

  constructor() {
    super();

    this.handleIncrement = function () { Intent.incrementCounter(); };
    this.handleDecrement = function () { Intent.decrementCounter(); };
    this.handleReset = function () { Intent.resetCounter(); };
    this.handleToggleEvens = function () { Intent.toggleFilterEvens(); };
  }

  render() {
    console.log('props', this.props);
    return (
      <div>
        <h1>Hello</h1>
        <p>counter: {this.props.counter}</p>
        <p>list: {this.props.filteredList.join(',')}</p>
        <button onClick={this.handleIncrement}>increment</button>
        <button onClick={this.handleDecrement}>decrement</button>
        <button onClick={this.handleReset}>reset</button>
        <button onClick={this.handleToggleEvens}>filter evens</button>
      </div>
    );
  }
}

module.exports = Root;
