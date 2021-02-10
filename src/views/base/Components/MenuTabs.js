import React from 'react'
import {useTranslation} from "react-i18next";
import {modules} from './Menu';
import {useGlobalState} from './AccountContext';
import Tabs from "../tabs/Tabs";
import {CTabPane} from "@coreui/react";
import CrudAccount from "./CrudAccount";

 const MenuTabs = () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const [profile, setProfile] = useGlobalState('profile');
    const { t,  } = useTranslation();
    const data =  profile?.modules?profile.modules:[];
    const modules_= modules(t).filter(m=> data.includes(m.id)|| m.id==="0")
    const  getTabContent= (module) => <GetCrudTabContent module ={module} SERVER_URL ={SERVER_URL}/>
    const GetCrudTabContent = ({module, SERVER_URL}) => {
       return  <>
          <CTabPane>
             <CrudAccount url={SERVER_URL.concat(module.ctx)} get={module.get} accUrl={SERVER_URL.concat(module.ctx1)}
                          ccUrl={SERVER_URL.concat(module.ctx2)} bankUrl={SERVER_URL.concat(module.ctx3)}
                          initialState={module.state} initAcc={module.state1} initCc={module.state2}
                   title={module.title} form={module.form} headers={module.columns} modelid={module.modelid}
             />
          </CTabPane>
       </>
    };

    return <Tabs tabContent ={getTabContent} modules = {modules_}/>
}
export default MenuTabs
