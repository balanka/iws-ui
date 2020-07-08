import React, {useState, useEffect} from 'react'
import Grid from "react-fast-grid";
import {IoMdMenu} from "react-icons/io";
import {Badge, Col, Collapse, Row, Input, Label} from "reactstrap";
import DatePicker from "react-datepicker";
import { de } from "date-fns/locale";

const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10
  }
};
export default function EditDetails(props) {
  console.log('propsZ', props)
  const {value, initAddLine, submitEditLine, posted, mapping, title} = props.props

  const UP="fa fa-angle-double-up";
  const DOWN="fa fa-angle-double-down";
  const ADD ="fa fa-plus-square-o";
  const REMOVE="fa fa-eraser";
  const SAVE  ="fa fa-save";
  const EDIT="fa fa-edit";

  const [state, setState]= useState({ collapse: false, fadeIn: true, timeout: 300});

  console.log('recordx', props.props.initState)
  console.log('value', value)
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

  const toggleD = ()=> setState({ collapse:!state.collapse });

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
          <Grid item><h5><Badge color="primary">{title}</Badge></h5></Grid>
        </Grid>
        <Grid item justify="flex-end" alignItems="center">
          <div className="card-header-actions" style={{  align: 'right', padding:4}}>
            {/*eslint-disable-next-line*/}
            <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={initAddLine}>
              <i className={ADD}></i></a>
            <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={toggleD}>
              <i className={REMOVE}></i></a>
            <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={submit}>
              <i className={SAVE}></i></a>
            <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={toggleD}>
              <i className={state.collapse?UP:DOWN}></i></a>
          </div>
        </Grid>
      </Grid>
      <Collapse isOpen={state.collapse} id="FScollapse">
        <Row xs="16" style={{height:25 }}>
          <Col  sm="1" style={{'padding-right':0.5}}>
            <Label size="sm" htmlFor="input-small" style={{padding:0.5}}>Account</Label>
          </Col>
          <Col  sm="3"  style={{'padding-left':0, 'padding-right':1}}>
            <Input  disabled={posted} className ="input-sm" type="select" name="account" id="account-id"
                    value={account} onChange={(e)=>setAccount(e.target.value)}>
              {value.accData.hits.map(item => mapping(item))};
            </Input>
          </Col>
          <Col  sm="0.5"  style={{'padding-left':1, 'padding-right':0.5}}>
            <Label size="sm" htmlFor="input-small">O.Acc.</Label>
          </Col>
          <Col  sm="3"  style={{'padding-left':0}}>
            <Input  disabled={posted} className ="input-sm" type="select" name="oaccount" id="oaccount-id"
                    value={oaccount} onChange={(e)=>setOaccount(e.target.value)} >
              {value.accData.hits.map(item => mapping(item))}
            </Input>
          </Col>
          <Col sm="0.5" style={{'padding-left':1, 'padding-right':0.5}}>
            <Label size="sm" htmlFor="input-small">Duedate</Label>
          </Col>
          <Col sm="1" style={{'padding-left':0}}>
            <DatePicker disabled ={posted} id='transdate-id'  selected={duedate} onChange={date => setDuedate(date)}
                        locale={de} dateFormat='dd.MM.yy' className="form-control dateInput" style={{'left-padding':0}}/>
          </Col>
        <Col sm="0.5" style={{'padding-left':1, 'padding-right':0.5}}>
          <Label size="sm" htmlFor="input-small">Amount</Label>
        </Col>
        <Col  sm="2"  style={{'padding-left':0}}>
          <Input disabled={posted} bsSize="sm" type="text" id="amount-input" name="oid" className="input-sm"
                 placeholder="depositor" value={amount} onChange={(e)=>setAmount(e.target.value)}
                 style={{'text-align':'right'}}/>
        </Col>
       </Row>
        <Row xs="16" style={{height:50, padding:0.5 }}>
          <Col sm="1"  style={{'padding-right':0.5}}>
            <Label size="sm" htmlFor="input-small">Text</Label>
          </Col>
          <Col  xs="11"  style={{'padding-left':0, 'padding-right':1, 'padding-top':1}}>
            <Input disabled={posted} bsSize="sm" type="textarea" id="textx-input" name="text" className="input-sm"
                   placeholder="text" value={text} onChange={(e)=>setText(e.target.value)}
            />
          </Col>
        </Row>
      </Collapse>
    </Grid>
  );
}
