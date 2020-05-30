import React, {useState} from 'react';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import de from 'date-fns/locale/de';
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
import {currencyFormatDE, dateFormat} from "../../../utils/utils";
const Forms2 = React.lazy(() => import('../Forms2/Forms2'));
const Tables2 = React.lazy(() => import('../Tables2/Tables2'));
const FastGridApp = React.lazy(() => import('../Forms/FastGridApp'));
const CrudAccount = React.lazy(() => import('../Components/CrudAccount'));


export default function Tabs2(props){
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


  const tabPane=()=> {
    return (<>
        <TabPane tabId="1">
          <FastGridApp/>
        </TabPane>
        <TabPane tabId="2" >
          <CrudAccount  url ="http://localhost:8080/pets/mf" accUrl="http://localhost:8080/pets/accmd/9"
                       get="md/0"
                        headers= {[{ id: 'id', label: 'Id', minWidth: 5 }, { id: 'name', label: 'Name', minWidth: 30 },
                          { id: 'description', label: 'Description', minWidth: 100 }, {id: 'modelid', label: 'ModelId', minWidth: 5,
                          format: (value) => value.toLocaleString('de-DE')}, { id: 'parent', label: 'Group', minWidth: 5 }]}
                       initialState = {{ id:'', name: '', description: '', modelid:0, parent:'-1'}}
                       addLabel     = "Add Masterfile"
                       updateLabel  = "Edit Masterfile"
                       title        = "Masterfiles"
                       form         = 'masterfileForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="3">
          <CrudAccount url ="http://localhost:8080/pets/cc" get="md/6" accUrl="http://localhost:8080/pets/accmd/9"
                       headers = {[{id:'id', label:'Id', minWidth: 5}, {id:'name', label:'Name', minWidth: 10},
                         {id:'description', label:'Description', minWidth: 15},
                         , {id:'enterdate', label:'Created', minWidth: 5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'postingdate', label:'Posted', minWidth: 5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")},
                        ,  {id:'changedate', label:'Modified', minWidth: 5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                        ,  {id:'modelid', label:'MId', minWidth: 2, format: (value) => value.toLocaleString('de-DE')},
                        ,  {id:'account', label:'Account', minWidth: 5}
                        , {id:'company', label:'Co.', minWidth: 2, format: (value) => value.toLocaleString('de-DE')}]}

                       initialState={{ id:'', name: '', description: '', enterdate:new Date().getTime(), postingdate:new Date().getTime()
                         , changedate:new Date().getTime(), modelid:6, account:'-1', company:''}}
                       addLabel    = "Add Cost center"
                       updateLabel ="Edit Cost center"
                       title       = "Cost center"
                       form        = 'costCenterForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="4">
          <CrudAccount url ="http://localhost:8080/pets/acc" get="md/9" accUrl="http://localhost:8080/pets/accmd/9"
                       headers = {[ {id:'id', label:'Id', minWidth:1}, {id:'name', label:'Name', minWidth:8}
                        , {id:'description', label:'Description', minWidth:30}
                         , {id:'modelid', label:'MId.', numeric:true, disablePadding:false, minWidth:1, format:(value) => value}
                         , {id:'account', label:'Account'}, {id:'company', label:'Co.'}
                         , {id:'isDebit', label:'D/C', numeric:true, format:(value) => String(value)}
                         , {id:'balancesheet', label:'Balancesheet', numeric:true, format:(value) => String(value)},
                         , {id:'enterdate', label:'Created', minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'postingdate', label:'Posted', minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'changedate', label:'Modified', minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         ]}
                       initialState={{ id:'', name: '', description: '', enterdate:new Date().getTime(), postingdate:new Date().getTime()
                         , changedate:new Date().getTime(), company:'', modelid:9, account:'-1', isDebit:false, balancesheet:false}}
                       addLabel    = "Add Account"
                       updateLabel = "Edit Account"
                       title       = "Account"
                       form        = 'accountForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="5">
          <CrudAccount url ="http://localhost:8080/pets/cust" get="md/3" accUrl="http://localhost:8080/pets/accmd/9"
                       headers = {[{id:'id', label:'Id', minWidth: 1}, {id:'name', label:'Name', minWidth: 8}
                         , {id:'description', label:'Description', minWidth:8}, {id:'street', label:'Street', minWidth: 15}
                         , {id:'zip', label:'Zip', minWidth:1}, {id:'country', label:'Country', minWidth:1}
                         , {id:'phone', label:'Phone', minWidth:2}, {id:'email', label:'Email', minWidth: 1}
                         , {id:'account', label:'Acc.', minWidth:2}, {id:'oaccount', label:'O.Acc.', minWidth:2}
                         , {id:'iban', label:'IBAN', minWidth: 2}, {id:'vatcode', label:'Vat', minWidth:1, disablePadding: true}
                         , {id:'enterdate', label:'Created', minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'postingdate', label:'Posted', minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'changedate', label:'Modified', minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'modelid', label:'M.Id', minWidth:1, disablePadding: true}, {id:'company', label:'Co.', minWidth:1, disablePadding: true}]}
                       initialState={{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
                         , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
                         , enterdate:new Date().getTime(), postingdate:new Date().getTime()
                         , changedate:new Date().getTime(), company:'', modelid:3}}

                       addLabel    = "Add Customer"
                       updateLabel = "Edit Customer"
                       title       = "Customer"
                       form        = 'customerForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="6">
          <CrudAccount url ="http://localhost:8080/pets/vat" get="md/14" accUrl="http://localhost:8080/pets/accmd/9"
                       headers = {[{id:'id', label:'Id'}, {id:'name', label:'Name'}, {id:'description', label:'Description'}
                       , {id:'percent', label:'Percent'}, {id:'inputVatAccount', label:'In.VatAcc.'}, {id:'outputVatAccount', label:'Out.VatAcc'}
                       , {id:'enterdate', label:'Created', minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                       , {id:'postingdate', label:'Posted', minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                       , {id:'changedate', label:'Modified', minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                       , {id:'company', label:'Co.'}, {id:'modelid', label:'M.Id'}]}
                       initialState={{ id:'', name:'', description:'', percent:'', inputVatAccount:'', outputVatAccount:''
                         , enterdate:new Date().toISOString(), postingdate:new Date().toISOString(), changedate:new Date().toISOString()
                         , company:'', modelid:14}}
                       addLabel    = "Add Vat"
                       updateLabel = "Edit Vat"
                       title       = "Vat"
                       form        = 'vatForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="7">
          <CrudAccount url ="http://localhost:8080/pets/sup" get="md/1" accUrl="http://localhost:8080/pets/accmd/9"
                       headers = {[{id:'id', label:'Id', minWidth:2}, {id:'name', label:'Name', minWidth:8}
                        , {id:'description', label:'Description', minWidth:8}, {id:'street', label:'Street', minWidth:2}
                         , {id:'zip', label:'Zip', minWidth:2}, {id:'country', label:'Country', minWidth:1}
                         , {id:'phone', label:'Phone', minWidth:2}, {id:'email', label:'Email', minWidth: 2}
                         , {id:'account', label:'Acc.', minWidth:2}, {id:'oaccount', label:'O.Acc.', minWidth:2}
                         , {id:'iban', label:'IBAN', minWidth: 2}, {id:'vatcode', label:'Vat', minWidth:1, disablePadding: true}
                         , {id:'enterdate', label:'Created', minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'postingdate', label:'Posted', minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'changedate', label:'Modified', minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                         , {id:'modelid', label:'M.Id', minWidth:1}, {id:'company', label:'Co.', minWidth:5, disablePadding: true}]}

                       initialState={{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
                         , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
                         , enterdate:new Date().getTime(), postingdate:new Date().getTime()
                         , changedate:new Date().getTime(), company:'', modelid:1}}

                       addLabel    = "Add Supplier"
                       updateLabel = "Edit Supplier"
                       title       = "Supplier"
                       form        = 'supplierForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="8">
          <CrudAccount url ="http://localhost:8080/pets/bs" get="md/18" accUrl="http://localhost:8080/pets/bsmd/18"
                       headers = {[{id:'id', label:'Id', numeric:true, minWidth:1}, {id:'depositor', label:'Depositor', minWidth:1}
                       , {id:'postingdate', label:'Posted', minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                       , {id:'valuedate', label:'Valuedate', minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                       , {id:'postingtext', label:'Text', minWidth:10}, {id:'purpose', label:'Purpose', minWidth:180}
                       , {id:'beneficiary', label:'Benef.', minWidth:2}, {id:'accountno', label:'Acc.No', minWidth:2}
                       , {id:'bankCode', label:'Bank', minWidth:1}, {id:'amount', label:'Amount', numeric:true
                       , format:(value) => currencyFormatDE(Number(value)), minWidth:2}
                       , {id:'currency', label:'CCy.', minWidth:1}, {id:'info', label:'Info', minWidth:30}
                       , {id:'company', label:'Co.'}, {id:'companyIban', label:'Co.IBAN.', minWidth:2}
                       , {id:'posted', label:'Posted', numeric:true, format:(value) => String(value), minWidth:1}]}
                       initialState={{ id:'', depositor:'', postingdate:new Date(), valuedate:new Date(), postingtext:'', purpose:''
                         , beneficiary:'', accountno:'', bankCode:'', amount:'', currency:'', info:'', company:'', companyIban:''
                         , posted:'',modelid:18}}
                       addLabel    = "Add Bank statement"
                       updateLabel = "Edit Bank statement"
                       title       = "Bank statement"
                       form        = 'bankStmtForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="9">
          <CrudAccount  url ="http://localhost:8080/pets/jou" get="md/112" accUrl="http://localhost:8080/pets/accmd/9"
            headers = {[ {id:'id', label:'Id', minWidth:2, numeric:true }, {id:'transid', label:'Transid', minWidth:1, numeric:true }
            , { id: 'oid', label: 'Oid', minWidth:1, numeric:true }, {id: 'account', label: 'Acc.', minWidth:1}
            , {id: 'oaccount', label: 'A.Acc.', minWidth:2}
            , {id: 'transdate', label: 'Transdate', minWidth:5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
            , {id: 'postingdate', label: 'Posted', minWidth:5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
            , {id: 'enterdate', label: 'Created', minWidth:5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
            , {id: 'period', label: 'Period', minWidth:1, numeric:true},
            , { id: 'amount', label: 'Amount', minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
            , { id: 'idebit', label: 'IDebit', minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
            , { id: 'debit', label: 'Debit', minWidth:2,  numeric:true, format: (value) => currencyFormatDE(Number(value))}
            , { id: 'icredit', label: 'ICredit', minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
            , { id: 'credit', label: 'Credit', minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
            , { id: 'side', label: 'D/C', numeric:true, format:(value) => String(value), minWidth:1}
            , { id: 'text', label: 'Buchungstext', minWidth:15}, { id: 'month', label: 'Mth.', minWidth:1}
            , { id: 'year', label: 'Year', minWidth:1}, { id: 'company', label: 'Co.', minWidth:1 }
            , { id: 'typeJournal', label: 'Type', minWidth:1}, { id: 'file_content', label: 'File', minWidth:1}
            , { id: 'modelid', label: 'M.Id', minWidth:1}]}

                       initialState={{ id:'', transid:'', oid:'', account:'', oaccount:'', transdate:''
                         , postingdate:'', enterdate:'', period:'', amount:'', idebit:'', debit:'', icredit:''
                         , credit:'', currency:'',  side:'', text:'', month:'', year:'', company:'', typeJournal:''
                         , file_content:'', modelid:''}}
                       addLabel    = "Add Journal"
                       updateLabel = "Edit Journal"
                       title       = "Journal"
                       form        = 'journalForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="10">
          <CrudAccount url ="http://localhost:8080/pets/pac" get="md/106" accUrl="http://localhost:8080/pets/accmd/9"
                       headers = {[ {name:'period', title:'Period'}, {name:'idebit', title:'IDebit'}
                         , {name:'debit', title:'Debit'}, {name:'icredit', title:'Icredit'}
                         , {name:'credit', title:'Credit'}, {name:'balance', title:'Balance'}
                         , {name:'currency', title:'Currency'}]}
                       initialState={{ id:'', account:'', period:'', idebit:'', icredit:'', debit:''
                         , credit:'', currency:'', company:''}}
                       addLabel    = "Add PACB"
                       updateLabel = "Submit"
                       title       = "Balance"
                       form        = 'pacForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="11">
          <CrudAccount url ="http://localhost:8080/pets/ftr" get="md/112" accUrl="http://localhost:8080/pets/accmd/9"
                       ccUrl="http://localhost:8080/pets/ccmd/6"
                       headers = {[{id:'tid', label:'Id', numeric: false, disablePadding: true, minWidth:1, format:(value) => value}
                       , {id:'oid', label:'Oid', numeric:false, disablePadding: true, minWidth:1, format:(value) => value}
                       ,  {id:'costcenter', label:'C.Center', numeric:false, disablePadding: false, minWidth:2}
                       , {id:'account', label:'Acc.', numeric:false, disablePadding: false, minWidth:2}
                       , {id:'transdate', label:'Transdate', numeric:true, disablePadding: false, minWidth:1, format:(value) =>  dateFormat(value, "dd mm yy")}
                       , {id:'enterdate', label:'Enterdate', numeric:true, disablePadding: false, minWidth:1, format:(value) =>  dateFormat(value, "dd mm yy")}
                       , {id:'postingdate', label:'Posted', numeric:true, disablePadding: false, minWidth:2, format:(value) =>  dateFormat(value, "dd mm yy")}
                       , {id:'period', label:'Period', numeric:true, disablePadding: false, minWidth:2, format:(value) => value}
                       , {id:'posted', label:'Validated', numeric:true, disablePadding: false, minWidth:1, format:(value) => value.toString()}
                       , {id:'text', label:'Text', numeric:false, disablePadding: false, minWidth:15}
                       , {id:'typeJournal', label:'Typ', numeric:true, disablePadding: false, minWidth:1, format:(value) => value}
                       , {id:'modelid', label:'M.Id', numeric:true, disablePadding: false, minWidth:1, format:(value) => value}
                       , {id:'company', label:'Co.', numeric:false, disablePadding: false, minWidth:2}
                       , {id:'file_content', label:'F.Content', numeric:true, disablePadding: true, minWidth:2, format:(value) => value}
                       , {id:'lines', title:[{id:'lid', title:'Id'}, {id:'account', title:'Acc.'}, {id:'side', title:'D/C'}
                              , {name:'oaccount', title:'O.Acc.'},{name:'duedate', title:'Duedate'}, {id:'text', title:'Text'}
                              , {name:'amount', title:'Amount'}, {id:'currency', title:'CCy'}
                              , {name:'Actions', title:'Actions'}]}]}
                       initialState={{ tid:-1, oid:0, costcenter:'', account:'', transdate:new Date()
                         , enterdate:new Date().toISOString(), postingdate:new Date().toISOString(), period:getPeriod(new Date()), posted:false
                         , modelid:112, company:'1000', text:'', typeJournal:0, file_content:0, lines:[{lid:-1, transid:0
                         , side:true, account:'', oaccount:'', amount:0, duedate:new Date(), text:'', currency:'EUR', company:'1000'}]}}
                       addLabel    = "Add Financials"
                       updateLabel = "Edit Financials"
                       title       = "Financials"
                       form        = 'financialsForm'>
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
                  Forms
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '2'}
                  onClick={() => { toggle(0, '2'); }}>
                  Masterfiles
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '3'}
                  onClick={() => { toggle(0, '3'); }}>
                  CostCenter
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '4'}
                  onClick={() => { toggle(0, '4'); }}>
                  Account
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '5'}
                  onClick={() => { toggle(0, '5'); }}>
                  Customer
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '6'}
                  onClick={() => {toggle(0, '6'); }}>
                  Vat
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '7'}
                  onClick={() => {toggle(0, '7'); }}>
                  Supplier
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '8'}
                  onClick={() => {toggle(0, '8'); }}>
                  Bank.Stmt.
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '9'}
                  onClick={() => {toggle(0, '9'); }}>
                  Journal
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '10'}
                  onClick={() => { toggle(0, '10'); }}>
                  Balance
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={state.activeTab[0] === '11'}
                  onClick={() => { toggle(0, '11'); }}>
                  Financials
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

