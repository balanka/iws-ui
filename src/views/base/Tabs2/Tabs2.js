import React, {useState} from 'react';
import {setDefaultLocale } from  "react-datepicker";
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
import {dateFormat} from "../../../utils/utils";
import {CrudAccount} from '../Components/CrudAccount'
import Login from '../../pages/login/Login'
import {useTranslation} from "react-i18next";
//const FastGridApp = React.lazy(() => import('../Forms/FastGridApp'));
//const {CrudAccount} = React.lazy(() => import('../Components/CrudAccount'));



export default function Tabs2(props){
  const { t, i18n } = useTranslation();
const [state,setState] = useState( {activeTab: new Array(1).fill('1')})
   setDefaultLocale('de');

  const toggle = (tabPane, tab) =>{
    const newArray = state.activeTab.slice();
    newArray[tabPane] = tab;
    setState({activeTab: newArray,});
  }
  const getCurrentMonth = (date)=>{
    const p=date.getUTCMonth()+1;
    return p<=10?"0".concat(p.toString()):p.toString();
  }
  const getPeriod = (date ) => {return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))};
  const initAcc = {hits:[{id:'', name: '', description: '', enterdate:new Date().getTime(), postingdate:new Date().getTime()
        , changedate:new Date().getTime(), company:'', modelid:9, account:'-1', isDebit:false, balancesheet:false
        , idebit:0.0,icredit:0.0, debit:0.0, credit:0.0 }]}
  const initbank = { hits:[ {id:'', name: '', description: '', enterdate:new Date().getTime(), postingdate:new Date().getTime()
      , changedate:new Date().getTime(), modelid:11, account:'-1', company:''}]}
  const initCC = { hits:[ {id:'', name: '', description: '', enterdate:new Date().getTime(), postingdate:new Date().getTime()
        , changedate:new Date().getTime(), modelid:6, account:'-1', company:''}]}
 const initVat={ hits:[{ id:'', name:'', description:'', percent:'', inputVatAccount:'', outputVatAccount:''
    , enterdate:new Date().toISOString(), postingdate:new Date().toISOString(), changedate:new Date().toISOString()
    , company:'', modelid:14}]}
  const initCust={hits:[{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
    , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
    , enterdate:new Date().getTime(), postingdate:new Date().getTime()
    , changedate:new Date().getTime(), company:'', modelid:3}]}
  const initSup={hits:[{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
    , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
    , enterdate:new Date().getTime(), postingdate:new Date().getTime()
    , changedate:new Date().getTime(), company:'', modelid:1}]}

  const tabPane=()=> {
    return (<>
        <TabPane tabId="1">
          <Login/>
        </TabPane>
        <TabPane tabId="2">
          <CrudAccount url ="http://127.0.0.1:8080/cc" get="md/6" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                       headers = {[{id:'id', label:t('costcenter.id'), minWidth: 5}, {id:'name', label:t('costcenter.name'), minWidth: 10},
                         {id:'description', label:t('costcenter.description'), minWidth: 15},
                         , {id:'enterdate', label:t('costcenter.enterdate'), minWidth: 5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'postingdate', label:t('costcenter.postingdate'), minWidth: 5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")},
                        ,  {id:'changedate', label:t('costcenter.changedate'), minWidth: 5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                        ,  {id:'modelid', label:'MId', minWidth: 2, format: (value) => value.toLocaleString('de-DE')},
                        ,  {id:'account', label:t('costcenter.account'), minWidth: 5}
                        , {id:'company', label:t('costcenter.company'), minWidth: 2, format: (value) => value.toLocaleString('de-DE')}]}

                       initialState={initCC}
                       initAcc={initAcc}
                       addLabel    = "Add Cost center"
                       updateLabel ="Edit Cost center"
                       title       = {t('costcenter.title')}
                       form        = 'costCenterForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="3">
          <CrudAccount url ="http://127.0.0.1:8080/acc" get="md/9" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                       headers = {[ {id:'id', label:t('account.id'), minWidth:1}, {id:'name', label:t('account.name'), minWidth:8}
                         , {id:'description', label:t('account.description'), minWidth:30}
                         , {id:'modelid', label:'MId.', numeric:true, disablePadding:false, minWidth:1, format:(value) => value}
                         , {id:'account', label:t('account.account')}, {id:'company', label:t('account.company')}
                         , {id:'isDebit', label:t('account.debit_credit'), numeric:true, format:(value) => String(value)}
                         , {id:'balancesheet', label:t('account.balancesheet'), numeric:true, format:(value) => String(value)},
                         , {id:'enterdate', label:t('account.enterdate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'postingdate', label:t('account.postingdate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'changedate', label:t('account.changedate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                       ]}
                       initialState={initCust}
                       initAcc={initAcc}
                       addLabel    = "Add Account"
                       updateLabel = "Edit Account"
                       title       = {t('account.title')}
                       form        = 'accountForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="4">
          <CrudAccount url ="http://127.0.0.1:8080/vat" get="md/14" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                       headers = {[{id:'id', label:t('vat.id')}, {id:'name', label:t('vat.name')}, {id:'description', label:t('vat.description')}
                         , {id:'percent', label:t('vat.percent')}, {id:'inputVatAccount', label:t('vat.input_account')}, {id:'outputVatAccount', label:t('vat.output-account')}
                         , {id:'enterdate', label:t('vat.enterdate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'postingdate', label:t('vat.postingdate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'changedate', label:t('vat.changedate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'company', label:t('vat.company')}, {id:'modelid', label:'M.Id'}]}
                       initialState={initVat}
                       initAcc={initAcc}
                       addLabel    = "Add Vat"
                       updateLabel = "Edit Vat"
                       title       = {t('vat.title')}
                       form        = 'vatForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="5">
          <CrudAccount url ="http://127.0.0.1:8080/cust" get="md/3" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                       headers = {[{id:'id', label:t('customer.id'), minWidth: 1}, {id:'name', label:t('customer.name'), minWidth: 8}
                         , {id:'description', label:t('customer.description'), minWidth:8}, {id:'street', label:t('customer.street'), minWidth: 15}
                         , {id:'zip', label:t('customer.zip'), minWidth:1}, {id:'country', label:t('customer.country'), minWidth:1}
                         , {id:'phone', label:t('customer.phone'), minWidth:2}, {id:'email', label:t('customer.email'), minWidth: 1}
                         , {id:'account', label:t('customer.account'), minWidth:2}, {id:'oaccount', label:t('customer.oaccount'), minWidth:2}
                         , {id:'iban', label:t('customer.iban'), minWidth: 2}, {id:'vatcode', label:t('customer.vat'), minWidth:1, disablePadding: true}
                         , {id:'enterdate', label:t('customer.enterdate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'postingdate', label:t('customer.postingdate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'changedate', label:t('customer.changedate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'modelid', label:'M.Id', minWidth:1, disablePadding: true}, {id:'company', label:t('customer.company')
                           , minWidth:1, disablePadding: true}]}

                       initialState={initCust}
                       initAcc={initAcc}
                       addLabel    = "Add Customer"
                       updateLabel = "Edit Customer"
                       title       = {t('customer.title')}
                       form        = 'customerForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="6">
          <CrudAccount url ="http://127.0.0.1:8080/sup" get="md/3" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                       headers = {[{id:'id', label:t('supplier.id'), minWidth: 1}, {id:'name', label:t('supplier.name'), minWidth: 8}
                         , {id:'description', label:t('supplier.description'), minWidth:8}, {id:'street', label:t('supplier.street'), minWidth: 15}
                         , {id:'zip', label:t('supplier.zip'), minWidth:1}, {id:'city', label:t('supplier.city'), minWidth:1}
                         , {id:'country', label:t('supplier.country'), minWidth:1}
                         , {id:'phone', label:t('supplier.phone'), minWidth:2}, {id:'email', label:t('supplier.email'), minWidth: 1}
                         , {id:'account', label:t('customer.account'), minWidth:2}, {id:'oaccount', label:t('supplier.oaccount'), minWidth:2}
                         , {id:'iban', label:t('supplier.iban'), minWidth: 2}, {id:'vatcode', label:t('supplier.vat'), minWidth:1, disablePadding: true}
                         , {id:'enterdate', label:t('supplier.enterdate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'postingdate', label:t('supplier.postingdate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'changedate', label:t('supplier.changedate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'modelid', label:'M.Id', minWidth:1, disablePadding: true}, {id:'company', label:t('supplier.company')
                         , minWidth:1, disablePadding: true}]}

                       initialState={initSup}
                       initAcc={initAcc}
                       addLabel    = "Add Customer"
                       updateLabel = "Edit Customer"
                       title       = {t('supplier.title')}
                       form        = 'supplierForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="7">
          <CrudAccount url ="http://127.0.0.1:8080/bank" get="md/11" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                       headers = {[{id:'id', label:t('bank.id'), minWidth: 5}, {id:'name', label:t('bank.name'), minWidth: 10},
                         {id:'description', label:t('bank.description'), minWidth: 15},
                         , {id:'enterdate', label:t('bank.enterdate'), minWidth: 5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'postingdate', label:t('bank.postingdate'), minWidth: 5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")},
                         ,  {id:'changedate', label:t('bank.changedate'), minWidth: 5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         ,  {id:'modelid', label:'MId', minWidth: 2, format: (value) => value.toLocaleString('de-DE')},
                         ,  {id:'account', label:t('bank.account'), minWidth: 5}
                         , {id:'company', label:t('bank.company'), minWidth: 2, format: (value) => value.toLocaleString('de-DE')}]}
                       initialState={initbank}
                       initAcc={initAcc}
                       addLabel    = "Add Bank"
                       updateLabel ="Edit Bank"
                       title       = {t('bank.title')}
                       form        = 'costCenterForm'>
          </CrudAccount>
        </TabPane>
      </>
    );
  }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '1'}
                  onClick={() => { toggle(0, '1'); }}>
                  {t('login.title')}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '2'}
                  onClick={() => { toggle(0, '2'); }}>
                  {t('costcenter.title')}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '3'}
                  onClick={() => { toggle(0, '3'); }}>
                  {t('account.title')}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '4'}
                  onClick={() => { toggle(0, '4'); }}>
                  {t('vat.title')}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '5'}
                  onClick={() => { toggle(0, '5'); }}>
                  {t('customer.title')}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '6'}
                  onClick={() => { toggle(0, '6'); }}>
                  {t('supplier.title')}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '7'}
                  onClick={() => { toggle(0, '7'); }}>
                  {t('bank.title')}
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={state.activeTab[0]}>
              {tabPane()}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
}

