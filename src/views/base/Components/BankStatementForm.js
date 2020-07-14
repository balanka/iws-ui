import React, {useEffect, useState, useContext} from 'react'
import DatePicker from "react-datepicker";
import { CButton, CBadge, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CTextarea} from '@coreui/react'
import {capitalize, dateFormat, currencyAmountFormatDE} from "../../../utils/utils"
import Switch from "@material-ui/core/Switch";
import {accountContext, useGlobalState} from './AccountContext';
import EnhancedTable from '../../Tables2/EnhancedTable';
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import {IoMdMenu} from "react-icons/io";
import {useTranslation} from "react-i18next";
import useFetch from "../../../utils/useFetch";
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleDown, faAngleDoubleUp, faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10
  }
};

const BankStatementForm = () => {
  const { t, i18n } = useTranslation();
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const [profile, setProfile] = useGlobalState('profile');
  const value = useContext(accountContext);
  const init = ()=> {return value.initialState}
  const [{ res}]= useFetch(value.url, {});
  const data_ =  res?.hits?res.hits:[value.initialState];
  const getData =()=> { return data?.hits?data.hits:init().hits}
  const current_= value.user;
  const id_ = value.user.id;
  const depositor_ = value.user.depositor;
  const beneficiary_ = value.user.beneficiary;
  const postingdate_=value.user.postingdate;
  const valuedate_ = Date.parse(value.user.valuedate);
  const postingtext_= value.user.postingText;
  const purpose_= value.user.purpose;
  const accountno_= value.user.accountno;
  const bankCode_= value.user.bankCode;
  const amount_= value.user.amount;
  const currency_=value.user.currency;
  const info_=value.user.info;
  const company_=value.user.company;
  const companyIban_=value.user.companyIban;
  const posted_=value.user.posted;
  const editing_ = value.editing;
  const [data, setData] = useState(data_);
  const [current,setCurrent] = useState(current_);
  const [id,setId] = useState(id_);
  const [depositor,setDepositor] = useState(depositor_);
  const [postingdate, setPostingdate] = useState(postingdate_);
  const [valuedate, setValuedate] = useState(valuedate_);
  const [postingtext, setPostingtext] = useState(postingtext_);
  const [purpose,setPurpose] = useState(purpose_);
  const [beneficiary, setBeneficiary] = useState(beneficiary_);
  const [accountno,setAccountno] = useState(accountno_);
  const [bankCode,setBankCode] = useState(bankCode_);
  const [amount,setAmount] = useState(amount_);
  const [currency,setCurrency] = useState(currency_);
  const [info,setInfo] = useState(info_);
  const [company,setCompany] = useState(company_);
  const [companyIban,setCompanyIban] = useState(companyIban_);
  const [posted,setPosted] = useState(posted_);
  const [editing, setEditing] = useState(editing_);
  const [filteredRows, setFilteredRows] = useState(data);
  useEffect(() => {}, [current, setCurrent, data, setEditing ]);
  useEffect(() => {setCurrent(current_)}, [ current_, id, depositor, postingdate, valuedate
        , postingtext, purpose, beneficiary, accountno, bankCode,  amount, currency, info
        ,  company, companyIban, posted ]);
  useEffect(() => { setId(id_)}, [id_, current.id ]);
  useEffect(() => { setDepositor(depositor_)}, [depositor_, current.depositor ]);
  useEffect(() => { setPostingdate(postingdate_)}, [postingdate_, current.postingdate ]);
  useEffect(() => { setValuedate(valuedate_)}, [valuedate_, current.valuedate ]);
  useEffect(() => { setPostingtext(postingtext_)}, [postingtext_, current.postingtext]);
  useEffect(() => { setPurpose(purpose_)}, [purpose_, current.purpose]);
  useEffect(() => { setBeneficiary(beneficiary_)}, [beneficiary_, current.beneficiary]);
  useEffect(() => { setAccountno(accountno_)}, [accountno_, current.accountno]);
  useEffect(() => { setBankCode(bankCode_)}, [bankCode_, current.bankCode ]);
  useEffect(() => { setAmount(amount_)}, [amount_, current.amount]);
  useEffect(() => { setCurrency(currency_)}, [currency_, current.currency]);
  useEffect(() => { setInfo(info_)}, [info_, current.info]);
  useEffect(() => { setCompany(company_)}, [company_, current.company]);
  useEffect(() => { setCompanyIban(companyIban_)}, [companyIban_, current.companyIban]);
  useEffect(() => { setPosted(posted_)}, [posted_, current.posted]);
  useEffect(() => { setEditing(editing_)}, [editing_ ]);
  useEffect(() => {handleFilter('')}, [data]);

  const submitGet = (url, func, result) => {
    axios.get( url, {headers: {'authorization':profile.token}})
      .then(response => {
        const resp = response.data;
        result=response.data;
        console.log('response.data', resp);
        console.log('response.headers', response.headers);
        console.log('result', result);
        func(resp);
        result=resp;
        return result;
      }).catch(function (error) {
      console.log('error', error);
    });
    return result;
  }
  const fetchData =(url_, func)=>{
    let result='xxx';
    const res = submitGet(url_, func, result);
    console.log("res", res);
    const datax = res?.hits ? res.hits : value.initialState;
    return datax;
  }
  const submitQuery = event => {
    event.preventDefault();
    console.log("submitQuery current", current);
    let result='xxx';
    const url_=value.url //.concat('/')
    console.log("url_", url_);
    fetchData(url_, setData, result);
    console.log("result", result);
  };


  function handleFilter(text) {

    let filteredRows_=!text?getData():getData().filter(function(rc) {

      return (rc.id.toString().indexOf(text)>-1
        ||rc.depositor.indexOf(text)>-1
        ||rc.postingdate.indexOf(text)>-1
        ||rc.valuedate.indexOf(text)>-1
        ||rc.postingtext.indexOf(text)>-1
        ||rc.purpose.indexOf(text)>-1
        ||rc.beneficiary.indexOf(text)>-1
        ||rc.accountno.indexOf(text)>-1
        ||rc.amount.indexOf(text)>-1
        ||rc.info.indexOf(text)>-1
        ||rc.posted.toString().indexOf(text)>-1
        ||rc.companyIban.indexOf(text)>-1)});
    console.log('filteredRows+', filteredRows_);
        setFilteredRows(filteredRows_);
  }
  const toggle= ()=> {
    setState({...state, collapse:!state.collapse });
  }

  const cancelEdit = (e) => {
   // e.preventDefault();
    setSelected([]);
  };
  const edit = id =>{
    const record = data.hits.find(obj => obj.id === id);
    value.editRow(record);
  }
  const handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    const namex=name
    const method="set"+capitalize(name)
    const row = Object.assign(current, {name:value});
    eval(method)(value);
    console.log('currentz', row);
    console.log('currentz', current);
    setCurrent(row);
  };


  const submitEdit = event => {
    event.preventDefault();
    console.log("submitEdit1 current", current);
    const row = { id:current.id, depositor:depositor, postingdate:current.postingdate, valuedate:current.valuedate
      , postingtext:current.postingtext, purpose:purpose, beneficiary:current.beneficiary, accountno:accountno
      , bankCode:bankCode, amount:current.amount, currency:current.currency,  info:info
      , company:current.company, companyIban:companyIban, posted:current.posted, modelid:current.modelid};
    console.log("submitEdit1 current", row);
    setCurrent(row);
    value.submitEdit(row, data);
    console.log("submitEdit current", current);
  };

  const submitAdd = event => {
    event.preventDefault();
  };

  function buildForm(current1){
    console.log("user1xx", current1);
    const addOrEdit = (typeof current1.editing==='undefined')?editing:current1.editing;
    const submit= addOrEdit?submitEdit:submitAdd
    const props={title:value.title, columns:value.headers, rows:filteredRows, edit:edit, submit:submit, selected:selected
      , editable:true, setSelected:setSelected, cancel:cancelEdit, handleFilter:handleFilter,rowsPerPageOptions:[15, 25, 100,500, 1000]}
    return <>
      <Grid container spacing={2} style={{...styles.outer, padding: 20, 'background-color':blue }} direction="column" >
        <CForm  className="form-horizontal" onSubmit={ addOrEdit?submitEdit:submitAdd} style={{padding:0}}>
          <Grid container justify="space-between">
            <Grid container xs spacing={1} justify="flex-start">
              <Grid item justify="center" alignItems="center">
                <IoMdMenu />
              </Grid>
              <Grid item> <h5><CBadge color="primary">{value.title}</CBadge></h5></Grid>
            </Grid>
            <Grid item justify="flex-end" alignItems="center">
                <div className="card-header-actions" style={{  align: 'right' }}>
                    <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                        <FontAwesomeIcon icon={faSave} />
                    </CButton>
                </div>
                <div className="card-header-actions" style={{  align: 'right' }}>
                    <CButton block color="link" type="submit"  className="card-header-action btn-minimize" onClick={event => {
                        event.preventDefault(); submitQuery(event)}}>
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
             <CCollapse show={state.collapse} id="JScollapse" style={{padding:2}}>
                 <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('bankstatement.id')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CInput  bsSize="sm" type="text" id="account-id" name="id" className="input-sm"
                                    placeholder="Id" value= {id}  />
                          </CCol>
                          <CCol sm="1">
                            <CLabel size="sm" htmlFor="input-small">{t('bankstatement.postingdate')}</CLabel>
                          </CCol>
                          <CCol sm="1.5">
                            <CInput  bsSize="sm" type="text"  id="postingdate-id" name="postingdate" className="input-sm"
                                    placeholder="date" value={dateFormat(current1.postingdate, "dd.mm.yyyy")}
                                    style={{'text-align':'right', padding:2 }}/>
                          </CCol>
                        </CFormGroup>
                 <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('bankstatement.depositor')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CInput  bsSize="sm" type="text" id="depositor-input" name="depositor"
                                    className="input-sm" placeholder="depositor" value={depositor}  />
                          </CCol>
                          <CCol sm="1">
                            <CLabel size="sm" htmlFor="input-small">{t('bankstatement.valuedate')}</CLabel>
                          </CCol>
                          <CCol sm="1.5">
                            <DatePicker  locale="de-DE" dateFormat='dd.MM.yyyy' selected={valuedate}
                                         onChange={date => setValuedate(date)} style={{ 'text-align':'right' }}/>
                          </CCol>
                        </CFormGroup>
                 <CFormGroup row style={{  height:15 }}>
                          <CCol sm="2">
                            <CLabel size="sm" htmlFor="input-small">{t('bankstatement.beneficiary')}</CLabel>
                          </CCol>
                          <CCol sm="4">
                            <CInput  bsSize="sm" type="text" id="beneficiary-input" name="beneficiary"
                                   className="input-sm" placeholder="beneficiary" value={beneficiary}/>
                          </CCol>
                          <CCol sm="1">
                            <CLabel size="sm" htmlFor="input-small">{t('bankstatement.postingtext')}</CLabel>
                          </CCol>
                          <CCol sm="1.5">
                            <CInput  bsSize="sm"  type="text"  id="postingtext-id" name="postingtext"
                                   className="input-sm" placeholder="postingtext" value={current.postingtext} />
                          </CCol>
                        </CFormGroup>
                 <CFormGroup row style={{  height:15 }}>
                        <CCol sm="2">
                          <CLabel size="sm" htmlFor="input-small">{t('bankstatement.info')}</CLabel>
                        </CCol>
                        <CCol xs="4">
                          <CInput  bsSize="sm" type="text" id="info-input" name="info" className="input-sm"
                                 placeholder="info" value={info}  />
                        </CCol>
                        <CCol sm="1">
                          <CLabel size="sm" htmlFor="input-small">{t('bankstatement.amount')}</CLabel>
                        </CCol>
                        <CCol sm="1.5">
                          <CInput  bsSize="sm" type="text" id="amount-input" name="amount" className="input-sm"
                                 placeholder="amount" value={currencyAmountFormatDE(Number(amount),currency)}
                                 style={{ 'text-align':'right' }}/>
                        </CCol>
                      </CFormGroup>
                 <CFormGroup row style={{  height:15 }}>
                        <CCol sm="2">
                          <CLabel size="sm" htmlFor="input-small">{t('bankstatement.companyIban')}</CLabel>
                        </CCol>
                        <CCol sm="4">
                          <CInput disabled ={posted} bsSize="sm" type="text" id="companyIban-id" name="companyIban"
                                  className="input-sm" placeholder="companyIban" value={companyIban} onChange={handleInputChange} />
                        </CCol>
                        <CCol sm="1">
                          <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
                        </CCol>
                        <CCol sm="1.5">
                          <CInput  bsSize="sm" type="text" id="company-input" name="company" className="input-sm"
                                  placeholder="company" value={company} style={{ 'text-align':'right' }}/>
                        </CCol>

                      </CFormGroup>
                    <CFormGroup row style={{  height:15 }}>
                        <CCol sm="2">
                          <CLabel size="sm" htmlFor="input-small">{t('bankstatement.accountno')} </CLabel>
                        </CCol>
                        <CCol sm="4">
                          <CInput disabled ={posted} bsSize="sm" type="text" id="accountno-input" name="accountno"
                                  className="input-sm" placeholder="accountno" value={accountno} onChange={handleInputChange} />
                        </CCol>
                        <CCol sm="1">
                             <CLabel size="sm" htmlFor="input-small">{t('bankstatement.bankCode')} </CLabel>
                        </CCol>
                        <CCol sm="1.5">
                          <CInput disabled ={posted} bsSize="sm" type="text" id="bankCode-input" name="bankCode"
                                  className="input-sm" placeholder="bankCode" value={bankCode} onChange={handleInputChange}
                                  style={{ 'padding-left':0 }}/>
                        </CCol>
                        <CCol sm="1">
                             <FormControlLabel id="posted" name="posted" bsSize="sm"
                                       control={<Switch checked={current.posted} />}
                                       label={t('bankstatement.posted')}/>
                         </CCol>
                      </CFormGroup>
                  <CFormGroup row style={{  height:15 }}>
                        <CCol sm="2">
                          <CLabel size="sm" htmlFor="input-small">{t('bankstatement.purpose')}</CLabel>
                        </CCol>
                        <CCol xs="12"   md="10">
                          <CTextarea disabled ={posted} bsSize="sm" type="textarea" id="purpose-input" name="purpose" className="input-sm"
                                 placeholder="purpose" value={purpose} onChange={handleInputChange} rows="2"/>
                        </CCol>
                      </CFormGroup>
             </CCollapse>
        </CForm>
      </Grid>
      <EnhancedTable props={props} style={{padding:0, height:80}}/>
    </>;
  }

  return buildForm(current);

};
export default BankStatementForm;

