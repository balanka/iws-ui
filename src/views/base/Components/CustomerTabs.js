import React from 'react'
import {useTranslation} from "react-i18next";
import Tabs from "../tabs/Tabs";
import { AddressForm, CustomerGeneralForm,  CustomerAccountForm} from "./FormsProps";
import {CTabPane} from "@coreui/react";
import Grid from "react-fast-grid";
import {styles} from "../Tree/BasicTreeTableProps";

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
                     return (
                     <CTabPane>
                        <Grid container spacing={2} justify="space-between" style={{...styles.middle}} direction="column" >
                          <CustomerGeneralForm current={current} setCurrent={setCurrent} t={t}/>
                       </Grid>
                     </CTabPane>
                    )
               case "1":
                 return ( <>
                    <CTabPane>
                    <Grid container spacing={2} justify="space-between" style={{...styles.middle}} direction="column" >
                       <AddressForm current={current} setCurrent={setCurrent} t={t}/>
                     </Grid>  
                    </CTabPane>
                  </>)
              case "2":
                 return (<>
                    <CTabPane>
                    <Grid container spacing={2} justify="space-between" style={{...styles.middle}} direction="column" >
                      <CustomerAccountForm current={current} setCurrent={setCurrent}  t={t}  accData={accData}
                                           vatData={vatData}/>
                    </Grid>                        
                    </CTabPane>
                 </>)
               default:
                return <>NODATA</>
             }



    };
    return (<Tabs tabContent ={getTabContent} modules = {modules}/>)
};
export default CustomerTabs
