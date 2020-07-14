import React, {useState, useEffect} from 'react'
import Grid from "react-fast-grid";
import {IoMdMenu} from "react-icons/io";
import { CButton, CBadge, CCollapse, CCol, CForm, CLabel, CFormGroup, CInput, CSelect, CTextarea, CRow} from '@coreui/react'
import DatePicker from "react-datepicker";
import { de } from "date-fns/locale";

import { library } from '@fortawesome/fontawesome-svg-core'
//import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCog,
  faSpinner,
  faQuoteLeft,
  faSquare,
  faCheckSquare,
  faThumbsUp,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faPlusSquare,
  faEraser,
  faSave,
  faEdit
} from '@fortawesome/free-solid-svg-icons'
import CIcon from "@coreui/icons-react";

library.add(/*fab,*/ faCog, faSpinner, faQuoteLeft, faSquare, faCheckSquare, faThumbsUp, faAngleDoubleUp, faAngleDoubleDown
    , faPlusSquare
    , faEraser
    , faSave
    , faEdit
)

const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10
  }
};
export default function EditDetails(props) {
  console.log('propsZ', props)
  const {value, accData, initAddLine, submitEditLine, posted, mapping, title} = props.props
  const t = value.t
  const [state, setState]= useState({ collapse: false, fadeIn: true, timeout: 300});
  console.log('recordx', props.props.initState)
  //console.log('value', value)
  const record_  = props.props.initState?props.props.initState:value.initialState.lines[0];
  const account_ = record_.account;
  const oaccount_= record_.oaccount;
  const amount_  = record_.amount;
  const text_    = record_.text;
  const duedate_ = Date.parse(record_.duedate);
  const [account,setAccount]   = useState(account_);
  const [oaccount,setOaccount] = useState(oaccount_);
  const [amount,setAmount]     = useState(amount_);
  const [duedate,setDuedate]   = useState(duedate_);
  const [text,setText]         = useState(text_);
  const [record, setRecord]    = useState(record_);

  useEffect(() => {setRecord(record_)}, [record_]);
  useEffect(() => { setAccount(account_)}, [account_]);
  useEffect(() => { setOaccount(oaccount_)}, [oaccount_]);
  useEffect(() => { setAmount(amount_)}, [amount_]);
  useEffect(() => { setDuedate(duedate_)}, [duedate_]);
  useEffect(() => { setText(text_)}, [text_]);

  const toggleD = ()=> setState({...state, collapse:!state.collapse });

  const submit =(e)=> {
    e.preventDefault();
    const rec={...record, account:account, oaccount:oaccount, duedate:duedate, amount:amount,text:text};
    console.log('rec', rec);
    submitEditLine(rec);
  }
  return (
      <Grid container direction="column" style={{...styles.outer, 'min-height':30}} >
      <Grid container justify="space-between">
        <Grid container xs spacing={1} justify="flex-start">
          <Grid item justify="center" alignItems="center">
            <IoMdMenu />
          </Grid>
          <Grid item><h5><CBadge color="primary">{title}</CBadge></h5></Grid>
        </Grid>
        <Grid item justify="flex-end" alignItems="center">
          <div className="card-header-actions" style={{  align: 'right', padding:4}}>
            <div className="card-header-actions" style={{  align: 'right' }}>
              <CButton color="link" className="card-header-action btn-minimize" onClick={initAddLine}>
                <FontAwesomeIcon icon={faPlusSquare} />
              </CButton>
            </div>
            <div className="card-header-actions" style={{  align: 'right' }}>
              <CButton color="link" className="card-header-action btn-minimize" onClick={toggleD}>
                <FontAwesomeIcon icon={faEraser} />
              </CButton>
            </div>
            <div className="card-header-actions" style={{  align: 'right' }}>
              <CButton color="link" className="card-header-action btn-minimize" onClick={submit}>
                <FontAwesomeIcon icon={faCheckSquare} />
              </CButton>
            </div>
            <div className="card-header-actions" style={{  align: 'right' }}>
              <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggleD()}>
                <FontAwesomeIcon icon={state.collapse ?faAngleDoubleUp:faAngleDoubleDown} />
              </CButton>
            </div>
          </div>
        </Grid>
      </Grid>
      <CCollapse show={state.collapse} id="FScollapse">
        <CRow xs="16" style={{height:25 }}>
          <CCol  sm="1" style={{'padding-right':0.5}}>
            <CLabel size="sm" htmlFor="input-small" style={{padding:0.5}}>{t('financials.line.account')}</CLabel>
          </CCol>
          <CCol  sm="3"  style={{'padding-left':0, 'padding-right':1}}>
            <CSelect  disabled={posted} className ="input-sm" type="select" name="account" id="account-id"
                    value={account} onChange={(e)=>setAccount(e.target.value)}>
              {accData.hits.map(item => mapping(item))};
            </CSelect>
          </CCol>
          <CCol  sm="0.5"  style={{'padding-left':1, 'padding-right':0.5}}>
            <CLabel size="sm" htmlFor="input-small">{t('financials.line.oaccount')}</CLabel>
          </CCol>
          <CCol  sm="3"  style={{'padding-left':0}}>
            <CSelect  disabled={posted} className ="input-sm" type="select" name="oaccount" id="oaccount-id"
                    value={oaccount} onChange={(e)=>setOaccount(e.target.value)} >
              {value.accData.hits.map(item => mapping(item))}
            </CSelect>
          </CCol>
          <CCol sm="0.5" style={{'padding-left':1, 'padding-right':0.5}}>
            <CLabel size="sm" htmlFor="input-small">{t('financials.line.duedate')}</CLabel>
          </CCol>
          <CCol sm="1" style={{'padding-left':0}}>
            <DatePicker disabled ={posted} id='transdate-id'  selected={duedate} onChange={date => setDuedate(date)}
                        locale={de} dateFormat='dd.MM.yy' className="form-control dateInput" style={{'left-padding':0}}/>
          </CCol>
        <CCol sm="0.5" style={{'padding-left':1, 'padding-right':0.5}}>
          <CLabel size="sm" htmlFor="input-small">{t('financials.line.amount')}</CLabel>
        </CCol>
        <CCol  sm="2"  style={{'padding-left':0}}>
          <CInput disabled={posted} bsSize="sm" type="text" id="amount-input" name="oid" className="input-sm"
                 placeholder="depositor" value={amount} onChange={(e)=>setAmount(e.target.value)}
                 style={{'text-align':'right'}}/>
        </CCol>
       </CRow>
        <CRow xs="16" style={{height:50, padding:0.5 }}>
          <CCol sm="1"  style={{'padding-right':0.5}}>
            <CLabel size="sm" htmlFor="input-small">{t('financials.line.text')}</CLabel>
          </CCol>
          <CCol  xs="11"  style={{'padding-left':0, 'padding-right':1, 'padding-top':1}}>
            <CInput disabled={posted} bsSize="sm" type="textarea" id="textx-input" name="text" className="input-sm"
                   placeholder="text" value={text} onChange={(e)=>setText(e.target.value)}
            />
          </CCol>
        </CRow>
      </CCollapse>
    </Grid>
  );
}
