import React, {useEffect, useState, useContext} from 'react'
import { CButton, CBadge, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CSelect, CTextarea} from '@coreui/react'
import {accountContext, useGlobalState} from './AccountContext';
import EnhancedTable from '../../Tables2/EnhancedTable';
import blue from "@material-ui/core/colors/blue";
import Grid from "react-fast-grid";
import {IoMdMenu} from "react-icons/io";
import {useTranslation} from "react-i18next";
import useFetch from "../../../utils/useFetch";
import axios from "axios";
const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10
  }
};
const GenericMasterfileForm = () => {
  const { t, i18n } = useTranslation();
  const [state, setState]= useState({collapse: false, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const [token] = useGlobalState('token');
  const UP="icon-arrow-up";
  const DOWN="icon-arrow-down";
  const value = useContext(accountContext);
  const [{ res, isLoading, isError }, doFetch]= useFetch(value.url, {});
  const [{ res2, isLoading2, isError2 }, doFetch2] = useFetch(value.accUrl, {});
  const data_ =  res?.hits?res.hits:value.initialState;
  const accData_=  res2?.hits?res2.hits:value.accData;
  console.log('data_',data_)
  console.log('accData_',accData_)
  const user_id = value.user.id;
  const user_name = value.user.name;
  const user_description = value.user.description;
  const user_parent = value.user.parent;
  const editing_ = value.editing;
  const [data, setData] = useState(data_);
  const [accData, setAccData] = useState(accData_);
  const [current,setCurrent] = useState(value.user);
  const [id,setId] = useState(user_id);
  const [name,setName] = useState(user_name);
  const [description, setDescription] = useState(user_description);
  const [parent, setParent] = useState(user_parent);
  const [editing, setEditing] = useState(editing_);
  const [url,setUrl] = useState('');
  useEffect(() => {}, [current, setCurrent, data, setEditing ]);
  useEffect(() => {setCurrent(value.user)}, [ value.user, id, name, description, parent]);
  useEffect(() => { setId(user_id)}, [user_id, current.id ]);
  useEffect(() => { setName(user_name)}, [user_name, current.name ]);
  useEffect(() => { setDescription(user_description)}, [user_description, current.description]);
  useEffect(() => { setParent(user_parent)}, [user_parent, current.parent, data]);
  useEffect(() => { setEditing(editing_)}, [editing_ ]);
  //useEffect(() => { setData(data_)}, [data_, value.data]);

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
    setState({...state, collapse:!state.collapse });
  }
  const initAdd =()=> {
    const row = {...value.initialState, editing:false};
     setEditing(false);
    value.editRow(row, false);
    setCurrent(row);
  };

  const cancelEdit = (e) => {
    //e.preventDefault();
    console.log("editing", editing);
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
    fetchData(value.accUrl, setAccData);
    //if(datax.length>0) setCurrent(data_(0))
    event.preventDefault();
  };

  const [filteredRows, setFilteredRows] = useState(data);
  useEffect(() => {handleFilter('')}, [data]);
  function handleFilter(text) {
    console.log('dxx+', data);
    const filteredRows = !text?data.hits:data.hits.filter(function(rc) {
      return (rc.id.indexOf(text)>-1
        ||rc.name.indexOf(text)>-1
        ||rc.description.indexOf(text)>-1)});
    console.log('filteredRows+', filteredRows);
    setFilteredRows(filteredRows);
  }

  const edit = id =>{
    const record = filteredRows.find(obj => obj.id === id);
    value.editRow(record);
  }

  const handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    if(name==='id') setId(value);
    if(name==='name') setName(value);
    if(name==='description') setDescription(value);
    if(name==='parent') setParent(value);
    console.log('user', current);
  };

  const mapping = item => <option key={item.id} value={item.id}>
                         {item.id+ " ".concat (item.name)}</option>;

  const submitEdit = event => {
    event.preventDefault();
    const row = {id:id, name:name, description:description,
      modelid:current.modelid, parent:parent};
    setCurrent(row);
    value.submitEdit(row, data);
    console.log("submitEdit user", current);
  };

  const submitAdd = event => {
    event.preventDefault();
    const row = {id:id, name:name, description:description,
      modelid:current.modelid, parent:parent};
    setCurrent(row);
    value.submitAdd(row, data);

  };


  function buildForm(user1){
    console.log("user1.editing", user1.editing);
    console.log("editing", editing);
    console.log("user1", user1);
    console.log("data.hits", data.hits);
    const addOrEdit = (typeof user1.editing==='undefined')?editing:user1.editing;
    const submit= addOrEdit?submitEdit:submitAdd
    const props={title:value.title, columns:value.headers, rows:filteredRows, edit:edit, submit:submit, selected:selected
      , editable:true, setSelected:setSelected, cancel:cancelEdit, handleFilter:handleFilter,rowsPerPageOptions:[5, 25, 100]}
    return(
           <>
             <Grid container spacing={2}  style={{...styles.outer, padding: 20, 'background-color':blue }}  direction="column" >
                <CForm  className="form-horizontal" onSubmit={ addOrEdit?submitEdit:submitAdd} style={{padding:0}}>
                  <Grid container justify="space-between">
                    <Grid container xs spacing={1} justify="flex-start">
                      <Grid item justify="center" alignItems="center">
                        <IoMdMenu />
                      </Grid>
                      <Grid item><h5><CBadge color="primary">{t(`${value.title}`)}</CBadge></h5></Grid>
                    </Grid>
                    <Grid item justify="flex-end" alignItems="center">
                      <div className="card-header-actions" style={{  align: 'right' }}>
                        {/*eslint-disable-next-line*/}
                        <CButton type="submit" size="sm" color="primary" style={{ align: 'right' }}  onClick={event => {
                          console.log("token", token)
                          doFetch(token);event.preventDefault(); submitQuery(event)
                        }}>
                        </CButton>
                      </div>
                      <div className="card-header-actions" style={{  align: 'right' }}>
                        {/*eslint-disable-next-line*/}
                          <CButton type="submit" size="sm" color="primary" style={{ align: 'right' }}  onClick={toggle}>
                            <i className="fa fa-dot-circle-o"></i>
                          </CButton>
                      </div>
                      <div className="card-header-actions" style={{  align: 'right' }}>
                        {/*eslint-disable-next-line*/}
                        <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={toggle}>
                          <i className={state.collapse?UP:DOWN}></i></a>
                      </div>
                    </Grid>
                  </Grid>
                    <CCollapse show={state.collapse} id="JScollapse" style={{padding:2}}>
                        <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('generic.id')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CInput bsSize="sm" type="text" id="input-id" name="id" className="input-sm" placeholder="Id" value= {id} onChange={handleInputChange} />
                          </CCol>
                          <CCol sm="1.5">
                            <CLabel size="sm" htmlFor="input-small">{t('generic.enterdate')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CInput disabled bsSize="sm" type="date"  id="input-small" name="enterdate" className="input-sm" placeholder="31.12.2019" />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('generic.name')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CInput bsSize="sm" type="text" id="input-small" name="name" className="input-sm" placeholder="Name" value={name} onChange={handleInputChange} />
                          </CCol>
                          <CCol sm="1.5">
                            <CLabel size="sm" htmlFor="input-small">{t('generic.transdate')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CInput bsSize="sm"  type="date"  id="input-small" name="input-small" className="input-sm" placeholder="date" />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('generic.group')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CSelect className ="flex-row" type="select" name="parent" id="parent-id"
                                   value={parent} onChange={handleInputChange} >
                                 {accData.hits.map(item => mapping(item))};

                            </CSelect>

                          </CCol>
                          <CCol sm="1.5">
                            <CLabel size="sm" htmlFor="input-small">Updated</CLabel>
                          </CCol>
                          <CCol sm="5">
                            <CInput disabled bsSize="sm" type="text" id="input-small" name="input-small" className="input-sm" placeholder="31.12.2019" />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('generic.description')}</CLabel>
                          </CCol>
                          <CCol sm="10">
                            <CTextarea type="texarea" name="description" id="description" rows="4"
                                    placeholder="Content..." value={description} onChange={handleInputChange} />
                          </CCol>
                        </CFormGroup>
                    </CCollapse>
                </CForm>
             </Grid>
             <EnhancedTable props={props} style={{padding:0, height:50}}/>
      </>)
  }

  return buildForm(current);

};
export default GenericMasterfileForm;

