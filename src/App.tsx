import React, {Suspense, useEffect} from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import '../public/scss/style.scss'
import {CSpinner} from "@coreui/react-pro";

// Containers
const DefaultLayout = React.lazy(() => import('./components/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./form/Login'))

const App = () => {
  useEffect(() => {
    window.process = {...window.process,}
  }, [])
  return (
    <HashRouter>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route  path="/login"  element={<Login/> } />
          <Route path="*"  element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
