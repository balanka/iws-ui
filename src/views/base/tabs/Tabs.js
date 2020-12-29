import React, { useState } from 'react'
import {CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CCard, CCardBody, CTabs} from '@coreui/react'
import {useTranslation} from "react-i18next";
import {setDefaultLocale} from "react-datepicker";
import {CrudAccount} from "../Components/CrudAccount";
import {currencyFormatDE, dateFormat} from "../../../utils/utils";
import Login from "../../pages/login/Login";


export const Tabs = () => {
   const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    console.log('process.env', process.env);
   console.log('SERVER_URL', SERVER_URL);
  const [active, setActive] = useState(1)
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
  const date=new Date().toISOString()
  const getPeriod = (date ) => {return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))};
  const initAcc = {hits:[{id:'', name: '', description: '', enterdate:date, postingdate:date
      , changedate:date, company:'', modelid:9, account:'-1', isDebit:false, balancesheet:false, currency:''
      , idebit:0.0,icredit:0.0, debit:0.0, credit:0.0 }]}
  const initBank = { hits:[ {id:'', name: '', description: '', enterdate:date, postingdate:date
      , changedate:date, modelid:11, account:'-1', company:''}]}
  const initCC = { hits:[ {id:'', name: '', description: '', enterdate:new Date().toISOString()
          , postingdate:new Date().toISOString(), changedate:new Date().toISOString()
          , modelid:6, account:'-1', company:''}]}

  const initVat={ hits:[{ id:'', name:'', description:'', percent:'', inputVatAccount:'', outputVatAccount:''
      , enterdate:date, postingdate:date, changedate:date, company:'', modelid:14}]}

  const initCust={hits:[{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
      , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
      , enterdate:date, postingdate:date, changedate:date, company:'', modelid:3}]}

  const initSup={hits:[{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
      , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
      , enterdate:date, postingdate:date, changedate:date, company:'', modelid:1}]}

  const initJour={hits:[{ id:'', transid:'', oid:'', account:'', oaccount:'', transdate:''
          , postingdate:'', enterdate:'', period:'', amount:'', idebit:'', debit:'', icredit:''
          , credit:'', currency:'',  side:'', text:'', month:'', year:'', company:'', typeJournal:''
          , file_content:'', modelid:''
          , query:{ account:'', account2:'', fromPeriod:'', toPeriod:''}}]}

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
const initBS={hits:[{ bid:'', depositor:'', postingdate:date, valuedate:date, postingtext:'', purpose:''
    , beneficiary:'', accountno:'', bankCode:'', amount:'', currency:'', info:'', company:'', companyIban:''
    , posted:'',modelid:18}]}
const initFrt={hits:[{ tid:-1, oid:0, costcenter:'', account:'', transdate:date
            , enterdate:date, postingdate:date, period:getPeriod(new Date())
            , posted:false, modelid:112, company:'1000', text:'', typeJournal:0, file_content:0,lines:[{lid:-1, transid:0
            , side:true, account:'', oaccount:'', amount:0, duedate:date, text:'', currency:'EUR', company:'1000'
            }]}]}
const initPac={hits:[{ period:'', idebit:0.0, icredit:0.0, debit:0.0, credit:0.0, currency:'', company:''
            , query:{ account:'', account2:'', fromPeriod:'', toPeriod:''}}]}

const treeHeaders = {h:[{ title:t('account.id'), field: 'id' }
            ,  { title:t('account.name'), field: 'name' }
            ,  { title:t('account.account'), field: 'account' }
            ,  { title:t('common.idebit'), field: 'idebit', type: 'numeric', minWidth:3 }
            ,  { title:t('common.debit'), field: 'debit' , type: 'numeric', minWidth:3}
            ,  { title:t('common.icredit'), field: 'icredit', type: 'numeric', minWidth:3 }
            ,  { title:t('common.credit'), field: 'credit' , type: 'numeric', minWidth:3}
        ]}
