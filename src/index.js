import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill'
import React from 'react';
//import { createRoot } from 'react-dom/client';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './i18n';
import { icons } from './assets/icons'
import { Provider } from 'react-redux'
import store from './store'

React.icons = icons

const container = document.getElementById('root');

render(
    <React.StrictMode>
       <Provider store={store}>
           <App/>
        </Provider>
     </React.StrictMode>, container, () => {
    console.log('rendered');
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
