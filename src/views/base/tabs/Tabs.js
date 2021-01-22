import React, {Suspense} from 'react'
import {CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CCard, CCardBody, CTabs} from '@coreui/react'

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

export const Tabs = (props) => {
    const { tabContent, modules} = props
   // console.log('modulesAA', modules);
    //const [state, setState] = useState(modules?modules:[])
    const getNavLink= ( module) =>{
        return (<>
                <CNavItem>
                    <CNavLink>
                        {module.title}
                    </CNavLink>
                </CNavItem>
            </>
        )}
    const  getTabPane = (props) => tabContent(props)

    const getContent = ( items) => {
        return <>
            <CNav variant="tabs">
                {items.map(item => getNavLink(item))}
            </CNav>
            <CTabContent fade={false}>
                {items.map(item => getTabPane(item))}
            </CTabContent>
        </>
    }

    const TabsComponent = (items) => {
        return (
            <CRow>
                <CCol xs="12" md="12" className="mb-4">
                    <CCard>
                        <CCardBody>
                            <CTabs>
                               <Suspense fallback={loading}>
                                  {getContent (items)}
                                </Suspense>    
                            </CTabs>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
    return TabsComponent(modules);
}
export default Tabs
