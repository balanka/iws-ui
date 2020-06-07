import React, {useEffect, useState, useContext} from 'react'
import {Badge, Button, Col, Collapse, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {capitalize} from "../../../utils/utils"
import BalancesheetTreeView from '../Tree/BalancesheetTreeView'
import {accountContext} from './AccountContext';
import useFetch from "../../../utils/useFetch";
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import {IoMdMenu} from "react-icons/io";


const BalancesheetForm = () => {
  const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
  const [selected, setSelected] = useState([]);
  const UP="icon-arrow-up";
  const DOWN="icon-arrow-down";
  const value = useContext(accountContext);
  const url_= value.url
  console.log("valuey", value);
  console.log("url_", url_);
  const [url,setUrl] = useState(url_);
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
    const row = Object.assign(current, {name:value});
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
  const [filteredRows, setFilteredRows] = useState(dx);
  useEffect(() => {}, [data_]);
  function handleFilter(text) {
    const filteredRows_ = !text?dx:dx.filter(function(rc) {
      return (rc.id.toString().indexOf(text)>-1
        ||rc.transid.toString().indexOf(text)>-1
        ||rc.account.indexOf(text)>-1
        ||rc.oaccount.indexOf(text)>-1
        ||rc.transdate.indexOf(text)>-1
        ||rc.enterdate.indexOf(text)>-1
        ||rc.postingdate.indexOf(text)>-1
        ||rc.period.toString().indexOf(text)>-1
        ||rc.amount.toString().indexOf(text)>-1
        ||rc.idebit.toString().indexOf(text)>-1
        ||rc.debit.toString().indexOf(text)>-1
        ||rc.icredit.toString().indexOf(text)>-1
        ||rc.credit.toString().indexOf(text)>-1
        ||rc.currency.indexOf(text)>-1
        ||rc.side.toString().indexOf(text)>-1
        ||rc.year.toString().indexOf(text)>-1
        ||rc.month.toString().indexOf(text)>-1
        ||rc.credit.toString().indexOf(text)>-1
        ||rc.modelid.toString().indexOf(text)>-1
        ||rc.company.indexOf(text)>-1
        ||rc.text.indexOf(text)>-1
        ||rc.typeJournal.toString().indexOf(text)>-1
        ||rc.file_content.toString().indexOf(text)>-1)});
    console.log('filteredRows+', filteredRows_);
    setFilteredRows(filteredRows_);
  }
  const getFilteredRows=()=>{
    return filteredRows?filteredRows:dx
  }
  const edit = id =>{
    const record = dx.find(obj => obj.id === id);
    value.editRow(record);
  }
  const cancelEdit = (e) => {
    setSelected([]);
  };
  function buildForm(current1){
   // console.log("editing", editing);
    console.log("user1xx", current1);
    const props = {
      title: value.title, columns: value.headers, rows: data_.hits, edit: edit, submit: submitQuery, selected: selected
      , editable:true, setSelected: setSelected, cancel: cancelEdit, handleFilter: handleFilter, rowsPerPageOptions: [5, 15, 25, 100]
    }
   /* const props = { title: value.title, columns:value.headers, rows:getFilteredRows()
      , edit:edit, editable:false, submit:submitQuery, selected:selected
      , setSelected: setSelected, cancel: cancelEdit, handleFilter: handleFilter, rowsPerPageOptions: [5, 15, 25, 100]
    }
    */
    return <>
      <Grid container spacing={2} style={{ padding: 20, 'background-color':blue }} direction="column" >
        <Form  className="form-horizontal" onSubmit={submitQuery} style={{padding:0}}>
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
        </Form>
        <BalancesheetTreeView props={props} style={{padding: 0, height: 500}}/>

      </Grid>

  </>
  }

  return buildForm(current);

};
export default BalancesheetForm;
//   <EnhancedTableX props={props} style={{padding: 0, height: 500}}/>
