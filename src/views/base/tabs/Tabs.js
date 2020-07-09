import React, { useState } from 'react'
import {CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CCard, CCardBody, CTabs
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {useTranslation} from "react-i18next";
import {setDefaultLocale} from "react-datepicker";
import {CrudAccount} from "../Components/CrudAccount";
import {currencyFormatDE, dateFormat} from "../../../utils/utils";
import Login from "../../pages/login/Login";

const Tabs = () => {
  const [active, setActive] = useState(1)
  const { t, i18n } = useTranslation();
  const [state,setState] = useState( {activeTab: new Array(1).fill('1')})
  setDefaultLocale('de');

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

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
  const initJour={hits:[{id:'', transid:'', oid:'', account:'', oaccount:'', transdate:''
    , postingdate:'', enterdate:'', period:'', amount:'', idebit:'', debit:'', icredit:''
    , credit:'', currency:'',  side:'', text:'', month:'', year:'', company:'', typeJournal:''
    , file_content:'', modelid:''}]}

  const initBalanceSheet= {"data":[{
    "data" : {"id" : "9900", "name" : "Bilanz", "isDebit" : true, "balancesheet" : false,
      "idebit" : 0.00, "icredit" : 0.00, "debit" : 254824.95, "credit" : 254824.95, "currency" : "",
      "company" : "1000"},
    "children" : [{"data" : {
        "id" : "9901",
        "name" : "Bilanz Aktiva",
        "description" : "Bilanz Aktiva",
        "modelId" : 19,
        "isDebit" : true,
        "balancesheet" : false,
        "idebit" : 0.00,
        "icredit" : 0.00,
        "debit" : 247689.37,
        "credit" : 0.00,
        "currency" : "",
        "company" : "1000"
      }, "children":[]},
      {"data" : {"id" : "9902", "name" : "Bilanz Passiva", "isDebit" : false,
          "balancesheet" : true, "idebit" : 0.00, "icredit" : 0.00, "debit" : 7135.58,
          "credit" : 254824.95, "currency" : "", "company" : "1000"}, "children" :[]}]}]}
  const initBS={hits:[{ id:'', depositor:'', postingdate:new Date(), valuedate:new Date(), postingtext:'', purpose:''
    , beneficiary:'', accountno:'', bankCode:'', amount:'', currency:'', info:'', company:'', companyIban:''
    , posted:'',modelid:18}]}
  const initFrt={hits:[{ tid:-1, oid:0, costcenter:'', account:'', transdate:new Date()
            , enterdate:new Date().toISOString(), postingdate:new Date().toISOString(), period:getPeriod(new Date())
            , posted:false, modelid:112, company:'1000', text:'', typeJournal:0, file_content:0,lines:[{lid:-1, transid:0
            , side:true, account:'', oaccount:'', amount:0, duedate:new Date(), text:'', currency:'EUR', company:'1000'
            }]}]}

    return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    {t('login.title')}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    {t('costcenter.title')}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    {t('account.title')}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    {t('vat.title')}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    {t('customer.title')}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    {t('supplier.title')}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    {t('bank.title')}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    {t('balancesheet.title')}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    {t('journal.title')}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    {t('bankstatement.title')}
                  </CNavLink>
                </CNavItem>
                  <CNavItem>
                      <CNavLink>
                          {t('financials.title')}
                      </CNavLink>
                  </CNavItem>
              </CNav>
              <CTabContent fade={false}>
                <CTabPane>
                <Login/>
               </CTabPane>
                <CTabPane>
                  <CrudAccount url ="http://127.0.0.1:8080/cc" get="md/6" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                               headers = {[{id:'id', label:t('costcenter.id'), minWidth: 5}, {id:'name', label:t('costcenter.name'), minWidth: 10},
                                 {id:'description', label:t('costcenter.description'), minWidth: 15},
                                 , {id:'enterdate', label:t('costcenter.enterdate'), minWidth: 5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                                 , {id:'postingdate', label:t('costcenter.postingdate'), minWidth: 5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")},
                                 ,  {id:'changedate', label:t('costcenter.changedate'), minWidth: 5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                                 ,  {id:'modelid', label:'MId', minWidth: 2, format: (value) => value.toLocaleString('de-DE')},
                                 ,  {id:'account', label:t('costcenter.account'), minWidth: 5}
                                 , {id:'company', label:t('common.company'), minWidth: 2, format: (value) => value.toLocaleString('de-DE')}]}

                               initialState={initCC}
                               initAcc={initAcc}
                               addLabel    = "Add Cost center"
                               updateLabel ="Edit Cost center"
                               title       = {t('costcenter.title')}
                               form        = 'costCenterForm'>
                  </CrudAccount>
                </CTabPane>
                <CTabPane>
                  <CrudAccount url ="http://127.0.0.1:8080/acc" get="md/9" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                               headers = {[ {id:'id', label:t('account.id'), minWidth:1}, {id:'name', label:t('account.name'), minWidth:8}
                                 , {id:'description', label:t('account.description'), minWidth:30}
                                 , {id:'modelid', label:'MId.', numeric:true, disablePadding:false, minWidth:1, format:(value) => value}
                                 , {id:'account', label:t('account.account')}, {id:'company', label:t('common.company')}
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
                </CTabPane>
                <CTabPane>
                  <CrudAccount url ="http://127.0.0.1:8080/vat" get="md/14" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                               headers = {[{id:'id', label:t('vat.id')}, {id:'name', label:t('vat.name')}, {id:'description', label:t('vat.description')}
                                 , {id:'percent', label:t('vat.percent')}, {id:'inputVatAccount', label:t('vat.input_account')}, {id:'outputVatAccount', label:t('vat.output-account')}
                                 , {id:'enterdate', label:t('vat.enterdate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                                 , {id:'postingdate', label:t('vat.postingdate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                                 , {id:'changedate', label:t('vat.changedate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                                 , {id:'company', label:t('common.company')}, {id:'modelid', label:'M.Id'}]}
                               initialState={initVat}
                               initAcc={initAcc}
                               addLabel    = "Add Vat"
                               updateLabel = "Edit Vat"
                               title       = {t('vat.title')}
                               form        = 'vatForm'>
                  </CrudAccount>
                </CTabPane>
                <CTabPane>
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
                                 , {id:'modelid', label:'M.Id', minWidth:1, disablePadding: true}, {id:'company', label:t('common.company')
                                   , minWidth:1, disablePadding: true}]}

                               initialState={initVat}
                               initAcc={initAcc}
                               addLabel    = "Add Customer"
                               updateLabel = "Edit Customer"
                               title       = {t('customer.title')}
                               form        = 'customerForm'>
                  </CrudAccount>
                </CTabPane>
                <CTabPane>
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
                                 , {id:'modelid', label:'M.Id', minWidth:1, disablePadding: true}, {id:'company', label:t('common.company')
                                   , minWidth:1, disablePadding: true}]}

                               initialState={initSup}
                               initAcc={initAcc}
                               addLabel    = "Add Customer"
                               updateLabel = "Edit Customer"
                               title       = {t('supplier.title')}
                               form        = 'supplierForm'>
                  </CrudAccount>
                </CTabPane>
                <CTabPane>
                  <CrudAccount url ="http://127.0.0.1:8080/bank" get="md/11" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                               headers = {[{id:'id', label:t('bank.id'), minWidth: 5}, {id:'name', label:t('bank.name'), minWidth: 10},
                                 {id:'description', label:t('bank.description'), minWidth: 15},
                                 , {id:'enterdate', label:t('bank.enterdate'), minWidth: 5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                                 , {id:'postingdate', label:t('bank.postingdate'), minWidth: 5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")},
                                 ,  {id:'changedate', label:t('bank.changedate'), minWidth: 5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                                 ,  {id:'modelid', label:'MId', minWidth: 2, format: (value) => value.toLocaleString('de-DE')}
                                 , {id:'company', label:t('common.company'), minWidth: 2, format: (value) => value.toLocaleString('de-DE')}]}
                               initialState={initbank}
                               initAcc={initAcc}
                               addLabel    = "Add Bank"
                               updateLabel ="Edit Bank"
                               title       = {t('bank.title')}
                               form        = 'costCenterForm'>
                  </CrudAccount>
                </CTabPane>
                <CTabPane >
                  <CrudAccount url ="http://127.0.0.1:8080/acc/balance" get="md/9" accUrl="http://127.0.0.1:8080/acc"
                               headers = {[ {id:'id', label:t('balancesheet.id'), minWidth:1}
                                 , {id:'name', label:t('balancesheet.name'), minWidth:8}
                                 , {id:'account', label:t('balancesheet.account')}
                                 , { id: 'idebit', label: t('balancesheet.idebit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
                                 , { id: 'debit', label: t('balancesheet.debit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
                                 , { id: 'icredit', label: t('balancesheet.icedit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
                                 , { id: 'credit', label:t('balancesheet.credit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}

                               ]}

                               initialState={initBalanceSheet}
                               initAcc={initAcc}
                               addLabel    = "Add Balancesheet"
                               updateLabel = "Edt Balancesheet"
                               title       = {t('balancesheet.title')}
                               form        = 'balancesheetForm'>
                  </CrudAccount>
                </CTabPane>

                <CTabPane>
                  <CrudAccount  url ="http://127.0.0.1:8080/jou" get="md/112" accUrl="http://127.0.0.1:8080/acc"
                                headers = {[ {id:'id', label:t('journal.id'), minWidth:2, numeric:true }, {id:'transid', label:t('journal.transid'), minWidth:1, numeric:true }
                                  , { id: 'oid', label: t('journal.oid'), minWidth:1, numeric:true }, {id: 'account', label: t('journal.account'), minWidth:1}
                                  , {id: 'oaccount', label:t('journal.oaccount'), minWidth:2}
                                  , {id: 'transdate', label:t('journal.transdate'), minWidth:5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                                  , {id: 'postingdate', label:t('journal.postingdate'), minWidth:5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                                  , {id: 'enterdate', label:t('journal.enterdate'), minWidth:5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                                  , {id: 'period', label:t('journal.period'), minWidth:1, numeric:true},
                                  , { id: 'amount', label: t('journal.amount'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
                                  , { id: 'idebit', label:t('journal.idebit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
                                  , { id: 'debit', label: t('journal.debit'), minWidth:2,  numeric:true, format: (value) => currencyFormatDE(Number(value))}
                                  , { id: 'icredit', label:t('journal.icredit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
                                  , { id: 'credit', label:t('journal.credit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
                                  , { id: 'side', label:t('journal.side'), numeric:true, format:(value) => String(value), minWidth:1}
                                  , { id: 'text', label:t('journal.text'), minWidth:15}, { id:'month', label:t('journal.month'), minWidth:1}
                                  , { id: 'year', label:t('journal.year'), minWidth:1}, { id:'company', label:t('common.company'), minWidth:1 }
                                  , { id: 'typeJournal', label:t('journal.type'), minWidth:1}, { id: 'file_content', label:t('journal.file'), minWidth:1}
                                  , { id: 'modelid', label:t('common.modelid'), minWidth:1}]}

                                initialState={initJour}
                                initAcc={initAcc}
                                addLabel    = "Add Journal"
                                updateLabel = "Edit Journal"
                                title       = {t('journal.title')}
                                form        = 'journalForm'>
                  </CrudAccount>
                </CTabPane>
                <CTabPane>
                  <CrudAccount url ="http://127.0.0.1:8080/bs" get="md/18" accUrl="http://127.0.0.1:8080/acc"
                               headers = {[{id:'id', label:t('bankstatement.title'), numeric:true, minWidth:1}, {id:'depositor', label:t('bankstatement.depositor'), minWidth:1}
                                 , {id:'postingdate', label:t('bankstatement.postingdate'), minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                                 , {id:'valuedate', label:t('bankstatement.valuedate') , minWidth:1, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
                                 , {id:'postingtext', label:t('bankstatement.postingtext'), minWidth:10}, {id:'purpose', label:t('bankstatement.purpose'), minWidth:180}
                                 , {id:'beneficiary', label:t('bankstatement.beneficiary'), minWidth:2}, {id:'accountno', label:t('bankstatement.accountno'), minWidth:2}
                                 , {id:'bankCode', label:t('bankstatement.bankCode'), minWidth:1}, {id:'amount', label:t('bankstatement.amount'), numeric:true
                                   , format:(value) => currencyFormatDE(Number(value)), minWidth:2}
                                 , {id:'currency', label:t('common.currency'), minWidth:1}, {id:'info', label:t('bankstatement.info'), minWidth:30}
                                 , {id:'company', label:t('common.company')}, {id:'companyIban', label:t('bankstatement.companyIban'), minWidth:2}
                                 , {id:'posted', label:t('bankstatement.posted'), numeric:true, format:(value) => String(value), minWidth:1}]}
                               initialState={initBS}
                               initAcc={initAcc}
                               addLabel    = "Add Bank statement"
                               updateLabel = "Edit Bank statement"
                               title       = {t('bankstatement.title')}
                               form        = 'bankStmtForm'>
                  </CrudAccount>
                </CTabPane>
                <CTabPane>
                  <CrudAccount url ="http://127.0.0.1:8080/ftr" get="md/112" accUrl="http://127.0.0.1:8080/acc"
                               ccUrl="http://127.0.0.1:8080/cc"
                               headers = {[{id:'tid', label:t('financials.id'), numeric: false, disablePadding: true, minWidth:1, format:(value) => value}
                                   , {id:'oid', label:t('financials.oid'), numeric:false, disablePadding: true, minWidth:1, format:(value) => value}
                                   ,  {id:'costcenter', label:t('financials.costcenter'), numeric:false, disablePadding: false, minWidth:2}
                                   , {id:'account', label:t('financials.account'), numeric:false, disablePadding: false, minWidth:2}
                                   , {id:'transdate', label:t('financials.transdate'), numeric:true, disablePadding: false, minWidth:1, format:(value) =>  dateFormat(value, "dd mm yy")}
                                   , {id:'enterdate', label:t('financials.enterdate'), numeric:true, disablePadding: false, minWidth:1, format:(value) =>  dateFormat(value, "dd mm yy")}
                                   , {id:'postingdate', label:t('financials.postingdate'), numeric:true, disablePadding: false, minWidth:2, format:(value) =>  dateFormat(value, "dd mm yy")}
                                   , {id:'period', label:t('financials.period'), numeric:true, disablePadding: false, minWidth:2, format:(value) => value}
                                   , {id:'posted', label:t('financials.posted'), numeric:true, disablePadding: false, minWidth:1, format:(value) => String(value)}
                                   , {id:'total', label:t('common.total'), numeric:true, disablePadding: false, minWidth:1, format:(value) => currencyFormatDE(Number(value))}
                                   , {id:'text', label:t('financials.text'), numeric:false, disablePadding: false, minWidth:15}
                                   , {id:'typeJournal', label:t('financials.type'), numeric:true, disablePadding: false, minWidth:1, format:(value) => value}
                                   , {id:'modelid', label:t('common.modelid'), numeric:true, disablePadding: false, minWidth:1, format:(value) => value}
                                   , {id:'company', label:t('common.company'), numeric:false, disablePadding: false, minWidth:2}
                                   , {id:'file_content', label:'F.Content', numeric:true, disablePadding: true, minWidth:2, format:(value) => value}
                                   , {id:'lines', title:[{id:'lid', title:t('financials.line.id')}
                                           , {id:'account', title:t('financials.line.account')}, {id:'side', title:t('financials.line.side')}
                                           , {name:'oaccount', title:t('financials.line.oaccount')}
                                           ,{name:'duedate', title:t('financials.line.duedate')}, {id:'text', title:t('financials.line.text')}
                                           , {name:'amount', title:t('financials.line.amount')}, {id:'currency', title:t('common.currency')}
                                           , {name:'Actions', title:'Actions'}]}]}
                               initialState={initFrt}
                               initAcc={initAcc}
                               initCc={initCC}
                               addLabel    = "Add Financials"
                               updateLabel = "Edit Financials"
                               title       =  {t('financials.title')}
                               lineTitle   = {t('financials.line.title')}
                               form        = 'financialsForm'>
                  </CrudAccount>
              </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tabs
