import React, {useState,  useContext, useEffect} from 'react';

import './responsive.css';
import {accountContext, useGlobalState} from "../Components/AccountContext";
import useFetch2 from "../../../utils/useFetch2";
import Grid from "react-fast-grid";
import { CButton, CBadge, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CSelect} from '@coreui/react'
import {IoMdMenu} from "react-icons/io";
import {capitalize} from "../../../utils/utils";
import TreeTableView from './TreeTableView'
import {useTranslation} from "react-i18next";
import useFetch from "../../../utils/useFetch";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleDown, faAngleDoubleUp, faSpinner} from "@fortawesome/free-solid-svg-icons";
const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10
  }
};
export default function TreeTableForm ()  {
  const [profile, setProfile] = useGlobalState('profile');
  const { t, i18n } = useTranslation();
  const value = useContext(accountContext);
  const { data, isLoading, hasError, errorMessage, updateUrl } = useFetch2(value.url)
  const [{ res2, isLoading2, isError2 }, doFetch2] = useFetch(value.accUrl, {});
  const init = ()=> {return value.initialState}
  console.log("value.accUrl", value.accUrl);
  console.log("data_", data);
  const getData =()=> { return data?.data?data.data:init().data}
  const accData_=  res2?.hits?res2.hits:value.accData;
  const [state2, setState2]= useState({collapse: false, fadeIn: true, timeout: 300});
  const account_= value.user.account;
  const fromPeriod_ = value.user.period;
  const toPeriod_ = value.user.period;
  const [account,setAccount] = useState(account_);
  const [fromPeriod, setFromPeriod] = useState(fromPeriod_);
  const [toPeriod, setToPeriod] = useState(toPeriod_);
  const [accData, setAccData] = useState(accData_);
  useEffect(() => { setAccount(account_)}, [account_]);
  useEffect(() => { setFromPeriod(fromPeriod_)}, [fromPeriod_]);
  useEffect(() => { setToPeriod(toPeriod_)}, [toPeriod_]);
  useEffect(() => {}, [updateUrl, data, getData()]);

  const submitGet = (url, func) => {
    console.log('authorization2', profile.token);
    let res=null
    axios.get( url, {headers: {'authorization':profile.token}})
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
  const submitFetch = () => {
    const fetchData =(url_, func) => {
      const res = submitGet(url_, func);
      const datax = res?.hits ? res.hits : value.initialState;
      return datax;
    }

    fetchData(value.accUrl, setAccData);
  };
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  const toggle= ()=> {
    console.log("accData", accData)
    accData?.hits?.length<2? submitFetch():
    setState2({...state2, collapse: !state2.collapse });
  }
  const mapping = item => <option key={item.id} value={item.id}>
    {item.id+ " ".concat (item.name)}</option>;

  const mapping2 = item => <option key={item.name} value={item.name}>
    {item.name+" ".concat(item.id)}</option>;
  const handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    const method="set"+capitalize(name)
    eval(method)(value);
  };
  const submitQuery = event => {
    event.preventDefault();
   const url_=value.url.concat('/')
        .concat(account).concat('/')
        .concat(fromPeriod).concat('/')
        .concat(toPeriod);
    updateUrl(url_)
  };
  const NoData=() => <div>NODATA</div>
  function buildForm() {
    if (isLoading) return <NoData/>

    return (<>
        <Grid container spacing={2}  direction="column"  style={{...styles.outer}}>
          <CForm  className="form-horizontal" onSubmit={submitQuery} style={{padding:0}}>
            <Grid container justify="space-between">
              <Grid container xs spacing={1} justify="flex-start">
                <Grid item justify="center" alignItems="center">
                  <IoMdMenu />
                </Grid>
                <Grid item><h5><CBadge color="primary">{t('balancesheet.title')}</CBadge></h5></Grid>
              </Grid>
              <Grid item justify="flex-end" alignItems="center">
                <div className="card-header-actions" style={{  align: 'right' }}>
                  <CButton block color="link" type="submit"  className="card-header-action btn-minimize" onClick={event => {
                    event.preventDefault(); submitQuery(event)}}>
                    <FontAwesomeIcon icon={faSpinner} rotation={90}/>
                  </CButton>
                </div>
                <div className="card-header-actions" style={{  align: 'right' }}>
                  <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                    <FontAwesomeIcon icon={state2.collapse ?faAngleDoubleUp:faAngleDoubleDown} />
                  </CButton>
                </div>
              </Grid>
            </Grid>
            <CCollapse show={state2.collapse} id="JScollapse" style={{height:40,padding:2}}>
              <CFormGroup row >
                <CCol sm="1">
                  <CLabel size="sm" htmlFor="input-small">{t('balancesheet.account')}</CLabel>
                </CCol>
                <CCol sm="3">
                  <CSelect className ="flex-row" type="select" name="account" id="account-id"
                         value={account} onChange={handleInputChange} style={{ height: 30, padding:2 }}>
                    {accData.hits.map(item => mapping(item))};

                  </CSelect>
                </CCol>
                <CCol sm="4">
                  <CSelect className ="flex-row" type="select" name="account2" id="account2-id"
                         value={account} onChange={handleInputChange} style={{ height: 30, padding:2 }}>
                    {accData.hits.map(item => mapping2(item))};

                  </CSelect>
                </CCol>
                <CCol sm="0.5" style={{ align: 'right' , padding:2}}>
                  <CLabel size="sm" htmlFor="input-small">{t('balancesheet.from')}</CLabel>
                </CCol>
                <CCol sm="1">
                  <CInput  bsSize="sm" type="text"  id="fromPeriod-id" name="fromPeriod" className="input-sm"
                          placeholder="fromPeriod" value={fromPeriod} onChange={handleInputChange} style={{ height: 30, padding:1 }}/>
                </CCol>
                <CCol sm="0.5" style={{ align: 'right' , padding:2}}>
                  <CLabel size="sm" htmlFor="input-small">{t('balancesheet.to')}</CLabel>
                </CCol>
                <CCol sm="1">
                  <CInput  bsSize="sm" type="text"  id="toPeriod-id" name="toPeriod" className="input-sm"
                          placeholder="toPeriod" value={toPeriod} onChange={handleInputChange} style={{ height: 30, padding:1, align: 'right'}}/>
                </CCol>
              </CFormGroup>
            </CCollapse>
          </CForm>
        </Grid>

        <TreeTableView data={getData()} style={{ padding:4 }}/>
    </>);
  }
return buildForm()

}
