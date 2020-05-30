import React, {useEffect, useState, useContext} from 'react'
import {Button, Card, CardBody, CardHeader, Col, Collapse, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {capitalize, dateFormat, currencyFormatDE} from "../../../utils/utils"
import GenericTable from "../Tables2/GenericTable";
import {accountContext} from './AccountContext';
import useFetch from "../../../utils/useFetch";
import GStickyHeadTable from "../Tables2/GStickyHeadTable";

const BankStatementForm = () => {
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const UP   = "icon-arrow-up";
  const DOWN = "icon-arrow-down";
  const value = useContext(accountContext);
  const [url,setUrl] = useState('');
  const res  = useFetch(url, {});
  const data_ = res && res.response?res.response:{hits:[]};
  const dx=data_?.hits?data_?.hits:[value.initialState]
  console.log("dx", dx);
  const current_= value.user;
  const account_= value.user.account;
  const fromPeriod_ = value.user.period;
  const toPeriod_ = value.user.period;

  console.log("data_", data_);
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


  const columns = [
    { id: 'id', label: 'Id', minWidth: 5, numeric:true },
    { id: 'transid', label: 'Transid', minWidth: 5, numeric:true },
    { id: 'oid', label: 'Oid', minWidth: 5, numeric:true },
    {id: 'account', label: 'Acc.', minWidth: 5},
    {id: 'oaccount', label: 'A.Acc.', minWidth: 5 },
    {id: 'transdate', label: 'Transdate', minWidth: 10, align: 'right', numeric:true
      , format: (value) => dateFormat(value,"ddmmyy")},
    {id: 'postingdate', label: 'Posted', minWidth: 10, align: 'right', numeric:true
      , format: (value) => dateFormat(value,"ddmmyy")},
    {id: 'enterdate', label: 'Created', minWidth: 10, align: 'right', numeric:true
    ,  format: (value) => dateFormat(value,"ddmmyy")},
    {id: 'period', label: 'Period', minWidth: 5, align: 'right', numeric:true},
    { id: 'amount', label: 'Amount', minWidth:5, align: 'right', numeric:true
     ,  format: (value) => currencyFormatDE(Number(value)),
    },
    { id: 'idebit', label: 'IDebit', minWidth:5, align: 'right', numeric:true
     , format: (value) => currencyFormatDE(Number(value)),
    },
    { id: 'debit', label: 'Debit', minWidth:5, align: 'right', numeric:true
     , format: (value) => currencyFormatDE(Number(value)),
    },
    { id: 'icredit', label: 'ICredit', minWidth:5, align: 'right', numeric:true
      , format: (value) => currencyFormatDE(Number(value)),
    },
    { id: 'credit', label: 'Credit', minWidth:5, align: 'right', numeric:true
      , format: (value) => currencyFormatDE(Number(value)),
    },
    { id: 'side', label: 'D/C', minWidth:5},
    { id: 'text', label: 'Text', minWidth:100},
    { id: 'month', label: 'Month', minWidth:5, align: 'right', numeric:true },
    { id: 'year', label: 'Year', minWidth:5, align: 'right', numeric:true },
    { id: 'company', label: 'Co.', minWidth:5 },
    { id: 'typeJournal', label: 'Type', minWidth:5, align: 'right', numeric:true},
    { id: 'file_content', label: 'File', minWidth:5, align: 'right', numeric:true},
    { id: 'modelid', label: 'M.Id', minWidth:5, align: 'right', numeric:true}
  ];

  const props={columns:columns, rows:dx, rowsPerPageOptions:[10, 25, 50, 100]}

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
    eval(method)(value);
    console.log('currentz', row);
    console.log('currentz', current);
    setCurrent(row);
  };

  const mapping = item => <option key={item.id} value={item.id}>
    {item.id+ " ".concat (item.name)}</option>;

  const mapping2 = item => <option key={item.name} value={item.name}>
    {item.name+" ".concat(item.id)}</option>;

  const submitQuery = event => {
    event.preventDefault();
    console.log("submitQuery current", current);
    const url_=value.url.concat('/')
      .concat(account).concat('/')
      .concat(fromPeriod).concat('/')
      .concat(toPeriod);
    setUrl(url_);
  };

  const renderData = datax =>(
    <tr key={datax.id}>
      <td>{datax.id}</td>
      <td>{datax.transid}</td>
      <td>{datax.oid}</td>
      <td>{datax.account}</td>
      <td>{datax.oaccount}</td>
      <td>{dateFormat(datax.transdate,"dd mm yy")}</td>
      <td>{dateFormat(datax.postingdate, "dd mm yy")}</td>
      <td>{dateFormat(datax.enterdate, "dd mm yy")}</td>
      <td>{datax.period}</td>
      <td className='amount'>{currencyFormatDE(Number(datax.amount))}</td>
      <td className ='amount'>{currencyFormatDE(Number(datax.idebit))}</td>
      <td className ='amount'>{currencyFormatDE(Number(datax.debit))}</td>
      <td className ='amount'>{currencyFormatDE(Number(datax.icredit))}</td>
      <td className ='amount'>{currencyFormatDE(Number(datax.credit))}</td>
      <td>{datax.currency}</td>
      <td>{datax.side.toString()}</td>
      <td>{datax.text}</td>
      <td>{datax.month}</td>
      <td>{datax.year}</td>
      <td>{datax.company}</td>
      <td>{datax.typeJournal}</td>
      <td>{datax.file_content}</td>
      <td>{datax.modelid}</td>
    </tr>
  );
  function buildForm(current1){
   // console.log("editing", editing);
    console.log("user1xx", current1);
   // const addOrEdit = (typeof current1.editing==='undefined')?editing:current1.editing;
    return <Row>
      <Col xs="12" md="12">
        <Form  className="form-horizontal" onSubmit={submitQuery}>
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
            <Collapse isOpen={state.collapse} id="JScollapse" style={{height:40,padding:2}}>
              <CardBody style={{padding:2 }}>
                 <FormGroup row >
                <Col sm="1">
                  <Label size="sm" htmlFor="input-small">Account</Label>
                </Col>
                <Col sm="3">
                  <Input className ="flex-row" type="select" name="account" id="account-id"
                         value={account} onChange={handleInputChange} style={{ height: 30, padding:2 }}>
                    {value.accData.hits.map(item => mapping(item))};

                  </Input>
                </Col>
                <Col sm="4">
                  <Input className ="flex-row" type="select" name="account2" id="account2-id"
                         value={account} onChange={handleInputChange} style={{ height: 30, padding:2 }}>
                    {value.accData.hits.map(item => mapping2(item))};

                  </Input>
                </Col>
                <Col sm="0.5" style={{ align: 'right' , padding:2}}>
                  <Label size="sm" htmlFor="input-small">From</Label>
                </Col>
                <Col sm="1">
                  <Input  bsSize="sm" type="text"  id="fromPeriod-id" name="fromPeriod" className="input-sm"
                          placeholder="fromPeriod" value={fromPeriod} onChange={handleInputChange} style={{ height: 30, padding:1 }}/>
                </Col>
                <Col sm="0.5" style={{ align: 'right' , padding:2}}>
                  <Label size="sm" htmlFor="input-small">To</Label>
                </Col>
                <Col sm="1">
                  <Input  bsSize="sm" type="text"  id="toPeriod-id" name="toPeriod" className="input-sm"
                          placeholder="toPeriod" value={toPeriod} onChange={handleInputChange} style={{ height: 30, padding:1, align: 'right'}}/>
                </Col>
                <Col sm="1" style={{ align: 'right' }}>
                  <Button type="submit" size="sm" color="primary" style={{ align: 'right' }}><i className="fa fa-dot-circle-o">
                  </i></Button>
                </Col>
              </FormGroup>
               </CardBody>
           </Collapse>
          </Card>
        </Form>
      </Col>
             <Col xs="12" md="12" style={{  padding:2 }}>
               <GStickyHeadTable props={props}/>
             </Col>
         </Row>
  }

  return buildForm(current);

};
export default BankStatementForm;
//<GenericTable data={data_.hits} renderData={renderData} headers={value.headers} style={{ padding:2 }}/>
