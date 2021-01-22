import React from 'react'
import {useTranslation} from "react-i18next";
import Tabs from "../tabs/Tabs";
import { AddressForm, CustomerGeneralForm,  CustomerAccountForm} from "../../Tables2/LineFinancialsProps";
import {CTabPane} from "@coreui/react";

 const CustomerTabs = (props) => {
    const {current, setCurrent, accData, vatData}= props
    const { t,  } = useTranslation();
    const modules= [
       {id:"0", name:'main', title:t('common.general'), ctx:"", ctx1:"", get:""
          , ctx2:"", form:'generalForm', state:'', state1:'' ,state2:'',  columns:[]},
       {id:"1", name:'address', title:t('common.address'), ctx:"", ctx1:"", get:""
          , ctx2:"", form:'addressForm', state:'', state1:'' ,state2:'',  columns:[]},
       {id:"2", name:'account', title:t('common.account'), ctx:"", ctx1:"", get:""
          , ctx2:"", form:'accountForm', state:'', state1:'' ,state2:'',  columns:[]}
     ]
    const  getTabContent= (module) => {
        return <GetTabContent id ={module.id} />
    }
     const GetTabContent = (props) => {
           switch(props.id) {
                   case "0":
                 return (<>
                     <CTabPane>
                       <CustomerGeneralForm current={current} setCurrent={setCurrent} t={t}/>
                     </CTabPane>
                    </>)
               case "1":
                 return (<>
                    <CTabPane>
                       <AddressForm current={current} setCurrent={setCurrent} t={t}/>
                    </CTabPane>
                 </>)
              case "2":
                 return (<>
                    <CTabPane>
                      <CustomerAccountForm current={current} setCurrent={setCurrent}  t={t}  accData={accData}
                                           vatData={vatData}/>
                    </CTabPane>
                 </>)
               default:
                return <>NODATA</>
             }



    };
    return (<Tabs tabContent ={getTabContent} modules = {modules}/>)
};
export default CustomerTabs
