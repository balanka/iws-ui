import React, {Suspense} from 'react'
import { Navigate,  Route, Routes } from 'react-router-dom'
import {CSpinner } from '@coreui/react-pro'
import routes from '../routes'

const createLazy = (importCompnent:any)=> {
    const Content = React.lazy(importCompnent)
    const spinner = <CSpinner color="primary" />
    return (props: any) => <Suspense fallback={spinner}><Content {...props}  style={{ paddingLeft: 5, paddingRight:5 }}/></Suspense>
}
const AppContent = () => {
  return (
     // <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes().map((route:{path:string, name?:string, element?:any }, idx) => {
              const LazyComponent = createLazy(route.element)
              return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                    // @ts-ignore
                   exact={true}
                  element={<LazyComponent />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    // </CContainer>
  )
}
export default AppContent
