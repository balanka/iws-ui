import React, {useEffect, useState, useContext} from 'react'
import { CButton, CBadge, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CSelect, CTextarea} from '@coreui/react'
import { dateFormat } from '../../../utils/utils';
import {accountContext, useGlobalState} from './AccountContext';
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import useFetch from "../../../utils/useFetch";

import EditableTable from "../../Tables2/EditableTable";
import {ColumnsV as columns, filter, FormHead, VatMainForm, OptionsM} from "../../Tables2/LineFinancialsProps";
import {styles, rowStyle, theme} from "../Tree/BasicTreeTableProps";

const VatForm = () => {
  const [profile, ] = useGlobalState('profile');
  const [state, setState] = useState({collapse:true, fadeIn: true, timeout: 300});
  const value = useContext(accountContext);
  const t = value.t
  const [{ res}]= useFetch(value.url, {});
  const [{ res2}] = useFetch(value.accUrl, {});
  const data_ =  res?.hits?res.hits:value.initialState;
  const accData_=  res2?.hits?res2.hits:value.accData;
  const current_= value.user;
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [current,setCurrent] = useState(current_);
  const [toolbar, setToolbar] = useState(true);
  useEffect(() => {}, [current, setCurrent, data ]);
  useEffect(() => {setCurrent(current_)}, [ current_]);

  const toggleToolbar= ()=> setToolbar(!toolbar );
  const toggle= ()=> setState({ ...state, collapse:!state.collapse });
  const initAdd =()=> setCurrent({...value.initialState.hits[0], company:profile.company, editing:false});
  const cancelEdit = (e) => {
    e.preventDefault();
    initAdd();
    //setSelected([]);
  };
  const columnsX = columns(accData.hits, value.initialState, current, t);
  const getColumnName =()=>columnsX.map(col =>col.field);

  const [filteredRows, setFilteredRows] = useState(data);
  useEffect(() => {handleFilter('')}, [data]);

  function handleFilter(text) {
    const rows_=text?filter(data.hits, getColumnName(), text ):data.hits
    setFilteredRows(rows_);
  }

  const edit = editedRow =>{
    const record = filteredRows.find(obj => obj.id === editedRow.id);
    setCurrent({...record, editing:true});
  }


  const mapping = item => <option key={item.id} value={item.id}>
    {item.id+ " ".concat (item.name)}</option>;

  const submitEdit = event => {
    event.preventDefault();
    if(current.editing) {
      const row = {...current}
        setCurrent(row);
       value.submitEdit(row, data);
    } else submitAdd(event)
  };

  const submitAdd = event => {
    event.preventDefault();
    const row = {...current};
    value.submitAdd(row, data);
    setCurrent(row);
  };



  function buildForm(current1) {
    const current =current1
    return <>
       <Grid container spacing={2} style={{...styles.outer }} direction="column" >
         <FormHead styles={styles} title={value.title} state={state} initAdd ={initAdd} setData={setData} setAccData={setAccData}
                   url={value.url} accUrl={value.accUrl} initialState cancelEdit ={cancelEdit} submitEdit={submitEdit}
                   submitQuery= {value.submitQuery}  toggle={toggle} toggleToolbar={toggleToolbar}  />

       <Grid container spacing={2} style={{...styles.middle, 'background-color':blue }} direction="column" >
          <CCollapse show={state.collapse} id="collapse" style={{padding: 2}}>
            <VatMainForm current={current} setCurrent={setCurrent} t={t} accData={accData} />
          </CCollapse>
      </Grid>
      <Grid container spacing={2} style={{...styles.inner, 'background-color':blue }} direction="column" >
      <EditableTable Options={{...OptionsM, toolbar:toolbar}}  data={filteredRows} columns={columnsX} rowStyle={rowStyle}
                     selected ={[-1]} theme={theme} t={t}  edit ={edit}/>
     </Grid>
   </Grid>
    </>
  }

  return buildForm(current);

};
export default VatForm;
