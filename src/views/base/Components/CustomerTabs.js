import React, {createRef} from 'react'
import {useTranslation} from "react-i18next";
import Tabs from "../tabs/Tabs";
import { AddressForm, CustomerGeneralForm,  CustomerAccountForm} from "./FormsProps";
import {CTabPane} from "@coreui/react";
import Grid from "react-fast-grid";
import {styles} from "../Tree/BasicTreeTableProps";
import {ACCOUNT} from './FormsProps';
import {Options} from '../../Tables2/LineFinancialsProps';
import EditableTable from "../../Tables2/EditableTable";
import useFetch from "../../../utils/useFetch";
import {initBank} from "../../../utils/Menu"

 const CustomerTabs = (props) => {
    const {current, setCurrent, accData, vatData}= props
    console.log('bankDataprops', props);
    console.log('bankcurrent', current);
    const { t,  } = useTranslation();
    const res  = useFetch("http:localhost:8080/bankacc", {});
    const resBank  = useFetch("http:localhost:8080/bank", {});
    const initBankAcc=[{iban:'', bic:'', owner:current.id, modelid:12, company:current.company }]
    const data_ = res && res.response?res.response:initBankAcc;
    const bankData = res && resBank.response?resBank.response:initBank;
    console.log('data_', data_);
    console.log('bankData', bankData);
    const tableRef = createRef();
    const columns=(data) => [
      {field:'iban', title:t('common.iban'), initialEditValue:'', export:true}
     
     , {field:'bic', title:t('common.bank'), hidden:false, editComponent:({ value, onRowDataChange, rowData }) =>
             ACCOUNT ( data, value, onRowDataChange, rowData, "bic" ),  initialEditValue:'', width: 20
       , align:"right", export:true}
    , {field:'owner', title:t('common.owner'),initialEditValue:'',  export:true}  
    ]
    const columnsX = columns(bankData);

    const modules= [
       {id:"0", name:'main', title:t('common.general'), ctx:"", ctx1:"", get:""
          , ctx2:"", form:'generalForm', state:'', state1:'' ,state2:'',  columns:[]},
       {id:"1", name:'address', title:t('common.address'), ctx:"", ctx1:"", get:""
          , ctx2:"", form:'addressForm', state:'', state1:'' ,state2:'',  columns:[]},
       {id:"2", name:'account', title:t('common.account'), ctx:"", ctx1:"", get:""
          , ctx2:"", form:'accountForm', state:'', state1:'' ,state2:'',  columns:[]},
          {id:"3", name:'bankAccounts', title:t('common.bankaccounts'), ctx:"/bankacc", ctx1:"", get:""
          , ctx2:"", form:'bankAccountTable', state:data_, state1:'' ,state2:'',  columns:columns}          
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
     data_[data_.length] = newData;
    // setCurrent({...dx});
   }
 }
 const updateRow = (newData, oldData) =>{
   if (oldData) {
    // console.log('newDataX',newData);
     const dx = {...current};
     const index = data_.findIndex(obj => obj.iban === newData.iban);
     data_[index] = {...newData};
     //setCurrent({...dx});
   }
 }
 const deleteRow = (oldData) =>{
   if (oldData) {
     const dx = {...current};
     const index =data_.findIndex(obj => obj.lid === oldData.lid);
     const deleted = data_[index];
     data_[index] = {...deleted, iban:-2 };
     //setCurrent({...dx});
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
                           <EditableTable id="LineTable" Options ={{...Options, paging:data_.length>5}} flag={true} 
                             data = {data_} columns={columnsX} editable={editable()}  t={t}
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
