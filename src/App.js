import React  from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
//import { RecoilRoot as GlobalState } from 'recoil';
import ErrorFallback from './utils/ErrorFallback';
import {ErrorBoundary} from 'react-error-boundary';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./common/containers/TheLayout'));

// Email App
const TheEmailApp = React.lazy(() => import('./views/apps/email/TheEmailApp'));

// Pages
const Login = React.lazy(() => import('./views/base/Components/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));


const App = ()=>{

    return (
       <ErrorBoundary FallbackComponent={ErrorFallback}>
         <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
               <Route path="/apps/email" name="Email App" render={props => <TheEmailApp {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
         </HashRouter>
    </ErrorBoundary>

    );
 // }
}

export default App;
