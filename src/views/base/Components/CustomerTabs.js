import React, {createRef} from 'react'
import Tabs from "../tabs/Tabs";
import {
    AddressForm,
    CustomerGeneralForm,
    CustomerAccountForm,
    CompanyAccountForm,
    CompanyGeneralForm
} from "./FormsProps";
import {CTabPane} from "@coreui/react";
import {OptionsM} from '../../Tables2/LineFinancialsProps';
import EditableTable from "../../Tables2/EditableTable";
import {styles} from "../Tree/BasicTreeTableProps";
import {formEnum} from "../../../utils/FORMS";
import {Autocomplete} from "./Autocomplete";

 const CustomerTabs =  (props) => {
    const {formid, current, setCurrent, accData, vatData, bankData, t}= props
    const initBankAcc = current.bankaccounts;
    const tableRef = createRef();
    const columns=(data, t) => [
      {field:'id', title:t('common.iban'), initialEditValue:'', minWidth:40, maxWidth:100, export:true}
    , {field:'bic', title:t('common.bank'), hidden:false, editComponent:tableData => Autocomplete ( data, tableData)
    ,  initialEditValue:'', minWidth:100, align:"right", export:true}
    , {field:'owner', title:t('common.owner'),initialEditValue:current.id,  minWidth:5,  export:true}
    , {field:'modelid', title:t('common.modelid'),initialEditValue:12, hidden:true, export:true}
    , {field:'company', title:t('common.company'),initialEditValue:current.company,  minWidth:5, editable:'never', export:true }
    ]
    const columnsX = columns(bankData, t);
    const modules= [
       {id:"0", name:'main', title:t('common.general'), ctx:"", ctx1:"", get:""
          , ctx2:"", form:'generalForm', state:'', state1:'' ,state2:'',  columns:[]}
      , {id:"1", name:'address', title:t('common.address'), ctx:"", ctx1:"", get:""
          , ctx2:"", form:'addressForm', state:'', state1:'' ,state2:'',  columns:[]}
      , {id:"2", name:'account', title:t('common.account'), ctx:"", ctx1:"", get:""
          , ctx2:"", form:'accountForm', state:'', state1:'' ,state2:'',  columns:[]}
      ,  {id:"3", name:'bankAccounts', title:t('common.bankaccounts'), ctx:"/bankacc", ctx1:"", get:""
      , ctx2:"", form:'bankAccountTable', state:initBankAcc, state1:'' ,state2:'',  columns:columns}
     ]

/*
  const onNewLine =() => {
   const ref = tableRef.current
   ref.dataManager.changeRowEditing();
   ref.setState({ ...ref.dataManager.getRenderState(),
     showAddRow: !ref.state.showAddRow,
   });
 }
 */

const addRow = (newData) =>{
  console.log('newData', newData);
   if(newData ) {
     const dx = {...current};
     dx.bankaccounts[dx.bankaccounts.length] = {...newData, owner:current.id, modelid:12};
     setCurrent({...dx});
   }
 }
 const updateRow = (newData, oldData) =>{
  console.log('newData', newData);
   if (oldData) {
     const dx = {...current};
     const index = dx.bankaccounts.findIndex(obj => obj.id === oldData.id);
     dx.bankaccounts[index] = {...newData, owner:current.id, modelid:12};
     setCurrent({...dx});
   }
 }
 const deleteRow = (oldData) =>{
   console.log('oldData', oldData);
   if (oldData) {
     const dx = {...current};
     const index =dx.bankaccounts.findIndex(obj => obj.id === oldData.id);
     console.log('index', index);
     const deleted = dx.bankaccounts[index];
     console.log('deleted', deleted);
     dx.bankaccounts[index] = {...deleted, modelid:-1 };
     setCurrent({...dx});
   }
 }
     const  editable = () => ({
      onRowAdd: async (newData) => addRow(newData),
      onRowUpdate: async (newData, oldData) => updateRow(newData, oldData),
      onRowDelete: async (oldData) => deleteRow(oldData)
    })

  const  getTabContent= (module) => <GetTabContent id ={module.id}/>
  const wrapIt =(component) => <CTabPane style ={{...styles.middle, 'paddingTop':5}}>{component}</CTabPane>
  const getForm =(formid)=>{
      switch(formid) {
         case formEnum.CUSTOMER:
        case formEnum.SUPPLIER:
              return wrapIt(<CustomerGeneralForm current={current} setCurrent={setCurrent} t={t}/>);
         case formEnum.COMPANY:
              return wrapIt(<CompanyGeneralForm current={current} setCurrent={setCurrent} t={t}/>);
          default:
              return <>Invalid Tab</>
      }
  }
     const getAccountForm =(formid)=>{
         switch(formid) {
             case formEnum.CUSTOMER:
             case formEnum.SUPPLIER:
                 return wrapIt(<CustomerAccountForm current={current} setCurrent={setCurrent}
                                  t={t}  accData={accData} vatData={vatData}/>);
             case formEnum.COMPANY:
                 return wrapIt(<CompanyAccountForm current={current} setCurrent={setCurrent}
                            t={t}  accData={accData} vatData={vatData}/>);
             default:
                 return <>Invalid Tab</>
         }
     }
   const GetTabContent = (props) => {
         switch(props.id) {
           case "0":
              return getForm(formid);
           case "1":
              return wrapIt( <AddressForm current={current} setCurrent={setCurrent} t={t}/>)
           case "2":
              return getAccountForm(formid);
           case "3":
             return wrapIt(
                     <EditableTable id="bankaccouts" Options ={{...OptionsM, paging:false}} flag={false}
                         data = {current?current.bankaccounts:[]} columns={columnsX} editable={editable()}  t={t}
                        tableRef={tableRef}/>)
            default:
              return <>NODATA</>
             }
    };
 return (<Tabs tabContent ={getTabContent} modules = {modules} style ={{...styles.outer, padding:0}}/>)
};
export default CustomerTabs
