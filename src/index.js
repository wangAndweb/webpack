import "@babel/polyfill";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class App extends Component {
  render() {
    return <div>Hello World</div>
  }
}
ReactDOM.render(document.getElementById("root"), App);