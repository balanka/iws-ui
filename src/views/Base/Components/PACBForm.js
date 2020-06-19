import React, {useEffect, useState, useContext} from 'react'
import {Badge, Button, Col, Collapse, Form, FormGroup, Input, Label} from "reactstrap";
import EnhancedTable from '../Tables2/EnhancedTable';
import { StyledTableRow, StyledTableCell} from '../Tables2/EnhancedTableHelper'
import {accountContext} from './AccountContext';
import {capitalize, currencyFormatDE} from "../../../utils/utils";
import useFetch from "../../../utils/useFetch";
import Grid from "react-fast-grid";
import {IoMdMenu} from "react-icons/io";

const PACBForm = () => {
  const UP="icon-arrow-up";
  const DOWN="icon-arrow-down";
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const [url,setUrl] = useState('');
  const value = useContext(accountContext);
  const res  = useFetch(url, {});
  const data_ = res && res.response?res.response:{hits:[]};
    const dx=data_?.hits?data_?.hits:[value.initialState]
    console.log("dx", dx);
  const current_= value.user;
  const account_= value.user.account;
  const fromPeriod_ = value.user.period;
  const toPeriod_ = value.user.period;
  const columns = value.headers

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

    const styles = {
        outer: {
            borderRadius: 5,
            boxShadow: "0 10px 30px #BBB",
            padding: 10
        }
    };
  const toggle= ()=> {
    setState({ collapse: !state.collapse });
  }

  const handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    const method="set"+capitalize(name)
    eval(method)(value);
  };
  const mapping = item => <option key={item.id} value={item.id}>
    {item.id+ " ".concat (item.name)}</option>;

  const mapping2 = item => <option key={item.name} value={item.name}>
    {item.name+" ".concat(item.id)}</option>;

    const [filteredRows, setFilteredRows] = useState(dx);
    useEffect(() => {}, [data_]);
    function handleFilter(text) {
        const filteredRows_ = !text?dx:dx.filter(function(rc) {
            return (rc.id.toString().indexOf(text)>-1
                ||rc.account.indexOf(text)>-1
                ||rc.period.toString().indexOf(text)>-1
                ||rc.idebit.toString().indexOf(text)>-1
                ||rc.debit.toString().indexOf(text)>-1
                ||rc.icredit.toString().indexOf(text)>-1
                ||rc.credit.toString().indexOf(text)>-1
                ||rc.currency.indexOf(text)>-1)
        });
        console.log('filteredRows+', filteredRows_);
        setFilteredRows(filteredRows_);
    }

    const getFilteredRows=()=>{
        const row=filteredRows?filteredRows:dx
        var rowx = row.slice();
        for(var i = 0, len = row.length; i < len; ++i)
            rowx[i] = {...rowx[i], balance:rowx[i].idebit+rowx[i].debit -(rowx[i].icredit+rowx[i].credit)};
        return rowx
    }
  const submitEdit = event => {
    event.preventDefault();
    console.log("submitEdit1 current", current);
    const url_=value.url.concat('/')
                     .concat(account).concat('/')
                     .concat(fromPeriod).concat('/')
                     .concat(toPeriod);
    setUrl(url_);
  };

  const init=value.initialState
  const reducerFn =(a,b)  =>({ period:""
    , idebit:Number(b.idebit)
    , debit:Number(a.debit)+Number(b.debit)
    , icredit:Number(b.icredit)
    , credit:Number(a.credit)+Number(b.credit)
    , balance:Number(a.debit)+Number(b.debit)+Number(a.idebit)+Number(b.idebit)
          -Number(a.credit)-Number(b.credit)-Number(a.icredit)-Number(b.icredit)
    , currency:b.currency, company:b.company});

  const  addRunningTotal = (data) => data.length>0?data.reduce(reducerFn, init):init;
  const renderDT=(data)=> addRunningTotal(data);

    const renderTotal = (rows)=>{
        return(
            <StyledTableRow>
                <StyledTableCell colSpan={2} style={{ height: 33, 'font-size': 14, 'font-weight':"bolder" }}>Total</StyledTableCell>
                <StyledTableCell colSpan={2} style={{ height: 33, 'font-size': 14, 'font-weight':"bolder"
                    , 'text-align':"right" }}>
                    {columns[3].format(renderDT(rows).debit).concat(" ").concat(renderDT(rows).currency)}
                </StyledTableCell>
                <StyledTableCell colSpan={3} style={{ height: 33, 'font-size': 14, 'font-weight':"bolder"
                    , 'text-align':"center" }}>
                    {columns[3].format(renderDT(rows).credit).concat(" ").concat(renderDT(rows).currency)}
                </StyledTableCell>
            </StyledTableRow>
        )
    }

  function buildForm(){

      const props = { title: value.title, columns:value.headers, rows:getFilteredRows(),  editable:false
          ,  submit:submitEdit, selected:selected, colId:3, initialState:init, renderDT:renderDT
          ,  reducerFn:reducerFn, renderTotal:renderTotal, setSelected: setSelected, handleFilter:handleFilter
          , rowsPerPageOptions: [15, 25, 100]
      }
    return <>
      <Grid container spacing={2} direction="column" style={{...styles.outer}}>
        <Form  className="form-horizontal" onSubmit={submitEdit} style={{padding:0}}>
          <Grid container justify="space-between">
            <Grid container xs spacing={1} justify="flex-start">
              <Grid item justify="center" alignItems="center">
                <IoMdMenu />
              </Grid>
              <Grid item><h5><Badge color="primary">{value.title}</Badge></h5></Grid>
            </Grid>
            <Grid item justify="flex-end" alignItems="center">
              <div className="card-header-actions" style={{  align: 'right' }}>
                {/*eslint-disable-next-line*/}
                <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={toggle}>
                  <i className={state.collapse?UP:DOWN}></i></a>
              </div>
            </Grid>
          </Grid>
            <Collapse isOpen={state.collapse} id="JScollapse" style={{height:70,padding:2}}>
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
             </Collapse>
           </Form>
         </Grid>
          <EnhancedTable props={props} style={{padding: 0, height: 50}}/>
         </>;
  }

  return buildForm();

};
export default PACBForm;

