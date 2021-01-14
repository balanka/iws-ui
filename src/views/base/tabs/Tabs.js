import React, {Suspense} from 'react'
import {CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CCard, CCardBody, CTabs} from '@coreui/react'
import {useTranslation} from "react-i18next";
import {CrudAccount} from "../Components/CrudAccount";
import {modules} from '../../../utils/Menu';
import {useGlobalState} from '../../base/Components/AccountContext';


const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )
export const Tabs = () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const [profile, setProfile] = useGlobalState('profile');
    const { t,  } = useTranslation();
    const data =  profile?.modules?profile.modules:[];
    const modules_=modules(t).filter(m=> data.includes(m.id)|| m.id==="0")

    const getNavLink= ( module) =>{
        return (<>
                <CNavItem>
                    <CNavLink>
                        {module.title}
                    </CNavLink>
                </CNavItem>
            </>
        )}
    const  getTabPane = (module) => {
        return  <>
            <CTabPane>
                <CrudAccount url={SERVER_URL.concat(module.ctx)} get={module.get} accUrl={SERVER_URL.concat(module.ctx1)}
                             ccUrl={SERVER_URL.concat(module.ctx2)}  initialState={module.state} initAcc={module.state1}
                             initCc={module.state2} title={module.title} form={module.form} headers={module.columns}
                             modelid={module.modelid}
                 />
            </CTabPane>
        </>
    }

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
    return TabsComponent(modules_);
}
export default Tabs
