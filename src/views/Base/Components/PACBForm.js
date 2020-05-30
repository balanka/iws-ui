import React, {useEffect, useState, useContext} from 'react'
import {Button, Card, CardBody, CardHeader, Col, Collapse, Form, FormGroup, Input, Label, Row} from "reactstrap";
import GenericTable from "../Tables2/GenericTable";
import {accountContext} from './AccountContext';
import {capitalize, currencyFormatDE} from "../../../utils/utils";
import useFetch from "../../../utils/useFetch";
import GStickyHeadTable from "../Tables2/GStickyHeadTable";

const PACBForm = () => {
  const UP="icon-arrow-up";
  const DOWN="icon-arrow-down";
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [url,setUrl] = useState('');
  const value = useContext(accountContext);
  const res  = useFetch(url, {});
  const data_ = res && res.response?res.response:{hits:[]};

  const current_= value.user;
  const account_= value.user.account;
  const fromPeriod_ = value.user.period;
  const toPeriod_ = value.user.period;

  console.log("data_", data_);
  console.log("value.accData", value.accData.hits);

  const [current,setCurrent] = useState(current_);
  const [account,setAccount] = useState(account_);
  const [account2,setAccount2] = useState('');
  const [fromPeriod, setFromPeriod] = useState(fromPeriod_);
  const [toPeriod, setToPeriod] = useState(toPeriod_);
  useEffect(() => {}, [current, setCurrent]);
  useEffect(() => {setCurrent(current_)}, [ current_,account, fromPeriod, toPeriod]);
  useEffect(() => { setAccount(account_)}, [account_, current.account ]);
  useEffect(() => { setFromPeriod(fromPeriod_)}, [fromPeriod_]);
  useEffect(() => { setToPeriod(toPeriod_)}, [toPeriod_]);
  useEffect(() => {}, [url]);





  const toggle= ()=> {
    setState({ collapse: !state.collapse });
  }

  const handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    const namex=name
    const method="set"+capitalize(name)
    console.log("method", method);
    console.log("namea", name);
    console.log("valuea", value);
    const row = Object.assign(current, name=="id"?{id:{value:value}}:{namex:value});
    console.log('name', name);
    console.log('value', value);
    eval(method)(value);
  };
  const mapping = item => <option key={item.id} value={item.id}>
    {item.id+ " ".concat (item.name)}</option>;

  const mapping2 = item => <option key={item.name} value={item.name}>
    {item.name+" ".concat(item.id)}</option>;

  const submitEdit = event => {
    event.preventDefault();
    console.log("submitEdit1 current", current);
    const url_=value.url.concat('/')
                     .concat(account).concat('/')
                     .concat(fromPeriod).concat('/')
                     .concat(toPeriod);
    setUrl(url_);
  };
  const getAccount =(id) =>value.accData.hits.filter(acc=>acc.id===id)
  function getBalance(data) {
    console.log('data.account', data.account);
    const accArray=getAccount(data.account);
    console.log('data.account', data.account);
    const acc=accArray[0];
    console.log('accArray', accArray);
    const b =  acc.isDebit ?
      (Number(data.idebit) + Number(data.debit)
        - Number(data.icredit) - Number(data.credit)) :
      (Number(data.icredit) + Number(data.credit)
        - Number(data.idebit) - Number(data.debit));
    return b;
  }


   const renderData = datax =>
      (
        <tr key={datax.id.value}>
          <td>{datax.period}</td>
          <td className='amount'>{currencyFormatDE(Number(datax.idebit))}</td>
          <td className='amount'>{currencyFormatDE(Number(datax.debit))}</td>
          <td className='amount'>{currencyFormatDE(Number(datax.icredit))}</td>
          <td className='amount'>{currencyFormatDE(Number(datax.credit))}</td>
          <td className='amount'>{currencyFormatDE(getBalance(datax))}</td>
          <td>{datax.currency}</td>
        </tr>
      );


  const init={id:'', account:'', period:'', idebit:'', icredit:'', debit:'', credit:'', currency:'', company:''}
  const reducerFn =(a,b)  =>({id:'', account:'', period:""
    , idebit:Number(b.idebit), icredit:Number(b.icredit)
    , debit:Number(a.debit)+Number(b.debit)
    , credit:Number(a.credit)+Number(b.credit), currency:b.currency, company:''});

  const  addRunningTotal = (data) => data.length>0?data.reduce(reducerFn, init):init;

  const renderDT=(data)=> addRunningTotal(data);

  const renderTotal = (record) =>(
    <tr key={Number.MAX_SAFE_INTEGER + 1}>
      <td className='Empty'>{record.period}</td>
      <td className='Total amount'>-</td>
      <td className='Total amount'>{currencyFormatDE(Number(record.debit))}</td>
      <td className='Total amount'>-</td>
      <td className='Total amount'>{currencyFormatDE(Number(record.credit))}</td>
      <td className='Total amount'>-</td>
      <td className='Total'>{record.currency}</td>
    </tr>
  );
  function buildForm(){
    return <Row>
             <Col xs="12" md="12">

                  <Card>
                    <CardHeader style={{ height: 40, padding:2 }}>
                      <FormGroup row className ="flex-row" style={{ height: 30, padding:2 }}>
                        <Col sm="1">
                          <strong>{value.title}</strong>
                        </Col>
                        <Col sm="10"/>
                        <Col sm="1" style={{  align: 'right' }}>
                          <div className="card-header-actions" style={{ height: 30, padding:2 }}>
                            {/*eslint-disable-next-line*/}
                            <a href="#" className="card-header-action btn btn-setting"><i className="icon-settings"></i></a>
                            {/*eslint-disable-next-line*/}
                            <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={toggle}>
                              <i className={state.collapse?UP:DOWN}></i></a>
                          </div>
                        </Col>
                      </FormGroup>
                    </CardHeader>
                    <Collapse isOpen={state.collapse} id="JScollapse" style={{height:70,padding:2}}>
                    <CardBody>
                      <Form  className="form-horizontal" onSubmit={submitEdit}>
                        <FormGroup row>
                          <Col sm="1">
                            <Label size="sm" htmlFor="input-small">Account</Label>
                          </Col>
                          <Col sm="3">
                            <Input className ="flex-row" type="select" name="account" id="account-id"
                                   value={account} onChange={handleInputChange} >
                              {value.accData.hits.map(item => mapping(item))};

                            </Input>
                          </Col>
                          <Col sm="3">
                            <Input className ="flex-row" type="select" name="account2" id="account2-id"
                                   value={account} onChange={handleInputChange} >
                              {value.accData.hits.map(item => mapping2(item))};

                            </Input>
                          </Col>
                          <Col sm="1">
                            <Label size="sm" htmlFor="input-small">From</Label>
                          </Col>
                          <Col sm="1">
                            <Input  bsSize="sm" type="text"  id="fromPeriod-id" name="fromPeriod" className="input-sm"
                                    placeholder="fromPeriod" value={fromPeriod} onChange={handleInputChange} />
                          </Col>
                          <Col sm="1">
                            <Label size="sm" htmlFor="input-small">To</Label>
                          </Col>
                          <Col sm="1">
                            <Input  bsSize="sm" type="text"  id="toPeriod-id" name="toPeriod" className="input-sm"
                                    placeholder="toPeriod" value={toPeriod} onChange={handleInputChange} />
                          </Col>
                          <Col sm="1">
                             <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o">
                             </i></Button>
                          </Col>
                        </FormGroup>
                       </Form>
                    </CardBody>
                   </Collapse>
                  </Card>

              </Col>
             <Col xs="12" md="12" style={{ padding:2 }}>
              <GenericTable data={data_.hits} renderData={renderData} renderTotal={renderTotal} renderDT = {renderDT}
                            headers={value.headers} style={{ padding:2 }}/>


             </Col>
         </Row>;
  }

  return buildForm();

};
export default PACBForm;
//<GStickyHeadTable props={props}/>
