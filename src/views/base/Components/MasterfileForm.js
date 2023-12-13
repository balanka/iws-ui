import React, {createRef, memo, useCallback, useLayoutEffect, useState} from 'react'
import {MASTERFILE, useStore, ACCOUNT, BANK, VAT, COSTCENTER} from './Menu';
import Grid from "react-fast-grid";
import {CommonFormHead, FormFactory} from './FormsProps'
import {ColumnFactory, RightsColumns, OptionsM, buildExportOption} from "../../Tables2/LineFinancialsProps";
import EditableTable from "../../Tables2/EditableTable";
import {styles, theme} from "../Tree/BasicTreeTableProps";
import {useTranslation} from "react-i18next";
import {Add, Edit, EditRow, Get1} from './CrudController';
import {useHistory} from "react-router-dom";
import iwsStore from './Store';
import {formEnum} from "../../../utils/FORMS";
const MasterfileForm = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { profile, menu, selected,   } = useStore();
  const { t,  } = useTranslation();
  const { token, company  } = profile
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const tableRef = createRef();
  let history = useHistory();
  let module_ = menu.get((!selected||selected==='/login')?'/cc':selected);
   module_= (typeof module_ === undefined)?COSTCENTER(t).state:module_;
  if ((typeof module_ === "undefined") || !module_ || module_.id === '11111') history.push("/login");
  const baseURL = SERVER_URL.concat(module_.ctx)
  const url = (module_.ctx===MASTERFILE.comp)?baseURL:baseURL.concat("/").concat(company);
  const accUrl = SERVER_URL.concat(MASTERFILE.acc).concat("/").concat(company);
  const vatUrl = SERVER_URL.concat(MASTERFILE.vat).concat("/").concat(company);
  const bankUrl = SERVER_URL.concat(MASTERFILE.bank).concat("/").concat(company);
  const moduleUrl = SERVER_URL.concat(MASTERFILE.module).concat("/").concat(company);
  const modifyUrl = SERVER_URL.concat(selected);
  const initialState = module_.state
  const current_ = initialState[0];
  const title = t(module_.title);
  const [, setRows] = useState([]);
  const modelid_ = module_.modelid;
  const acc_modelid= parseInt(ACCOUNT(t).id);
  const bank_modelid= parseInt(BANK(t).id);
  const vat_modelid= parseInt(VAT(t).id);
  const module_modelid= formEnum.MODULE;
  const [current,setCurrent] = useState(current_);
  const [toolbar, setToolbar] = useState(true);
  const [iwsState, setIwsState] = useState(iwsStore.initialState);
  const datax = iwsState.get(modelid_)
  const data = (typeof datax === undefined)?[]:datax;
  const submitAdd = event => {
    event.preventDefault();
    Add(modifyUrl, token, {...current}, data, setCurrent);
  };

  const submitEdit = event => {
    event.preventDefault();
    if(current.editing) {
      delete current.editing
      Edit(modifyUrl, token, {...current}, data, setCurrent);
    }else submitAdd(event)
  };
  const reload = ()=> {
    iwsStore.deleteKey(current.modelid );
    const url_= modifyUrl.concat('/').concat(current.modelid);
    url_&&Get1(url_, token,  parseInt(current.modelid));
    setCurrent(current_);
  }
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
        , true, setCurrent);
  const cancelEdit = (e) => initAdd();
  const columns = ColumnFactory(modelid_, iwsState.get(modelid_), t, profile.locale, profile.currency);
  const edit = editedRow =>{
    const isArray = Array.isArray(editedRow)&& editedRow.length>0
    const row = isArray?editedRow[0]:editedRow;
    if( row) {
      const record = data.find(obj => obj.id === row.id);
      setCurrent({...record, editing: true});
    }
  }

  const accd=iwsState.get(acc_modelid)??[];
  const bankd=iwsState.get(bank_modelid)??[];
  const vatd= iwsState.get(vat_modelid)??[];
  const moduled = iwsState.get(module_modelid)??[];
  const load = event => submitQuery(event);
  const submitQuery =(event)=>{
    event.preventDefault();
    accUrl&& (current.modelid !== acc_modelid) &&Get1(accUrl, token, acc_modelid);
    vatUrl&& (current.modelid !== vat_modelid) &&Get1(vatUrl, token, vat_modelid);
    bankUrl&&(current.modelid !== bank_modelid) &&Get1(bankUrl, token, bank_modelid);
    moduleUrl&&(current.modelid !== module_modelid) &&Get1(moduleUrl, token, module_modelid);
    url&&Get1(url, token,  current_.modelid);
    console.log('iwsState', iwsState);
  }
  const updateRow = async (newData, oldData) =>{
    if (oldData) {
      const dx = {...current};
      const idx = dx.rights.findIndex(obj => obj.moduleid === newData.moduleid);
      delete newData.tableData;
      (idx === -1)? dx.rights.push({...newData, moduleid: dx.moduleid}): dx.rights[idx]={...newData, moduleid: dx.moduleid};
      const isEditing = dx.editing;
      delete dx.editing;
      if(dx.id>0||isEditing) {
        Edit(modifyUrl, token, dx, data,  setCurrent);
      }else{
        Add(modifyUrl, token, dx, data,  setCurrent);
      }
    }
  }
  const deleteRow = async (oldData) =>{
    if (oldData) {
      const dx = {...current};
      const index =dx.rights.findIndex(obj => obj.moduleid === oldData.moduleid);
      const deleted = dx.rights[index];
      dx.rights[index] = {...deleted, moduleid:-2 };
      Edit(modifyUrl, token, dx, data(), setCurrent);
    }
  }

  const addRow = (newData) =>{
    if(newData ) {
      const dx = {...current};
      const dx1 =current.rights.length===0?
        {...current, rights:[{...current.rights.filter(e=>e.moduleid !== -1), ...newData
            , roleid:-1, moduleid:current.moduleid, short:current.short}]}:
        (dx.rights[current.rights.length] = {...newData, roleid:-1,  moduleid:current.moduleid, short:current.short,  modelid: 151})
      const record = (current.rights.length>1)?dx:dx1;
      delete record.editing;
      const result= record.id>0?Edit(modifyUrl, token, record, rights_(), setCurrent):
        Add(modifyUrl, token, record, rights_(), setCurrent)
      setCurrent(result);
    }
  }
  const OnRowAdd = async (newData) => addRow(newData)
  const  editable = () => ({onRowAdd: OnRowAdd, onRowUpdate:  updateRow, onRowDelete:  deleteRow})
  const rights_ =()=> Array.isArray(current?.rights)&&current.rights?.length >0 ? current.rights:current_.rights;

  const table = () =>  {
    return (
        <EditableTable id="LineTable" Options ={{...OptionsM, paging:rights_().length>5}} flag={false} data={rights_()}
                       columns={ RightsColumns (moduled, current_.rights[0], current,  t)} editable={editable()}  t={t}
                       tableRef={tableRef} />
    )
  }

  const onNewLine =() => {
    const ref = tableRef.current
    ref.dataManager.changeRowEditing();
    ref.setState({ ...ref.dataManager.getRenderState(),
      showAddRow: !ref.state.showAddRow,
    });
  }

  function buildForm(current){
    return <>
      <Grid container spacing={2} style={{...styles.outer }} direction="column">
        <CommonFormHead styles={styles} title={title} collapse={state.collapse} initAdd ={initAdd} initialState={initialState}
                          url={url} accUrl={accUrl}
                        cancelEdit ={cancelEdit} submitEdit={submitEdit} submitQuery= {load} reload={reload} toggle={toggle}
                        toggleToolbar={toggleToolbar}  style={{...styles.inner}}/>
        <FormFactory formid ={modelid_}  current={current} setCurrent={setCurrent} t={t} accData={accd} vatData={vatd}
                     bankData={bankd}  table = {(modelid_ ===formEnum.ROLE)?table:null} onNewLine={onNewLine}
                     collapse={state.collapse} styles={styles} style={{...styles.inner}}/>

        <Grid container spacing={2} style={{...styles.inner, display:'block' }} direction="column" >
          <EditableTable Options={{...buildExportOption("Export CSV", "Export PDF", title)
            , toolbar:toolbar, maxBodyHeight: "960px"
            , pageSize:10, pageSizeOptions:[10, 20, 50]}}  data={ data}
             columns={columns}   theme={theme} t={t}  edit ={edit} setSelectedRows ={setSelectedRows}/>
        </Grid>
      </Grid>
    </>
  }

  return buildForm(current?current:current_);

};
export default memo(MasterfileForm);
