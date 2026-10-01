import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'core-js';
import App from './App';
import store from './store';
import { getDb, initDefaultData } from './utils/db.ts';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error("Failed to find element with id 'app'");

const start = () => {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const d = getDb();

if (!d) {
  console.warn('Rendering without local DB.');
  start();
} else {
  d.open()
    .then(() => initDefaultData())
    .catch((err) => console.error('DB init failed:', err))
    .finally(start);
}
