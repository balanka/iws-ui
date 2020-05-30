import React, {useEffect, useState, useContext} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Badge, Col, Collapse, Form, FormGroup, Input, Label} from "reactstrap";
import {capitalize, dateFormat, currencyAmountFormatDE} from "../../../utils/utils"
import {accountContext} from './AccountContext';
import EnhancedTable from '../Tables2/EnhancedTable';
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import {IoMdMenu} from "react-icons/io";

const BankStatementForm = () => {
  const [state, setState]= useState({collapse: false, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const value = useContext(accountContext);

  const data_= value.data;

  const UP="icon-arrow-up";
  const DOWN="icon-arrow-down";

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
  const dx=data_?.hits?data_?.hits:[value.initialState]
  console.log('dxx', dx);
  const [filteredRows, setFilteredRows] = useState(dx);
  const [current,setCurrent] = useState(current_);
  const [id,setId] = useState(id_);
  const [depositor,setDepositor] = useState(depositor_);
  const [postingdate, setPostingdate] = useState(postingdate_);
  const [valuedate, setValuedate] = useState(valuedate_);
  console.log('valuedate_', valuedate_);
  console.log('valuedate', valuedate);
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
  useEffect(() => { setData(data_)}, [data_, value.data]);
  useEffect(() => { }, [filteredRows]);
  console.log('editing', editing);
  console.log('editing_', editing_);
  console.log('valuex', value);
  console.log('company_', company);
  console.log('id', id);
  console.log('beneficiary', beneficiary);
  console.log('id_', id_);
  console.log('depositor_', depositor_);
  console.log('beneficiary_', beneficiary_);

  function handleFilter(text) {

    console.log('called+', text)
    let filteredRows_=!text?dx:dx.filter(function(rc) {

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
    setState({ collapse:!state.collapse });
  }

  const cancelEdit = (e) => {
   // e.preventDefault();
    //initAdd();
    setSelected([]);
  };
  const edit = id =>{
    const record = dx.find(obj => obj.id === id);
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
    console.log("submitAdd1 current", current);
  };

  function buildForm(current1){
    console.log("editing", editing);
    console.log("user1xx", current1);
    const addOrEdit = (typeof current1.editing==='undefined')?editing:current1.editing;
    const submit= addOrEdit?submitEdit:submitAdd
    const props={title:value.title, columns:value.headers, rows:filteredRows, edit:edit, submit:submit, selected:selected
      , editable:true, setSelected:setSelected, cancel:cancelEdit, handleFilter:handleFilter,rowsPerPageOptions:[15, 25, 100,500, 1000]}
    return <>
      <Grid container spacing={2} direction="column" >
        <Form  className="form-horizontal" onSubmit={ addOrEdit?submitEdit:submitAdd} style={{padding:0}}>
          <Grid container justify="space-between">
            <Grid container xs spacing={1} justify="flex-start">
              <Grid item justify="center" alignItems="center">
                <IoMdMenu />
              </Grid>
              <Grid item> <h5><Badge color="primary">{value.title}</Badge></h5></Grid>
            </Grid>
            <Grid item justify="flex-end" alignItems="center">
              <div className="card-header-actions" style={{  align: 'right' }}>
                {/*eslint-disable-next-line*/}
                <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={toggle}>
                  <i className={state.collapse?UP:DOWN}></i></a>
              </div>
            </Grid>
          </Grid>
             <Collapse isOpen={state.collapse} id="JScollapse" style={{padding:2}}>
                 <FormGroup row style={{  height:15 }}>
                          <Col sm="2">
                            <Label size="sm" htmlFor="input-small">Id</Label>
                          </Col>
                          <Col sm="4">
                            <Input disabled bsSize="sm" type="text" id="account-id" name="id" className="input-sm" placeholder="Id" value= {id} onChange={handleInputChange} />
                          </Col>
                          <Col sm="1">
                            <Label size="sm" htmlFor="input-small">Posted on</Label>
                          </Col>
                          <Col sm="1.5">
                            <Input disabled bsSize="sm" type="text"  id="postingdate-id" name="postingdate" className="input-sm" placeholder="date" value={dateFormat(current.postingdate, "dd mm yy")} />
                          </Col>
                        </FormGroup>
                 <FormGroup row style={{  height:15 }}>
                          <Col sm="2">
                            <Label size="sm" htmlFor="input-small">Depositor</Label>
                          </Col>
                          <Col sm="4">
                            <Input disabled bsSize="sm" type="text" id="depositor-input" name="depositor" className="input-sm" placeholder="depositor" value={depositor} onChange={handleInputChange} />
                          </Col>
                          <Col sm="1">
                            <Label size="sm" htmlFor="input-small">Valuedate</Label>
                          </Col>
                          <Col sm="1.5">
                            <DatePicker  disabled locale="de-DE" dateFormat='dd.MM.yyyy' selected={valuedate} onChange={date => setValuedate(date)} />
                          </Col>
                        </FormGroup>
                 <FormGroup row style={{  height:15 }}>
                          <Col sm="2">
                            <Label size="sm" htmlFor="input-small">Payee/Payer</Label>
                          </Col>
                          <Col sm="4">
                            <Input disabled bsSize="sm" type="text" id="beneficiary-input" name="beneficiary"
                                   className="input-sm" placeholder="beneficiary" value={beneficiary}
                                   onChange={handleInputChange} />
                          </Col>
                          <Col sm="1">
                            <Label size="sm" htmlFor="input-small">P.Text</Label>
                          </Col>
                          <Col sm="1.5">
                            <Input disabled bsSize="sm"  type="text"  id="postingtext-id" name="postingtext"
                                   className="input-sm" placeholder="postingtext" value={current.postingtext} />
                          </Col>
                        </FormGroup>
                 <FormGroup row style={{  height:15 }}>
                        <Col sm="2">
                          <Label size="sm" htmlFor="input-small">Info</Label>
                        </Col>
                        <Col xs="4">
                          <Input disabled bsSize="sm" type="text" id="info-input" name="info" className="input-sm"
                                 placeholder="info" value={info} onChange={handleInputChange} />
                        </Col>
                        <Col sm="1">
                          <Label size="sm" htmlFor="input-small">Amount</Label>
                        </Col>
                        <Col sm="1.5">
                          <Input disabled bsSize="sm" type="text" id="amount-input" name="amount" className="input-sm"
                                 placeholder="amount" value={currencyAmountFormatDE(Number(amount),currency)} onChange={handleInputChange}
                                 style={{ 'text-align':'right' }}/>
                        </Col>
                      </FormGroup>
                 <FormGroup row style={{  height:15 }}>
                        <Col sm="2">
                          <Label size="sm" htmlFor="input-small">Company IBAN</Label>
                        </Col>
                        <Col sm="4">
                          <Input disabled ={posted} bsSize="sm" type="text" id="companyIban-id" name="companyIban" className="input-sm" placeholder="companyIban" value={companyIban} onChange={handleInputChange} />
                        </Col>

                        <Col sm="2">
                          <Label size="sm" htmlFor="input-small">Co.</Label>
                        </Col>
                        <Col sm="2">
                          <Input disabled bsSize="sm" type="text" id="company-input" name="company" className="input-sm" placeholder="company" value={company} onChange={handleInputChange} />
                        </Col>
                        <Col sm="1">
                          <Input disabled className="form-check-input" type="checkbox" id="posted" name="posted" value={current.posted}
                                 checked={posted} onClick={handleInputChange}/>
                          <Label className="form-check-label" check htmlFor="posted">Posted?</Label>
                        </Col>
                      </FormGroup>
                 <FormGroup row style={{  height:15 }}>
                        <Col sm="2">
                          <Label size="sm" htmlFor="input-small">Acc.No/BankCd.</Label>
                        </Col>
                        <Col sm="4">
                          <Input disabled ={posted} bsSize="sm" type="text" id="accountno-input" name="accountno" className="input-sm" placeholder="accountno" value={accountno} onChange={handleInputChange} />
                        </Col>
                        <Col sm="1.5">
                          <Input disabled ={posted} bsSize="sm" type="text" id="bankCode-input" name="bankCode" className="input-sm" placeholder="bankCode" value={bankCode} onChange={handleInputChange} />
                        </Col>
                      </FormGroup>
                 <FormGroup row style={{  height:15 }}>
                        <Col sm="2">
                          <Label size="sm" htmlFor="input-small">Purpose</Label>
                        </Col>
                        <Col xs="12"   md="9">
                          <Input disabled ={posted} bsSize="sm" type="textarea" id="purpose-input" name="purpose" className="input-sm"
                                 placeholder="purpose" value={purpose} onChange={handleInputChange} rows="3"/>
                        </Col>
                      </FormGroup>
             </Collapse>
        </Form>
      </Grid>
      <EnhancedTable props={props} style={{padding:0, height:80}}/>
    </>;
  }

  return buildForm(current);

};
export default BankStatementForm;

