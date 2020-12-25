import React, {useEffect, useState, useContext} from 'react'
import { CButton, CBadge, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CSelect, CTextarea} from '@coreui/react'
import {dateFormat} from "../../../utils/utils"
import {accountContext, useGlobalState} from './AccountContext';
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import useFetch from "../../../utils/useFetch";
import {ColumnsACC as columns, filter, OptionsM, FormHead, AccountMainForm} from "../../Tables2/LineFinancialsProps";
import EditableTable from "../../Tables2/EditableTable";
import {styles, rowStyle, theme} from "../Tree/BasicTreeTableProps";

const AccountForm = () => {
  const [profile, ] = useGlobalState('profile');
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const value = useContext(accountContext);
  const t = value.t
  const [{ res}, ]= useFetch(value.url, {});
  const [{ res2 }, ] = useFetch(value.accUrl, {});
  const data_ =  res?.hits?res.hits:value.initialState;
  const accData_=  res2?.hits?res2.hits:value.accData;
  const current_= value.user;
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [current,setCurrent] = useState(current_);
  const [toolbar, setToolbar] = useState(true);
  useEffect(() => {}, [current, setCurrent, data]);
  useEffect(() => {setCurrent(current_)}, [current_]);

  const toggleToolbar= ()=> setToolbar(!toolbar );
  const toggle= ()=> setState({...state, collapse:!state.collapse });

  const initAdd =()=> {
    const row = {...value.initialState.hits[0], company:profile.company, editing:false};
    value.editRow(row, false);
    setCurrent(row);
  };
  const cancelEdit = (e) => initAdd();
  const columnsX = columns(accData.hits, value.initialState, current, t);
  const getColumnName = ()=>columnsX.map(col =>col.field);

  const [filteredRows, setFilteredRows] = useState(data);
  useEffect(() => {handleFilter('')}, [data]);

  function handleFilter(text) {
    const rows_=text?filter(data.hits, getColumnName(), text ):data.hits
    setFilteredRows(rows_);
  }
  const edit = editedRow =>{
    const record = filteredRows.find(obj => obj.id === editedRow.id);
    const row = {...record, editing:true}
    setCurrent(row);
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

  function buildForm(current){
    return <>
       <Grid container spacing={2} style={{...styles.outer }} direction="column" >
        <FormHead styles={styles} title={value.title} state={state} initAdd ={initAdd} setData={setData} setAccData={setAccData}
                  url={value.url} accUrl={value.accUrl} initialState cancelEdit ={cancelEdit} submitEdit={submitEdit}
                  submitQuery= {value.submitQuery} toggle={toggle} toggleToolbar={toggleToolbar}  />
         <Grid container spacing={2} style={{...styles.middle, 'background-color':blue }} direction="column" >
            <CCollapse show={state.collapse} id="JScollapse" >
              <AccountMainForm current={current} setCurrent={setCurrent} t={t} accData={accData} />
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
export default AccountForm;
/*
<Grid container spacing={2} justify="space-between" style={{...styles.inner}} direction="column" >
           <Grid container justify="space-between">
            <Grid container xs spacing={1} justify="flex-start">
              <Grid item justify="center" alignItems="center">
                <IoMdMenu />
              </Grid>
              <Grid item><h5><CBadge color="primary">{value.title}</CBadge></h5></Grid>
              <Grid  container xs spacing={1} justify="flex-end" alignItems="right">
              <div className="card-header-actions" style={{  align: 'right' }}>
                <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => cancelEdit(e)}>
                  <FontAwesomeIcon icon={faWindowClose} />
                </CButton>
              </div>
                <div className="card-header-actions" style={{  align: 'right' }}>
                  <CButton color="link" className="card-header-action btn-minimize" onClick={initAdd}>
                    <FontAwesomeIcon icon={faPlusSquare} />
                  </CButton>
                </div>
                <div className="card-header-actions" style={{  align: 'right' }}>
                  <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => submitEdit(e)}>
                    <FontAwesomeIcon icon={faSave} />
                  </CButton>
                </div>
                <div>
                <CButton block color="link" type="submit"  className="card-header-action btn-minimize" onClick={event => {
                  event.preventDefault(); value.submitQuery(event, value.accUrl, setAccData, value.initAcc);
                  value.submitQuery(event, value.url, setData, value.initialState);}}>
                  <FontAwesomeIcon icon={faSpinner} rotation={90}/>
                </CButton>
              </div>
              <div className="card-header-actions" style={{  align: 'right' }}>
                <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                  <FontAwesomeIcon icon={state.collapse ?faAngleDoubleUp:faAngleDoubleDown} />
                </CButton>
              </div>
              <div className="card-header-actions" style={{  align: 'right' }}>
                <CButton color="link" className="card-header-action btn-minimize" onClick={toggleToolbar}>
                  <FontAwesomeIcon icon={faPlusCircle} />
                </CButton>
              </div>
            </Grid>
           </Grid>
         </Grid>
         </Grid>
 */

