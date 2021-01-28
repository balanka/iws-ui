import React, {createRef, useContext} from 'react'
import Tabs from "../tabs/Tabs";
import { AddressForm, CustomerGeneralForm,  CustomerAccountForm} from "./FormsProps";
import {accountContext} from './AccountContext'
import {CTabPane} from "@coreui/react";
import Grid from "react-fast-grid";
import {styles} from "../Tree/BasicTreeTableProps";
import {ACCOUNT} from './FormsProps';
import {Options} from '../../Tables2/LineFinancialsProps';
import EditableTable from "../../Tables2/EditableTable";

 const CustomerTabs = (props) => {
    const {current, setCurrent, accData, vatData, bankData}= props
    const value = useContext(accountContext);
    const t= value.t
    const isArray = Array.isArray (current);
    const initBankAcc=current.bankaccounts;

   

    const tableRef = createRef();
    const columns=(data, t) => [
      {field:'iban', title:t('common.iban'), initialEditValue:'', export:true}
     , {field:'bic', title:t('common.bank'), hidden:false, editComponent:({ value, onRowDataChange, rowData }) =>
             ACCOUNT ( data.hits, value, onRowDataChange, rowData, "bic" ),  initialEditValue:'', width: 20
       , align:"right", export:true}
    , {field:'owner', title:t('common.owner'),initialEditValue:current.id,  export:true}  
    , {field:'modelid', title:t('common.modelid'),initialEditValue:12, hidden:true, export:true}
    , {field:'company', title:t('common.company'),initialEditValue:current.company,  export:true} 
    ]
    const columnsX = columns(bankData, t);

    const modules= [
       {id:"0", name:'main', title:t('common.general'), ctx:"", ctx1:"", get:""
          , ctx2:"", form:'generalForm', state:'', state1:'' ,state2:'',  columns:[]},
       {id:"1", name:'address', title:t('common.address'), ctx:"", ctx1:"", get:""
          , ctx2:"", form:'addressForm', state:'', state1:'' ,state2:'',  columns:[]},
       {id:"2", name:'account', title:t('common.account'), ctx:"", ctx1:"", get:""
          , ctx2:"", form:'accountForm', state:'', state1:'' ,state2:'',  columns:[]},
          {id:"3", name:'bankAccounts', title:t('common.bankaccounts'), ctx:"/bankacc", ctx1:"", get:""
          , ctx2:"", form:'bankAccountTable', state:initBankAcc, state1:'' ,state2:'',  columns:columns}          
     ]


  const onNewLine =() => {
   const ref = tableRef.current
   ref.dataManager.changeRowEditing();
   ref.setState({ ...ref.dataManager.getRenderState(),
     showAddRow: !ref.state.showAddRow,
   });
 }

const addRow = (newData) =>{
   if(newData ) {
     const dx = {...current};
     dx.bankaccounts[dx.length] = newData;
     setCurrent({...dx});
   }
 }
 const updateRow = (newData, oldData) =>{
   if (oldData) {
    // console.log('newDataX',newData);
     const dx = {...current};
     const index = dx.bankaccounts.findIndex(obj => obj.iban === newData.iban);
     dx.bankaccounts[index] = {...newData};
     //setCurrent({...dx});
   }
 }
 const deleteRow = (oldData) =>{
   if (oldData) {
     const dx = {...current};
     const index =dx.bankaccounts.findIndex(obj => obj.lid === oldData.lid);
     const deleted = dx.bankaccounts[index];
     dx.bankaccounts[index] = {...deleted, iban:-2 };
     setCurrent({...dx});
   }
 }
     const  editable = () => ({
      onRowAdd: async (newData) => addRow(newData),
      onRowUpdate: async (newData, oldData) => updateRow(newData, oldData),
      onRowDelete: async (oldData) => deleteRow(oldData)
    })

    const  getTabContent= (module) => {
        return <GetTabContent id ={module.id} style ={{padding:0}}/>
    }
     const GetTabContent = (props) => {
           switch(props.id) {
                   case "0":
                     return (
                     <CTabPane>
                        <Grid container spacing={2} justify="space-between" style={{...styles.middleSmall}} direction="column" >
                          <CustomerGeneralForm current={current} setCurrent={setCurrent} t={t}/>
                       </Grid>
                     </CTabPane>
                    )
               case "1":
                 return ( <>
                    <CTabPane>
                    <Grid container spacing={2} justify="space-between" style={{...styles.middleSmall}} direction="column" >
                       <AddressForm current={current} setCurrent={setCurrent} t={t}/>
                     </Grid>  
                    </CTabPane>
                  </>)
              case "2":
                 return (<>
                    <CTabPane>
                    <Grid container spacing={2} justify="space-between" style={{...styles.middleSmall}} direction="column" >
                      <CustomerAccountForm current={current} setCurrent={setCurrent}  t={t}  accData={accData}
                                           vatData={vatData}/>
                    </Grid>                        
                    </CTabPane>
                 </>)
               case "3":
                  return (
                     <CTabPane>
                        <Grid container spacing={2} justify="space-between" style={{...styles.middleSmall}} direction="column" >                     
                           <EditableTable id="bankaccouts" Options ={{...Options, paging:false}} flag={false} 
                             data = {current?current.bankaccounts:[]} columns={columnsX} editable={editable()}  t={t}
                             tableRef={tableRef} edit ={null}/>
                        </Grid>                        
                    </CTabPane>                    
                  )  
               default:
                return <>NODATA</>
             }



    };
    return (<Tabs tabContent ={getTabContent} modules = {modules} style ={{padding:5}}/>)
};
export default CustomerTabs
