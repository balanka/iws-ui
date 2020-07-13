import React, {useEffect, useState, useContext} from 'react'
import { CButton, CBadge, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CSelect, CTextarea} from '@coreui/react'
import {dateFormat, capitalize} from "../../../utils/utils"
import EnhancedTable from '../../Tables2/EnhancedTable';
import {accountContext} from './AccountContext';
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import {IoMdMenu} from "react-icons/io";
import {useTranslation} from "react-i18next";
import useFetch from "../../../utils/useFetch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleDown, faAngleDoubleUp, faPlusSquare, faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10
  }
};
const CustomerForm = () => {
  const { t, i18n } = useTranslation();
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const value = useContext(accountContext);
  const [{ res, isLoading, isError }, doFetch]= useFetch(value.url, {});
  const [{ res2, isLoading2, isError2 }, doFetch2] = useFetch(value.accUrl, {});
  const data_ =  res?.hits?res.hits:value.initialState;
  const accData_=  res2?.hits?res2.hits:value.accData;
  console.log('data_',data_)
  console.log('accData_',accData_)

  const current_= value.user;
  const id_ = value.user.id;
  const name_ = value.user.name;
  const description_ = value.user.description;
  const street_ = value.user.street;
  const city_ = value.user.city;
  const stateR_ = value.user.state;
  const zip_ = value.user.zip;
  const country_ = value.user.country;
  const phone_ = value.user.phone;
  const email_ = value.user.email;
  const account_ = value.user.account;
  const oaccount_ = value.user.oaccount;
  const iban_ = value.user.iban;
  const vatcode_ = value.user.vatcode;
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
  const [street, setStreet] = useState(street_);
  const [city, setCity] = useState(city_);
  const [stateR, setStateR] = useState(stateR_);
  const [zip, setZip] = useState(zip_);
  const [country, setCountry] = useState(country_);
  const [phone, setPhone] = useState(phone_);
  const [email, setEmail] = useState(email_);
  const [iban, setIban] = useState(iban_);
  const [vatcode, setVatcode] = useState(vatcode_);
  const [account,setAccount] = useState(account_);
  const [oaccount,setOaccount] = useState(oaccount_);
  const [company,setCompany] = useState(company_);
  const [postingdate, setPostingdate] = useState(postingdate_);
  const [changedate, setChangedate] = useState(changedate_);
  const [enterdate, setEnterdate] = useState(enterdate_);
  const [editing, setEditing] = useState(editing_);
  useEffect(() => {}, [current, setCurrent, data, setEditing ]);
  useEffect(() => {setCurrent(current_)}, [ current_, id, name, description,
        account, oaccount, company, enterdate, changedate, postingdate]);
  useEffect(() => { setId(id_)}, [id_, current.id ]);
  useEffect(() => { setName(name_)}, [name_, current.name ]);
  useEffect(() => { setDescription(description_)}, [description_, current.description ]);
  useEffect(() => { setStreet(street_)}, [street_, current.street ]);
  useEffect(() => { setCity(city_)}, [city_, current.city ]);
  useEffect(() => { setStateR(stateR_)}, [stateR_, current.state ]);
  useEffect(() => { setZip(zip_)}, [zip_, current.zip ]);
  useEffect(() => { setCountry(country_)}, [country_, current.country ]);
  useEffect(() => { setPhone(phone_)}, [phone_, current.phone ]);
  useEffect(() => { setEmail(email_)}, [email_, current.email ]);
  useEffect(() => { setIban(iban_)}, [iban_, current.iban ]);
  useEffect(() => { setVatcode(vatcode_)}, [vatcode_, current.vatcode ]);
  useEffect(() => { setAccount(account_)}, [account_, current.account, accData ]);
  useEffect(() => { setOaccount(oaccount_)}, [oaccount_, current.oaccount, accData ]);
  useEffect(() => { setCompany(company_)}, [company_, current.company ]);
  useEffect(() => { setPostingdate(postingdate_)}, [postingdate_, current.postingdate ]);
  useEffect(() => { setChangedate(changedate_)}, [changedate_, current.changedate ]);
  useEffect(() => { setEnterdate(enterdate_)}, [enterdate_, current.enterdate ]);
  useEffect(() => { setEditing(editing_)}, [editing_ ]);
  //useEffect(() => { setData(data_)}, [data_, value.data]);
 // useEffect(() => { setAccData(accData_)}, [accData_, value.accData]);
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
   // e.preventDefault();
    initAdd();
    setSelected([]);
  };


  const [filteredRows, setFilteredRows] = useState(data);
  useEffect(() => {handleFilter('')}, [data]);
  function handleFilter(text) {
    const filtered = data.hits.filter(function(rc) {
      return (rc.id.indexOf(text)>-1
        ||rc.name.indexOf(text)>-1
        ||rc.description.indexOf(text)>-1
        ||rc.account.indexOf(text)>-1
        ||rc.changedate.indexOf(text)>-1
        ||rc.enterdate.indexOf(text)>-1
        ||rc.postingdate.indexOf(text)>-1
        ||rc.idebit.toString().indexOf(text)>-1
        ||rc.icredit.toString().indexOf(text)>-1
        ||rc.debit.toString().indexOf(text)>-1
        ||rc.credit.toString().indexOf(text)>-1
        ||rc.balancesheet.toString().indexOf(text)>-1)
    });
    const rows_=text?filtered:data.hits
    console.log('filteredRows+', rows_);
    setFilteredRows(rows_);
  }


  const edit = id =>{
    const record = filteredRows.find(obj => obj.id === id);
    value.editRow(record);
  }
  const handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    const namex=name
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
    console.log("submitEdit1 current", current);
    const row = {id:id, name:name, description:description, street:street, city:city, state:stateR, zip:zip
      , country:country, phone:phone, email:email, account:account, oaccount:oaccount, iban:iban, vatcode:vatcode
      , enterdate:current.enterdate, postingdate:current.postingdate, changedate:current.changedate
      ,  company:company, modelid:current.modelid};
    console.log("submitEdit1 current", row);
    setCurrent(row);
    value.submitEdit(row, data);
    console.log("submitEdit current", current);
  };

  const submitAdd = event => {
    event.preventDefault();
    console.log("submitAdd1 current", current);
    const row = {id:id, name:name, description:description, street:street, city:city, state:stateR, zip:zip
      , country:country, phone:phone, email:email, account:account, oaccount:oaccount, iban:iban, vatcode:vatcode
      , enterdate:current_.enterdate, postingdate:current_.postingdate, changedate:current_.changedate
      ,  company:company, modelid:current.modelid};
    console.log('submitAdd row', row);
    value.submitAdd(row, data);
    setCurrent(row);
    console.log('submitAdd current', current);
  };

  function buildForm(current1){
    console.log("editing", editing);
    console.log("user1xx", current1);
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
              <Grid item><h5><CBadge color="primary">{t(`${value.title}`)}</CBadge></h5></Grid>
            </Grid>
            <Grid item justify="flex-end" alignItems="center">
              <div className="card-header-actions" style={{  align: 'right' }}>
                <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                  <FontAwesomeIcon icon={faPlusSquare} />
                </CButton>
              </div>
              <div className="card-header-actions" style={{  align: 'right' }}>
                <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                  <FontAwesomeIcon icon={faSave} />
                </CButton>
              </div>
              <div className="card-header-actions" style={{  align: 'right' }}>
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
            </Grid>
          </Grid>
            <CCollapse show={state.collapse} id="JScollapse" style={{padding: 2}}>
                          <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('customer.id')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CInput bsSize="sm" type="text" id="account-id" name="id" className="input-sm" placeholder="Id" value= {id} onChange={handleInputChange} />
                          </CCol>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('customer.enterdate')}</CLabel>
                          </CCol>
                          <CCol sm="2">
                            <CInput disabled bsSize="sm" type="text"  id="enterdate-id" name="enterdate" className="input-sm"
                                   placeholder="date" value={dateFormat(current.enterdate, "dd.mm.yyyy")}
                                   style={{'text-align':'right', padding:2 }}/>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('customer.name')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CInput bsSize="sm" type="text" id="name-input" name="name" className="input-sm" placeholder="Name" value={name} onChange={handleInputChange} />
                          </CCol>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('customer.changedate')}</CLabel>
                          </CCol>
                          <CCol sm="2">
                            <CInput disabled bsSize="sm"  type="text"  id="changedate-id" name="changedate" className="input-sm"
                                   placeholder="date" value={dateFormat(current.changedate, "dd.mm.yyyy")}
                                   style={{'text-align':'right', padding:2 }}/>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('customer.account')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CSelect className ="flex-row" type="select" name="account" id="account-id"
                                   value={account} onChange={handleInputChange} >
                                 {accData.hits.map(item => mapping(item))};

                            </CSelect>

                          </CCol>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('customer.postingdate')}</CLabel>
                          </CCol>
                          <CCol sm="2">
                            <CInput disabled bsSize="sm" type="text" id="input-small" name="postingdate" className="input-sm"
                                   placeholder="date" value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                                   style={{'text-align':'right', padding:2 }}/>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row style={{  height:15 }}>
                        <CCol sm="2">
                          <CLabel size="sm" htmlFor="input-small">{t('customer.oaccount')}</CLabel>
                        </CCol>
                        <CCol sm="4">
                          <CSelect className ="flex-row" type="select" name="oaccount" id="oaccount-id"
                                 value={oaccount} onChange={handleInputChange} >
                            {accData.hits.map(item => mapping(item))};
                          </CSelect>
                        </CCol>
                        <CCol sm="2">
                          <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
                        </CCol>
                        <CCol sm="2">
                          <CInput disabled bsSize="sm" type="text" id="company-id" name="company" className="input-sm"
                                  placeholder="company" value={company} onChange={handleInputChange}
                                  style={{'text-align':'right', padding:2 }}/>
                        </CCol>
                      </CFormGroup>
               <CFormGroup row style={{  height:15 }}>
                          <CCol md="2">
                            <CLabel htmlFor="textarea-input">{t('customer.description')}</CLabel>
                          </CCol>
                          <CCol xs="12"   md="9">
                            <CTextarea type="texarea" name="description" id="description-id" rows="1"
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

}
export default CustomerForm
