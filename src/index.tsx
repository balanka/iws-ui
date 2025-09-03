//import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import App from './App'
import store from './store'
import React from 'react'


BigInt.prototype.toJSON = function () {
    return this.toString();
};
// @ts-ignore
ReactDOM.createRoot(document.getElementById("app")).render(
//createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
