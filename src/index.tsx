import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import App from './App'
import store from './store'
import {db, initDefaultData} from "./utils/db.ts";

//console.log('env-config.js loaded?', window._env_);
BigInt.prototype.toJSON = function () {
    return this.toString();
};
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find element with id 'app'");
db.open().then(() => initDefaultData()).then(() => {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})


