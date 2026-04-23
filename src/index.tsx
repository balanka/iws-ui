//import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import App from './App'
import store from './store'

console.log('env-config.js loaded?', window._env_);
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
