import React, {useState,  useContext, useEffect} from 'react';

import './responsive.css';
import {accountContext} from "../Components/AccountContext";
import useFetch2 from "../../../utils/useFetch2";
import Grid from "react-fast-grid";
import blue from "@material-ui/core/colors/blue";
import {Badge, Button, Col, Collapse, Form, FormGroup, Input, Label} from "reactstrap";
import {IoMdMenu} from "react-icons/io";
import {capitalize} from "../../../utils/utils";
import TreeTableView from './TreeTableView'

export default function TreeTableForm ()  {
  const UP="icon-arrow-up";
  const DOWN="icon-arrow-down";

  const value = useContext(accountContext);
  const { data, isLoading, hasError, errorMessage, updateUrl } = useFetch2(value.url)
  const init = ()=> {return value.initialState}
  console.log("data_", data);
  const getData =()=> { return data?.data?data.data:init().data}

  const [state2, setState2]= useState({collapse: true, fadeIn: true, timeout: 300});

  const account_= value.user.account;
  const fromPeriod_ = value.user.period;
  const toPeriod_ = value.user.period;
  const [account,setAccount] = useState(account_);
  const [fromPeriod, setFromPeriod] = useState(fromPeriod_);
  const [toPeriod, setToPeriod] = useState(toPeriod_);
  useEffect(() => { setAccount(account_)}, [account_]);
  useEffect(() => { setFromPeriod(fromPeriod_)}, [fromPeriod_]);
  useEffect(() => { setToPeriod(toPeriod_)}, [toPeriod_]);
  useEffect(() => {}, [updateUrl, data, getData()]);

  const styles = {
    outer: {
      borderRadius: 5,
      boxShadow: "0 10px 30px #BBB",
      padding: 10
    }
  };

  const toggle= ()=> {
    setState2({ collapse: !state2.collapse });
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
                    <i className={state2.collapse?UP:DOWN}></i></a>
                </div>
              </Grid>
            </Grid>
            <Collapse isOpen={state2.collapse} id="JScollapse" style={{height:40,padding:2}}>
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
            </Collapse>
          </Form>
        </Grid>

        <TreeTableView data={getData()} style={{ padding:4 }}/>
    </>);
  }
return buildForm()

}
  