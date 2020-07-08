import React, {useEffect, useState, useContext} from 'react'
import { CButton, CBadge, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CSelect, CTextarea} from '@coreui/react'
import { dateFormat, capitalize } from '../../../utils/utils';
import EnhancedTable from '../../Tables2/EnhancedTable';
import {accountContext, useGlobalState} from './AccountContext';
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import {IoMdMenu} from "react-icons/io";
import {useTranslation} from "react-i18next";
import useFetch from "../../../utils/useFetch";
import axios from "axios";
import CIcon from "@coreui/icons-react";
const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10
  }
};
const VatForm = () => {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState({collapse:true, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const [token] = useGlobalState('token');
  const UP="icon-arrow-up";
  const DOWN="icon-arrow-down";
  const value = useContext(accountContext);
  const [{ res}, doFetch]= useFetch(value.url, {});
  const [{ res2}, ] = useFetch(value.accUrl, {});
  const data_ =  res?.hits?res.hits:value.initialState;
  const accData_=  res2?.hits?res2.hits:value.accData;
  console.log('data_',data_)
  console.log('accData_',accData_)
  const current_= value.user;
  const id_ = value.user.id;
  const name_ = value.user.name;
  const description_ = value.user.description;
  const percent_= value.user.percent
  const inputaccount_= value.user.inputVatAccount;
  const outputaccount_= value.user.outputVatAccount;
  const company_= value.user.company;
  const postingdate_=value.user.postingdate;
  const changedate_=value.user.changedate;
  const enterdate_=value.user.enterdate;
  const editing_ = value.editing;
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [current,setCurrent] = useState(current_);
  const [id,setId] = useState(id_);
  const [name,setName] = useState(name_);
  const [description, setDescription] = useState(description_);
  const [percent,setPercent] = useState(percent_);
  const [inputaccount, setInputaccount] = useState(inputaccount_);
  const [outputaccount,setOutputaccount] = useState(outputaccount_);
  const [company,setCompany] = useState(company_);
  const [postingdate, setPostingdate] = useState(postingdate_);
  const [changedate, setChangedate] = useState(changedate_);
  const [enterdate, setEnterdate] = useState(enterdate_);
  const [editing, setEditing] = useState(editing_);
  useEffect(() => {}, [current, setCurrent, data, setEditing ]);
  useEffect(() => {setCurrent(current_)}, [ current_,  id, name, description,
    percent, inputaccount, outputaccount, company, enterdate, changedate, postingdate]);
  useEffect(() => { setId(id_)}, [id_, current.id ]);
  useEffect(() => { setName(name_)}, [name_, current.name ]);
  useEffect(() => { setDescription(description_)}, [description_, current.description ]);
  useEffect(() => { setPercent(percent_)}, [percent_, current.percent, data ]);
  useEffect(() => { setInputaccount(inputaccount_)}, [inputaccount_, current.inputVatAccount, data ]);
  useEffect(() => { setOutputaccount(outputaccount_)}, [outputaccount_, current.outputVatAccount, data ]);
  useEffect(() => { setCompany(company_)}, [company_, current.company ]);
  useEffect(() => { setPostingdate(postingdate_)}, [postingdate_, current.postingdate ]);
  useEffect(() => { setChangedate(changedate_)}, [changedate_, current.changedate ]);
  useEffect(() => { setEnterdate(enterdate_)}, [enterdate_, current.enterdate ]);
  useEffect(() => { setEditing(editing_)}, [editing_ ]);
  //useEffect(() => { setData(data_)}, [data_, value.data]);
  //useEffect(() => { setAccData(accData_)}, [accData_, value.accData]);
  console.log('editing', editing);
  console.log('editing_', editing_);
  console.log('valuex', value);
  console.log('company_', company);
  console.log('id', id);
  console.log('name', name);
  console.log('description', description);
  console.log('id_', id_);
  console.log('name_', name_);
  console.log('description_', description_);

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  const submitGet = (url, func) => {
    console.log('authorization2', token);
    let res=null
    axios.get( url, {headers: {'authorization':token}})
      .then(response => {
        console.log('response.data', response.data);
        console.log('response.headers', response.headers);
        const resp = response.data
        res=resp
        func(resp)
        return resp;
      }).catch(function (error) {
      console.log('error', error);
    });
    return res;
  }
  const toggle= ()=> {
    setState({ ...state, collapse:!state.collapse });
  }

  const initAdd =()=> {
    const row = {...value.initialState, editing:false};
     setEditing(false);
    value.editRow(row, false);
    setCurrent(row);
  };
  const cancelEdit = (e) => {
   // e.preventDefault();
    initAdd();
    setSelected([]);
  };
  const submitQuery = event => {

    const fetchData =(url_, func)=>{
      const res = submitGet(url_, func);
      console.log("resx", res);
      const datax = res?.hits ? res.hits : value.initialState;
      return datax;
    }
    const datax = fetchData(value.url, setData);
   const r = fetchData(value.accUrl, setAccData);
    if(datax.length>0) setCurrent(data_[0])
    event.preventDefault();
  };
  const [filteredRows, setFilteredRows] = useState(data);
  useEffect(() => {handleFilter('')}, [data]);

  function handleFilter(text) {
    const  filtered = data.hits.filter(function(rc) {
      return (rc.id.indexOf(text)>-1
        ||rc.name.indexOf(text)>-1
        ||rc.description.indexOf(text)>-1
        ||rc.percent.toString().indexOf(text)>-1
        ||rc.inputVatAccount.indexOf(text)>-1
        ||rc.outputVatAccount.indexOf(text)>-1
        ||rc.enterdate.indexOf(text)>-1
        ||rc.postingdate.indexOf(text)>-1
        ||rc.changedate.indexOf(text)>-1
        ||rc.company.indexOf(text)>-1)}
        );
    const rows_=text?filtered:data.hits
    //console.log('filteredRows+', rows_);
    setFilteredRows(rows_);
  }

  const edit = id =>{
    const record = filteredRows.find(obj => obj.id === id);
    value.editRow(record);
  }
  const handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    //const namex=name
    const method="set"+capitalize(name)
    console.log("method", method);
    console.log("namea", name);
    console.log("valuea", value);
    const row = Object.assign(current, {namex:value});
     eval(method)(value);
    console.log('currentz', row);
    console.log('currentz', current);
    setCurrent(row);
  };
  const mapping = item => <option key={item.id} value={item.id}>
    {item.id+ " ".concat (item.name)}</option>;

  const submitEdit = event => {
    event.preventDefault();
    //console.log("submitEdit1 current", current);
    const row = {id:id, name:name, description:description, percent:percent, inputVatAccount:inputaccount
      ,   outputVatAccount:outputaccount, enterdate:enterdate, postingdate:postingdate, changedate:changedate
      ,  company:company, modelid:current.modelid};
    //console.log("submitEdit1 current", row);
    setCurrent(row);
    value.submitEdit(row, data);
    //console.log("submitEdit current", current);
  };

  const submitAdd = event => {
    event.preventDefault();
    //console.log("submitAdd1 current", current);
    const row = {id:id, name:name, description:description, percent:percent, inputVatAccount:inputaccount
      , outputVatAccount:outputaccount, enterdate:current_.enterdate, postingdate:current_.postingdate
      , changedate:current_.changedate, company:current_.company, modelid:current.modelid};
    value.submitAdd(row, data);
    setCurrent(row);
  };

  function buildForm(current1){
    const addOrEdit = (typeof current1.editing==='undefined')?editing:current1.editing;
    const submit = addOrEdit ? submitEdit : submitAdd
    const props = {
      title: value.title, columns: value.headers, rows: filteredRows, edit: edit, submit: submit, selected: selected
      , editable:true, setSelected: setSelected, cancel: cancelEdit, handleFilter: handleFilter, rowsPerPageOptions: [5, 15, 25, 100]
    }
    return <>
      <Grid container spacing={2} style={{...styles.outer, padding: 20, 'background-color':blue }} direction="column" >
        <CForm  className="form-horizontal" onSubmit={ addOrEdit?submitEdit:submitAdd} style={{padding:0}}>
          <Grid container justify="space-between">
            <Grid container xs spacing={1} justify="flex-start">
              <Grid item justify="center" alignItems="center">
                <IoMdMenu />
              </Grid>
              <Grid item><h5><CBadge color="primary">{value.title}</CBadge></h5></Grid>
            </Grid>
            <Grid item justify="flex-end" alignItems="center">
              <CButton block color="success" type="submit"  style={{ align: 'right' }}  onClick={event => {
                console.log("token", token)
                event.preventDefault(); submitQuery(event)
              }}>
              </CButton>
              <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                <CIcon name={ state.collapse ? "cil-arrow-top" : "cil-arrow-bottom"} />
              </CButton>
            </Grid>
          </Grid>
          <CCollapse show={state.collapse} id="collapse" style={{padding: 2}}>
            <CFormGroup row style={{height:15 }}>
              <CCol sm="2">
                <CLabel size="sm" htmlFor="input-small">{t('vat.id')}</CLabel>
              </CCol>
              <CCol sm="4">
                <CInput bsSize="sm" type="text" id="account-id" name="id" className="input-sm"
                        placeholder="Id" value= {id} onChange={handleInputChange} />
              </CCol>
              <CCol sm="2">
                <CLabel size="sm" htmlFor="input-small">{t('vat.enterdate')}</CLabel>
              </CCol>
              <CCol sm="2">
                <CInput disabled bsSize="sm" type="text"  id="enterdate-id" name="enterdate"
                        className="input-sm" placeholder="date"
                        value={dateFormat(current.enterdate, "dd.mm.yyyy")}
                        style={{'text-align':'right', padding:2 }}/>
              </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
              <CCol sm="2">
                <CLabel size="sm" htmlFor="input-small">{t('vat.name')}</CLabel>
              </CCol>
              <CCol sm="4">
                <CInput bsSize="sm" type="text" id="name-input" name="name" className="input-sm"
                        placeholder="Name" value={name} onChange={handleInputChange} />
              </CCol>
              <CCol sm="2">
                <CLabel size="sm" htmlFor="input-small">{t('vat.changedate')}</CLabel>
              </CCol>
              <CCol sm="2">
                <CInput disabled bsSize="sm"  type="text"  id="changedate-id" name="changedate"
                        className="input-sm" placeholder="date"
                        value={dateFormat(current.changedate, "dd.mm.yyyy")}
                        style={{'text-align':'right', padding:2 }}/>
              </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
              <CCol sm="2">
                <CLabel size="sm" htmlFor="input-small">{t('vat.input_account')}</CLabel>
              </CCol>
              <CCol sm="4">
                <CSelect className ="flex-row" type="select" name="inputaccount" id="inputaccount-id"
                        value={inputaccount} onChange={handleInputChange} >
                  {accData.hits.map(item => mapping(item))};

                </CSelect>

              </CCol>
              <CCol sm="2">
                <CLabel size="sm" htmlFor="input-small">{t('vat.postingdate')}</CLabel>
              </CCol>
              <CCol sm="2">
                <CInput disabled bsSize="sm" type="text" id="input-small" name="postingdate" className="input-sm" placeholder="date"
                        value={dateFormat(current.postingdate, "dd mm yy")}
                        style={{'text-align':'right', padding:2 }}/>
              </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
              <CCol sm="2">
                <CLabel size="sm" htmlFor="input-small">{t('vat.output_account')}</CLabel>
              </CCol>
              <CCol sm="4">
                <CSelect className ="flex-row" type="select" name="outputaccount" id="outputaccount-id"
                        value={outputaccount} onChange={handleInputChange} >
                  {accData.hits.map(item => mapping(item))};
                </CSelect>
              </CCol>
              <CCol md="1">
                <CLabel size="sm" htmlFor="input-small">{t('vat.percent')}</CLabel>
              </CCol>
              <CCol sm="1">
                <CInput  bsSize="sm" type="text" id="percent-id" name="percent"  className="input-sm" placeholder="percent" value={percent} onChange={handleInputChange} />
              </CCol>
              <CCol sm="1">
                <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
              </CCol>
              <CCol sm="1">
                <CInput disabled bsSize="sm" type="text" id="company-id" name="company" className="input-sm" placeholder="company" value={company} onChange={handleInputChange} />
              </CCol>

            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
              <CCol md="2">
                <CLabel htmlFor="textarea-input">{t('vat.description')}</CLabel>
              </CCol>
              <CCol xs="12"   md="9">
                <CTextarea type="textarea" name="description" id="description-id" rows="1"
                        placeholder="Content..." value={description} onChange={handleInputChange} />
              </CCol>
            </CFormGroup>
          </CCollapse>
         </CForm>
      </Grid>
      <EnhancedTable props={props} style={{padding: 0, height: 50}}/>
 </>
  }

  return buildForm(current);

};
export default VatForm
