import React, {memo, useCallback, useLayoutEffect, useState} from 'react'
import {MASTERFILE, useStore, ACCOUNT, BANK, VAT} from './Menu';
import Grid from "react-fast-grid";
import {CommonFormHead, FormFactory} from './FormsProps'
import {ColumnFactory, OptionsM} from "../../Tables2/LineFinancialsProps";
import EditableTable from "../../Tables2/EditableTable";
import {styles, theme} from "../Tree/BasicTreeTableProps";
import {useTranslation} from "react-i18next";
import {Add, Edit, EditRow, Get1} from './CrudController';
import {useHistory} from "react-router-dom";
import iwsStore from './Store';
const MasterfileForm = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { profile, menu, selected,   } = useStore()
  const { token  } = profile
  console.log('selected', selected);
  console.log('profile', profile);
  console.log('TOKEN', token);
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  let history = useHistory()
  const datax =  profile?.modules?profile.modules:[];
  const module_= menu.get(selected);
  console.log('datax', datax);
  console.log('module_', module_);
  const modules_=(datax.includes(module_.id)|| (module_.id==="0"))?module_:menu.get('/login')
  if(modules_.id==='0') history.push("/login");
  const url=SERVER_URL.concat(module_.ctx);
  const accUrl=SERVER_URL.concat(MASTERFILE.accURL);
  const vatUrl=SERVER_URL.concat(MASTERFILE.vatURL);
  const bankUrl=SERVER_URL.concat(MASTERFILE.bankURL);
  const modifyUrl=SERVER_URL.concat(selected);
  const initialState = module_.state
  const current_= initialState[0];
  const title =module_.title
  const { t,  } = useTranslation();
  const [, setRows] = useState([])
  const modelid_ = module_.modelid;
  console.log(`modelid_: ${modelid_}`);
  const acc_modelid= parseInt(ACCOUNT(t).id);
  const bank_modelid= parseInt(BANK(t).id);
  const vat_modelid= parseInt(VAT(t).id);
  console.log(`bankUrl: ${bankUrl}`);

  const [current,setCurrent] = useState(current_);
  const [toolbar, setToolbar] = useState(true);
  const [iwsState, setIwsState] = useState(iwsStore.initialState);
  const data = iwsState.get(current.modelid)

  const submitAdd = event => {
    event.preventDefault();
    Add(url, token, {...current}, data, setCurrent);
  };
  const submitEdit = event => {
    event.preventDefault();
    if(current.editing) {
      delete current.editing
      Edit(modifyUrl, token, {...current}, data, setCurrent);
    }else submitAdd(event)
  };
  const handleKeyPress = useCallback((event) => {
    if (event.ctrlKey && (event.key === "s"||event.key === "S")) {
      submitEdit(event);
    }
  } );
  useLayoutEffect(() => {
      iwsStore.subscribe(setIwsState);
      // attach the event listener
      document.addEventListener('keydown', handleKeyPress);
      // remove the event listener
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, [current, data, handleKeyPress ]);
  const toggleToolbar= ()=> setToolbar(!toolbar );
  const toggle= ()=> setState({...state, collapse:!state.collapse });
  const setSelectedRows = (rows_)=>setRows(rows_.map( item =>item.id))
  const initAdd =()=> EditRow({...initialState[0], company:profile.company, currency:profile.currency, editing:false}
        , false, setCurrent);
  const cancelEdit = (e) => initAdd();
  const columns = ColumnFactory(modelid_, iwsState.get(current.modelid), t);
  const edit = editedRow =>{
    const record = data.find(obj => obj.id === editedRow.id);
    const row = {...record, editing:true}
    setCurrent(row);
  }



  const accd=iwsState.get(acc_modelid)?iwsState.get(acc_modelid):[];
  const bankd=iwsState.get(bank_modelid)?iwsState.get(bank_modelid):[];
  const vatd= iwsState.get(vat_modelid)?iwsState.get(vat_modelid):[];

  const load = event => submitQuery(event);
  const submitQuery =(event)=>{
    event.preventDefault();
    accUrl&& (current.modelid !== acc_modelid) &&Get1(accUrl, token, acc_modelid);
    vatUrl&& (current.modelid !== vat_modelid) &&Get1(vatUrl, token, vat_modelid);
    bankUrl&&(current.modelid !== bank_modelid) &&Get1(bankUrl, token, bank_modelid);
    url&&Get1(url, token,  current_.modelid);
    console.log('iwsState', iwsState);
  }

  function buildForm(current){
    return <>
      <Grid container spacing={2} style={{...styles.outer }} direction="column">
        <CommonFormHead styles={styles} title={title} collapse={state.collapse} initAdd ={initAdd} initialState={initialState}
                          url={url} accUrl={accUrl}
                        cancelEdit ={cancelEdit} submitEdit={submitEdit} submitQuery= {load} toggle={toggle}
                        toggleToolbar={toggleToolbar}  style={{...styles.inner}}/>
        <FormFactory formid ={modelid_}  current={current} setCurrent={setCurrent} t={t} accData={accd} vatData={vatd}
                     bankData={bankd} collapse={state.collapse} styles={styles} style={{...styles.inner}}/>

        <Grid container spacing={2} style={{...styles.inner, display:'block' }} direction="column" >
          <EditableTable Options={{...OptionsM, toolbar:toolbar, maxBodyHeight: "960px"
            , pageSize:10, pageSizeOptions:[10, 20, 50]}}  data={ data}
             columns={columns}   theme={theme} t={t}  edit ={edit} setSelectedRows ={setSelectedRows}/>
        </Grid>
      </Grid>
    </>
  }

  return buildForm(current);

};
export default memo(MasterfileForm);