const balancesheetHeaders = [
    {id:'id', label:t('balancesheet.id'), minWidth:1}
    , {id:'name', label:t('balancesheet.name'), minWidth:8}
   , {id:'account', label:t('balancesheet.account')}
   , { id: 'idebit', label: t('common.idebit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
   , { id: 'debit', label: t('common.debit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
   , { id: 'icredit', label: t('common.icedit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
   , { id: 'credit', label:t('common.credit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
  ]
const pacHeaders=[ {id:'period', label:t('pac.period'), minWidth:1, numeric:true }
    , { id: 'idebit', label:t('pac.idebit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
    , { id: 'debit', label:t('pac.debit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
    , { id: 'icredit', label:t('pac.icredit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
    , { id: 'credit', label:t('pac.credit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
    , { id: 'balance', label:t('pac.balance'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
    , { id: 'currency', label:t('common.currency'), minWidth:1}
   ]
const journalHeaders=[ {id:'id', label:t('journal.id'), minWidth:2, numeric:true }, {id:'transid', label:t('journal.transid'), minWidth:1, numeric:true }
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
    , { id: 'modelid', label:t('common.modelid'), minWidth:1}
    ]
const modules =[
        , {id:1, name:"Supplier", ctx:"/sup", ctx1:"/acc/accmd/9", ctx2:"/vat",get:"md/1", form:"customerForm"
            , state:initSup, state1:initAcc ,state2:initVat}
        , {id:3, name:"Customer", ctx:"/cust", ctx1:"/acc/accmd/9", ctx2:"/vat",get:"md/4", form:"customerForm"
        , state:initCust, state1:initAcc ,state2:initVat}
        , {id:6, name:"CostCenter", ctx:"/cc", ctx1:"/acc/accmd/9", get:"md/6", form:"costCenterForm"
        , state:initCC, state1:initAcc ,state2:''}
        , {id:9, name:"Account", ctx:"/acc", ctx1:"/acc/accmd/9", get:"md/9", form:"accountForm"
            , state:initCC, state1:initAcc ,state2:''}
        , {id:11, name:"Bank", ctx:"/bank", ctx1:"/acc", ctx2:"", get:"md/11", form:"costCenterForm"
            , state:initBank, state1:initAcc ,state2:''}
        , {id:14, name:"Vat", ctx:"/vat", ctx1:"/acc/accmd/9", ctx2:"", get:"md/14", form:"vatForm"
            , state:initVat, state1:initAcc ,state2:''}
        , {id:18, name:"Bankstatement", ctx:"/bs", ctx1:"/acc/accmd/9", ctx2:"", get:"md/18", form:"bankStmtForm"
            , state:initBS, state1:initAcc ,state2:''}
        , {id:112, name:"Journal", ctx:"/jou", ctx1:"/acc/accmd/9", ctx2:"", get:"md/112", form:"journalForm"
            , state:initJour, state1:initAcc,state2:''   }

    ]

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
                <CNavItem>
                      <CNavLink>
                          {t('pac.title')}
                      </CNavLink>
                  </CNavItem>
                <CNavItem>
                      <CNavLink>
                          {t('common.title')}
                      </CNavLink>
                  </CNavItem>
              </CNav>
              <CTabContent fade={false}>
                <CTabPane>
                <Login/>
               </CTabPane>
                <CTabPane>
                  <CrudAccount url ={SERVER_URL.concat('/cc')} get="md/6" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                      initialState={initCC} initAcc={initAcc} title = {t('costcenter.title')} form = 'costCenterForm'/>
                </CTabPane>
                <CTabPane>
                  <CrudAccount url ={SERVER_URL.concat('/acc')} get="md/9" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                          initialState={initAcc} initAcc={initAcc} title = {t('account.title')} form = 'accountForm'/>
                </CTabPane>
                <CTabPane>
                  <CrudAccount url ={SERVER_URL.concat('/vat')} get="md/14" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                               initialState={initVat} initAcc={initAcc} title = {t('vat.title')} form = 'vatForm'/>
                </CTabPane>
                <CTabPane>
                  <CrudAccount url ={SERVER_URL.concat('/cust')} get="md/3" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                               ccUrl="http://127.0.0.1:8080/vat" initialState={initCust} initAcc={initAcc}
                               initCc={initVat}  title = {t('customer.title')} form = 'customerForm'/>
                </CTabPane>
                <CTabPane>
                  <CrudAccount url ={SERVER_URL.concat('/sup')} get="md/1" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                               ccUrl="http://127.0.0.1:8080/vat" initialState={initSup} initAcc={initAcc}
                               initCc={initVat} title = {t('supplier.title')} form = 'supplierForm'/>
                </CTabPane>
                <CTabPane>
                  <CrudAccount url ={SERVER_URL.concat('/bank')} get="md/11" accUrl="http://127.0.0.1:8080/acc/accmd/9"
                               initialState={initBank}
                               initAcc={initAcc}
                               title       = {t('bank.title')}
                               form        = 'costCenterForm'/>
                </CTabPane>
                <CTabPane >
                  <CrudAccount url ="http://127.0.0.1:8080/acc/balance" get="md/9" accUrl="http://127.0.0.1:8080/acc"
                               headers ={balancesheetHeaders} initialState={initBalanceSheet}
                               initAcc={initAcc} title = {t('balancesheet.title')} form ='balancesheetForm'/>
                </CTabPane>
                <CTabPane>
                  <CrudAccount  url ="http://127.0.0.1:8080/jou" get="md/112" accUrl="http://127.0.0.1:8080/acc"
                                headers = {journalHeaders} initialState={initJour} initAcc={initAcc}
                                title = {t('journal.title')} form = 'journalForm'/>
                </CTabPane>
                <CTabPane>
                  <CrudAccount url ="http://127.0.0.1:8080/bs" get="md/18" accUrl="http://127.0.0.1:8080/acc"
                               initialState={initBS} initAcc={initAcc} title = {t('bankstatement.title')}
                                form = 'bankStmtForm'/>
                </CTabPane>
                <CTabPane>
                  <CrudAccount url ="http://127.0.0.1:8080/ftr" get="md/112" accUrl="http://127.0.0.1:8080/acc"
                               ccUrl="http://127.0.0.1:8080/cc"
                               initialState={initFrt} initAcc={initAcc} initCc={initCC} title =  {t('financials.title')}
                                lineTitle = {t('financials.line.title')} form = 'financialsForm'/>
              </CTabPane>
                  <CTabPane>
                      <CrudAccount url ="http://127.0.0.1:8080/pac" get="md/106" accUrl="http://127.0.0.1:8080/acc"
                                   headers = {pacHeaders} initialState={initPac} initAcc={initAcc}
                                   title = {t('pac.title')} form = 'pacForm'/>
                  </CTabPane>
                  <CTabPane>
                      <CrudAccount url ="http://127.0.0.1:8080/acc" get="md/106" accUrl="http://127.0.0.1:8080/acc"
                                   headers = {treeHeaders.h} initialState={initAcc}
                                   initAcc={initAcc} title = {t('common.title')} form = 'treeForm'/>
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
