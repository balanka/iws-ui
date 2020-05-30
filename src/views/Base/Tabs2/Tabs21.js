import React, {Component} from 'react';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import de from 'date-fns/locale/de';
import {CrudGenericContext} from '../Components/CrudGenericContext';
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
const Forms2 = React.lazy(() => import('../Forms2/Forms2'));
const Tables2 = React.lazy(() => import('../Tables2/Tables2'));
const CrudAccount = React.lazy(() => import('../Components/CrudAccount'));

class Tabs21 extends Component {

  constructor(props) {
    super(props);
    setDefaultLocale('de');
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(1).fill('1'),
    };
  }
  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  iwsMap()  {return new Map()};

  tabPane() {
    return (
      <CrudGenericContext>
        <TabPane tabId="1">
          <Forms2/>
        </TabPane>
        <TabPane tabId="2">
          <Tables2/>
        </TabPane>
        <TabPane tabId="3" >
          <CrudAccount  url ="http://localhost:8080/pets/mf" accUrl="http://localhost:8080/pets/accmd/9"
                       get="md/0"
                       headers      = {[{name:'id', title:'Id'}, {name:'name', title:'Name'}, {name:'description', title:'Description'}
                       , {name:'modelid', title:'M.Id'}, {name:'parent', title:'Group'}, {name:'Actions', title:'Actions'}]}
                       initialState = {{ id:{value:''}, name: '', description: '', modelid:0, parent:'-1'}}
                       addLabel     = "Add Masterfile"
                       updateLabel  = "Edit Masterfile"
                       title        = "Masterfiles"
                       form         = 'masterfileForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="4">
          <CrudAccount url ="http://localhost:8080/pets/cc" get="md/6" accUrl="http://localhost:8080/pets/accmd/9"
                       headers = {[{name:'id', title:'Id'}, {name:'name', title:'Name'}, {name:'description', title:'Description'}
                       , {name:'enterdate', title:'Created'}, {name:'postingdate', title:'Posted'}, {name:'changedate', title:'Modified'}
                       ,  {name:'modelid', title:'MId'}, {name:'account', title:'Account'}, {name:'company', title:'Co.'}
                       , {name:'Actions', title:'Actions'}]}
                       initialState={{ id:{value:''}, name: '', description: '', enterdate:new Date().getTime(), postingdate:new Date().getTime()
                         , changedate:new Date().getTime(), modelid:6, account:'-1', company:''}}
                       addLabel    = "Add Cost center"
                       updateLabel ="Edit Cost center"
                       title       = "Cost center"
                       form        = 'costCenterForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="5">
          <CrudAccount url ="http://localhost:8080/pets/acc" get="md/9" accUrl="http://localhost:8080/pets/accmd/9"
                       headers = {[ {name:'id', title:'Id'}, {name:'name', title:'Name'}, {name:'description', title:'Description'}
                         ,  {name:'modelid', title:'MId'}, {name:'account', title:'Account'}, {name:'company', title:'Co.'}
                         ,  {name:'isdebit', title:'IsDebit'}, {name:'balancesheet', title:'Balancesheet'},
                         , {name:'enterdate', title:'Created'}, {name:'postingdate', title:'Posted'}, {name:'changedate', title:'Modified'}
                         , {name:'Actions', title:'Actions'}]}
                       initialState={{ id:{value:''}, name: '', description: '', enterdate:new Date().getTime(), postingdate:new Date().getTime()
                         , changedate:new Date().getTime(), company:'', modelid:9, account:'-1', isDebit:false, balancesheet:false}}
                       addLabel    = "Add Account"
                       updateLabel = "Edit Account"
                       title       = "Account"
                       form        = 'accountForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="6">
          <CrudAccount url ="http://localhost:8080/pets/cust" get="md/3" accUrl="http://localhost:8080/pets/accmd/9"
                       headers = {[{name:'id', title:'Id'}, {name:'name', title:'Name'}, {name:'description', title:'Description'}
                       , {name:'street', title:'Street'}, {name:'city', title:'City'}, {name:'state', title:'State'}
                       , {name:'zip', title:'Zip'}, {name:'country', title:'Country'}, {name:'phone', title:'Phone'}
                       , {name:'email', title:'Email'}, {name:'account', title:'Acc.'}, {name:'oaccount', title:'O.Acc.'}
                       , {name:'iban', title:'IBAN'}, {name:'vatCode', title:'Vat'}, {name:'enterdate', title:'Created'}
                       , {name:'postingdate', title:'Posted'}, {name:'changedate', title:'Modified'}
                       , {name:'modelid', title:'M.Id'}, {name:'company', title:'Co.'}, {name:'Actions', title:'Actions'}]}
                       initialState={{ id:{value:''}, name:'', description:'', street:'', city:'', state:'', zip:''
                         , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
                         , enterdate:new Date().getTime(), postingdate:new Date().getTime()
                         , changedate:new Date().getTime(), company:'', modelid:3}}

                       addLabel    = "Add Customer"
                       updateLabel = "Edit Customer"
                       title       = "Customer"
                       form        = 'customerForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="7">
          <CrudAccount url ="http://localhost:8080/pets/vat" get="md/14" accUrl="http://localhost:8080/pets/accmd/9"
                       headers = {[{name:'id', title:'Id'}, {name:'name', title:'Name'}, {name:'description', title:'Description'}
                       , {name:'percent', title:'Percent'}, {name:'inputVatAccount', title:'In.VatAcc.'}, {name:'outputVatAccount', title:'Out.VatAcc'}
                       , {name:'enterdate', title:'Created'}, {name:'postingdate', title:'Posted'}, {name:'changedate', title:'Modified'}
                       , {name:'company', title:'Co.'}, {name:'modelid', title:'M.Id'}, {name:'Actions', title:'Actions'}]}
                       initialState={{ id:{value:''}, name:'', description:'', percent:'', inputVatAccount:'', outputVatAccount:''
                         , enterdate:new Date().getTime(), postingdate:new Date().getTime(), changedate:new Date().getTime()
                         , company:'', modelid:14}}
                       addLabel    = "Add Vat"
                       updateLabel = "Edit Vat"
                       title       = "Vat"
                       form        = 'vatForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="8">
          <CrudAccount url ="http://localhost:8080/pets/sup" get="md/1" accUrl="http://localhost:8080/pets/accmd/9"
                       headers = {[{name:'id', title:'Id'}, {name:'name', title:'Name'}, {name:'description', title:'Description'}
                         , {name:'street', title:'Street'}, {name:'city', title:'City'}, {name:'state', title:'State'}
                         , {name:'zip', title:'Zip'}, {name:'country', title:'Country'}, {name:'phone', title:'Phone'}
                         , {name:'email', title:'Email'}, {name:'account', title:'Acc.'}, {name:'oaccount', title:'O.Acc.'}
                         , {name:'iban', title:'IBAN'}, {name:'vatCode', title:'Vat'}, {name:'enterdate', title:'Created'}
                         , {name:'postingdate', title:'Posted'}, {name:'changedate', title:'Modified'}
                         , {name:'modelid', title:'M.Id'}, {name:'company', title:'Co.'}, {name:'Actions', title:'Actions'}]}
                       initialState={{ id:{value:''}, name:'', description:'', street:'', city:'', state:'', zip:''
                         , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
                         , enterdate:new Date().getTime(), postingdate:new Date().getTime()
                         , changedate:new Date().getTime(), company:'', modelid:1}}

                       addLabel    = "Add Supplier"
                       updateLabel = "Edit Supplier"
                       title       = "Supplier"
                       form        = 'supplierForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="9">
          <CrudAccount url ="http://localhost:8080/pets/bs" get="md/18" accUrl="http://localhost:8080/pets/bsmd/18"
                       headers = {[{name:'id', title:'Id'}, {name:'depositor', title:'Depositor'}, {name:'postingdate', title:'Posted'}
                       , {name:'valuedate', title:'Valuedate'}, {name:'text', title:'Text'}, {name:'purpose', title:'Purpose'},
                       , {name:'beneficiary', title:'Benef.'}, {name:'accountno', title:'Acc.No'}, {name:'bankCode', title:'Bank'}
                       , {name:'amount', title:'Amount.'}, {name:'currency', title:'CCy.'}, {name:'info', title:'Info'}
                       , {name:'comapny', title:'Co.'}, {name:'companyIban', title:'Co.IBAN.'}, {name:'posted', title:'Posted'}
                       , {name:'modelid', title:'M.Id'}, {name:'Actions', title:'Actions'}]}
                       initialState={{ id:'', depositor:'', postingdate:new Date(), valuedate:new Date(), postingtext:'', purpose:''
                         , beneficiary:'', accountno:'', bankCode:'', amount:'', currency:'', info:'', company:'', companyIban:''
                         , posted:'',modelid:18}}
                       addLabel    = "Add Bank statement"
                       updateLabel = "Edit Bank statement"
                       title       = "Bank statement"
                       form        = 'bankStmtForm'>
          </CrudAccount>
        </TabPane>
        <TabPane tabId="10">
          <CrudAccount  url ="http://localhost:8080/pets/jou" get="md/112" accUrl="http://localhost:8080/pets/accmd/9"
                       headers = {[{name:'id', title:'Id'}, {name:'transid', title:'Transid'},  {name:'oid', title:'Oid'}
                       , {name:'account', title:'Acc.'}, {name:'oaccount', title:'O.Acc.'},  {name:'transdate', title:'Transdate'}
                       , {name:'postingdate', title:'Posted'}, {name:'enterdate', title:'Created'},  {name:'period', title:'Period'}
                       , {name:'amount', title:'Amount'}, {name:'idebit', title:'IDebit'}, {name:'debit', title:'Debit'}
                       , {name:'icredit', title:'ICredit'},  {name:'icredit', title:'Credit'}, {name:'currency', title:'CCy'}
                       , {name:'side', title:'D/C'},  {name:'text', title:'Text'}, {name:'month', title:'Mth.'}
                       , {name:'year', title:'Year'},  {name:'company', title:'Co.'}, {name:'typeJournal', title:'Typ.'}
                       , {name:'file_content', title:'F.Content'},  {name:'modelid', title:'M.Id'}]}

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
        <TabPane tabId="11">
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
        <TabPane tabId="12">
          <CrudAccount url ="http://localhost:8080/pets/ftr" get="md/112" accUrl="http://localhost:8080/pets/accmd/9"
                       ccUrl="http://localhost:8080/pets/ccmd/6"
                       headers = {[{name:'id', title:'Id'}, {name:'oid', title:'Oid'}, {name:'costcenter', title:'C.Center'}
                       , {name:'account', title:'Acc.'}, {name:'transdate', title:'Transdate'}, {name:'enterdate', title:'Enterdate'}
                       , {name:'postingdate', title:'Posted on.'}, {name:'period', title:'Period'}, {name:'posted', title:'Posted'}
                       , {name:'text', title:'Text'}, {name:'typeJournal', title:'Typ'}, {name:'modelid', title:'M.Id'}
                       , {name:'company', title:'Co.'}, {name:'file_content', title:'F.Content'}, {name:'Actions', title:'Actions'}
                       , {name:'lines', title:[{name:'lid', title:'Id'}, {name:'account', title:'Acc.'}, {name:'side', title:'D/C'}
                              , {name:'oaccount', title:'O.Acc.'},{name:'duedate', title:'Duedate'}, {name:'text', title:'Text'}
                              , {name:'amount', title:'Amount'}, {name:'currency', title:'CCy'}
                              , {name:'Actions', title:'Actions'}]}]}
                       initialState={{ id:'', oid:'', costcenter:'', account:'', transdate:new Date().getTime()
                         , enterdate:new Date().getTime(), postingdate:new Date().getTime(), period:'', posted:false
                         , modelid:112, company:'1000', text:'', typeJournal:0, file_content:0}}
                       addLabel    = "Add Financials"
                       updateLabel = "Edit Financials"
                       title       = "Financials"
                       form        = 'financialsForm'>
          </CrudAccount>
        </TabPane>
      </CrudGenericContext>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}>
                  Forms
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle(0, '2'); }}>
                  Tables
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => { this.toggle(0, '3'); }}>
                  Masterfiles
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '4'}
                  onClick={() => { this.toggle(0, '4'); }}>
                  CostCenter
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '5'}
                  onClick={() => { this.toggle(0, '5'); }}>
                  Account
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '6'}
                  onClick={() => { this.toggle(0, '6'); }}>
                  Customer
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '7'}
                  onClick={() => { this.toggle(0, '7'); }}>
                  Vat
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '8'}
                  onClick={() => { this.toggle(0, '8'); }}>
                  Supplier
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '9'}
                  onClick={() => { this.toggle(0, '9'); }}>
                  Bank.Stmt.
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '10'}
                  onClick={() => { this.toggle(0, '10'); }}>
                  Journal
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '11'}
                  onClick={() => { this.toggle(0, '11'); }}>
                  Balance
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '12'}
                  onClick={() => { this.toggle(0, '12'); }}>
                  Financials
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Tabs21;
