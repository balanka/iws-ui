import React, {useState} from 'react'
import {CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CCard, CCardBody, CTabs} from '@coreui/react'
import {useTranslation} from "react-i18next";
import {CrudAccount} from "../Components/CrudAccount";
import Login from "../../pages/login/Login";
import {currencyFormatDE, dateFormat} from "../../../utils/utils";
import {createGlobalState} from "react-hooks-global-state";

const initialState = {profile:{
        token:'noTOken'
        , company:''
    }}

export const { useGlobalState } = createGlobalState(initialState);
export const Tabs = () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const { t,  } = useTranslation();
    const getCurrentMonth = (date)=>{
        const p=date.getUTCMonth()+1;
        return p<=10?"0".concat(p.toString()):p.toString();
    }
    const date=new Date().toISOString()
    const getPeriod = (date ) => {return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))};
    const pacHeaders =(t) => [ {id:'period', label:t('pac.period'), minWidth:1, numeric:true }
        , { id: 'idebit', label:t('common.idebit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'debit', label:t('common.debit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'icredit', label:t('common.icredit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'credit', label:t('common.credit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'balance', label:t('common.balance'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'currency', label:t('common.currency'), minWidth:1}
    ]
    const JournalHeaders =(t) =>[ {id:'id', label:t('journal.id'), minWidth:2, numeric:true }, {id:'transid', label:t('journal.transid'), minWidth:1, numeric:true }
        , { id: 'oid', label: t('journal.oid'), minWidth:1, numeric:true }, {id: 'account', label: t('journal.account'), minWidth:1}
        , {id: 'oaccount', label:t('journal.oaccount'), minWidth:2}
        , {id: 'transdate', label:t('journal.transdate'), minWidth:5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
        , {id: 'postingdate', label:t('journal.postingdate'), minWidth:5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
        , {id: 'enterdate', label:t('journal.enterdate'), minWidth:5, numeric:true, format:(value) =>  dateFormat(value, "dd mm yy")}
        , {id: 'period', label:t('journal.period'), minWidth:1, numeric:true},
        , { id: 'amount', label: t('journal.amount'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'idebit', label:t('common.idebit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'debit', label: t('common.debit'), minWidth:2,  numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'icredit', label:t('common.icredit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'credit', label:t('common.credit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'side', label:t('journal.side'), numeric:true, format:(value) => String(value), minWidth:1}
        , { id: 'text', label:t('journal.text'), minWidth:15}, { id:'month', label:t('journal.month'), minWidth:1}
        , { id: 'year', label:t('journal.year'), minWidth:1}, { id:'company', label:t('common.company'), minWidth:1 }
        , { id: 'typeJournal', label:t('journal.type'), minWidth:1}, { id: 'file_content', label:t('journal.file'), minWidth:1}
        , { id: 'modelid', label:t('common.modelid'), minWidth:1}]

    const balanceHeaders=(t) =>[ {id:'id', label:t('balancesheet.id'), minWidth:1}
        , {id:'name', title:t('balancesheet.name'), minWidth:8}
        , {id:'account', title:t('balancesheet.account')}
        , { id: 'idebit', title: t('common.idebit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'debit', title: t('common.debit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'icredit', title: t('common.icredit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'credit', title:t('common.credit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'currency', label:t('common.currency'), minWidth:1}
    ]

    const treeHeaders =(t) =>( {h:[{ title:t('account.id'), field: 'id' }
            ,  { title:t('account.name'), field: 'name' }
            ,  { title:t('account.account'), field: 'account' }
            ,  { title:t('common.idebit'), field: 'idebit', type: 'numeric', minWidth:3 }
            ,  { title:t('common.debit'), field: 'debit' , type: 'numeric', minWidth:3}
            ,  { title:t('common.icredit'), field: 'icredit', type: 'numeric', minWidth:3 }
            ,  { title:t('common.credit'), field: 'credit' , type: 'numeric', minWidth:3}
            , { title: 'currency', label:t('common.currency'), minWidth:1}
        ]})
    const modules  = (t) =>[
        {id:0, name:'Login', title:t('login.title'), ctx:"/login", ctx1:"", get:""
            , ctx2:"/", form:'loginForm', state:initCC, state1:initAcc ,state2:'', columns:[]}
        , {id:6, name:'CostCenter', title:t('costcenter.title'), ctx:"/cc", ctx1:"/acc/accmd/9", get:"md/6"
            , ctx2:"/", form:'costCenterForm', state:initCC, state1:initAcc ,state2:'', columns:[]}
        , {id:1, name:"Supplier", title:t('supplier.title'), ctx:"/sup", ctx1:"/acc/accmd/9", ctx2:"/vat",get:"md/1"
            , form:'customerForm' , state:initSup, state1:initAcc ,state2:initVat, columns:[]}
        , {id:3, name:'Customer', title:t('customer.title'), ctx:"/cust", ctx1:"/acc/accmd/9", ctx2:"/vat",get:"md/3"
            , form:'customerForm' , state:initCust, state1:initAcc, state2:initVat, columns:[]}

        , {id:9, name:"Account", title:t('account.title'), ctx:"/acc", ctx1:"/acc/accmd/9", get:"md/9"
            , form:'accountForm', state:initCC, state1:initAcc ,state2:'', columns:[]}
        , {id:11, name:"Bank", title:t('bank.title'), ctx:"/bank", ctx1:"/acc", ctx2:"", get:"md/11"
            , form:'costCenterForm', state:initBank, state1:initAcc ,state2:'', columns:[]}
        , {id:14, name:"Vat", title:t('vat.title'), ctx:"/vat", ctx1:"/acc/accmd/9", ctx2:"", get:"md/14"
            , form:'vatForm', state:initVat, state1:initAcc ,state2:'', columns:[]}
        , {id:18, name:"Bankstatement", title:t('bankstatement.title'), ctx:"/bs", ctx1:"/acc/accmd/9", ctx2:"", get:"md/18"
            , form:'bankStmtForm', state:initBS, state1:initAcc ,state2:'', columns:[]}
        , {id:106, name:"PAC", title:t('pac.title'), ctx:"/pac", ctx1:"/acc", ctx2:"", get:"md/106"
            , form:'pacForm', state:initPac, state1:initAcc, state2:'', columns:pacHeaders(t) }
        , {id:112, name:"Journal", title:t('journal.title'), ctx:"/jou", ctx1:"/acc/accmd/9", ctx2:"", get:"md/112"
            , form:'journalForm', state:initJour, state1:initAcc, state2:'', columns:JournalHeaders(t)  }
        , {id:1120, name:"Financials", title:t('financials.title'), ctx:"/ftr", ctx1:"/acc", ctx2:"/cc", get:"md/112"
            , form:'financialsForm', state:initFrt, state1:initAcc, state2:initCC }

        , {id:1000, name:"Balance", title:t('balancesheet.title'), ctx:"/acc/balance", ctx1:"/acc", ctx2:"", get:"md/112"
            , form:"balancesheetForm", state:initBalanceSheet, state1:initAcc, state2:'', columns:balanceHeaders(t) }
        , {id:1300, name:"BalanceTree", title:t('common.title'), ctx:"/acc", ctx1:"/acc", ctx2:"", get:"md/106"
            , form:"treeForm", state:initAcc, state1:initAcc, state2:'', columns:treeHeaders(t).h }
    ]
  /*
    const [state,setState] = useState( {activeTab: new Array(1).fill('1')})
    setDefaultLocale('de');

    const toggle = (tabPane, tab) =>{
        const newArray = state.activeTab.slice();
        newArray[tabPane] = tab;
        setState({activeTab: newArray,});
    }
   */

    //setDefaultLocale('de');
    const initAcc = {hits:[{id:'', name: '', description: '', enterdate:date, postingdate:date
            , changedate:date, company:'', modelid:9, account:'-1', isDebit:false, balancesheet:false, currency:''
            , idebit:0.0,icredit:0.0, debit:0.0, credit:0.0 }]}
    const initBank = { hits:[ {id:'', name: '', description: '', enterdate:date, postingdate:date
            , changedate:date, modelid:11, account:'-1', company:''}]}
    const initCC = { hits:[ {id:'', name: '', description: '', enterdate:new Date().toISOString()
            , postingdate:new Date().toISOString(),changedate:new Date().toISOString()
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

    const getNavLink= ( module) =>{
        return (<>
                <CNavItem>
                    <CNavLink>
                        {module.title}
                    </CNavLink>
                </CNavItem>
            </>
        )}
    const  getTabPane = (module) => {
        return  <>
            <CTabPane>
                <CrudAccount url={SERVER_URL.concat(module.ctx)} get={module.get} accUrl={SERVER_URL.concat(module.ctx1)}
                             ccUrl={module.ctx2}  initialState={module.state} initAcc={module.state1} initCc={module.state2}
                             title={module.title} form={module.form} headers={module.columns}/>
            </CTabPane>
        </>
    }

    const getContent = ( items) => {
        return <>
            <CNav variant="tabs">
                {items.map(item => getNavLink(item))}
            </CNav>
            <CTabContent fade={false}>
                {items.map(item => getTabPane(item))}
            </CTabContent>
        </>
    }

    const TabsComponent = (items) => {
        return (
            <CRow>
                <CCol xs="12" md="12" className="mb-4">
                    <CCard>
                        <CCardBody>
                            <CTabs>
                                {getContent (items)}
                            </CTabs>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }

    return TabsComponent(modules(t));
}
export default Tabs
