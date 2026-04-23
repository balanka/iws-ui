import React, {Suspense, useEffect} from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import '../public/scss/style.scss'
import {CSpinner} from "@coreui/react";


// const loading = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// )

// Containers
const DefaultLayout = React.lazy(() => import('./components/DefaultLayout'))
//const DefaultLayout = React.lazy(() => import('./components/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./form/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  useEffect(() => {
    window.process = {
      ...window.process,
    }
  }, [])
  return (
    <HashRouter>
      <Suspense fallback={<CSpinner color="primary" />}>
      {/*<Suspense fallback={loading}>*/}
        <Routes>
          <Route  path="/login"  element={<Login/> } />
          {/*<Route exact path="/register" name="Register Page" element={<Register />} />*/}
          {/*<Route exact path="/404" name="Page 404" element={<Page404 />} />*/}
          {/*<Route exact path="/500" name="Page 500" element={<Page500 />} />*/}
          <Route path="*"  element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
