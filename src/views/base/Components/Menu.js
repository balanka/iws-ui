import {formEnum} from "../../../utils/FORMS";
import {ColumnsACC, columnsPACB, ColumnJournal, ColumnsBalancesheet, ColumnsVAT, ColumnsBS, ColumnsM, columnsJ
    , ColumnsComp, ColumnsCUST, ColumnsUSER  } from "../../Tables2/LineFinancialsProps";
import MasterfileForm from "./MasterfileForm";
import React from "react";
import BankStatementForm from "./BankStatementForm";
import Login from './Login'
import BasicTreeTable from "./BasicTreeTable";
import JForm  from "./JForm";
import FinancialsForm from "./FinancialsForm";
import {createGlobalState} from "react-hooks-global-state";
export const getCurrentMonth = (date)=>{
        const p=date.getUTCMonth()+1;
        return p<=10?"0".concat(p.toString()):p.toString();
    }
export const date= new Date().toISOString()
export const getPeriod = (date ) => {return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))};
const LOGIN=(t)=> ( {id:"0", name:'Login', title:t('login.title'), ctx:"/users/login", ctx1:"/md", get:""
    , ctx2:"/", ctx3:'', form:<Login/>, state:loginInit, state1:'' ,state2:'',  state3:'', columns:[]});
const SUPPLIER =(t)=>({id:"1", name:"Supplier", title:t('supplier.title'), ctx:"/sup", ctx1:"/acc/accmd/9", ctx2:"/vat",  ctx3:"/bank", get:"md/1"
    , form:<MasterfileForm/> , state:initSup, state1:initAcc ,state2:initVat, state3:initBank, modelid:formEnum.CUSTOMER, columns:ColumnsCUST(initAcc, t)})
const CUSTOMER = (t)=>({id:"3", name:'Customer', title:t('customer.title'), ctx:"/cust", ctx1:"/acc/accmd/9", ctx2:"/vat", ctx3:"/bank", get:"md/3"
    , form:<MasterfileForm/> , state:initCust, state1:initAcc, state2:initVat, state3:initBank, modelid:formEnum.CUSTOMER, columns:ColumnsCUST(initAcc,t)})
const COSTCENTER =(t)=>({id:"6", name:'CostCenter', title:t('costcenter.title'), ctx:"/cc", ctx1:"/acc/accmd/9", ctx2:'/', ctx3:'', get:"md/6"
    , form:<MasterfileForm/>, state:initCC, state1:initAcc ,state2:'', state3:'', modelid:formEnum.COSTCENTER, columns:ColumnsM(initAcc, t)})
const ACCOUNT =(t)=>({id:"9", name:"Account", title:t('account.title'), ctx:"/acc", ctx1:"/acc/accmd/9", ctx2:'', ctx3:'', get:"md/9"
    , form:<MasterfileForm/>, state:initCC, state1:initAcc ,state2:'', state3:'', modelid:formEnum.ACCOUNT, columns:ColumnsACC(initAcc, t)})
const COMPANY = (t)=>({id:"10", name:"Company", title:t('company.title'), ctx:"/comp", ctx1:"/acc/accmd/9", ctx2:"/vat", ctx3:"/bank", get:"md/10"
    , form:<MasterfileForm/>, state:initComp, state1:initAcc ,state2:initVat, state3:initBank, modelid:formEnum.COMPANY, columns:ColumnsComp(initAcc,t)})
const BANK =(t)=>({id:"11", name:"Bank", title:t('bank.title'), ctx:"/bank", ctx1:"", ctx2:"", ctx3:'', get:"md/11"
    , form:<MasterfileForm/>, state:initBank, state1:initAcc ,state2:'', state3:'', modelid:formEnum.BANK, columns:ColumnsM(initAcc, t)})
const VAT =(t)=>({id:"14", name:"Vat", title:t('vat.title'), ctx:"/vat", ctx1:"/acc/accmd/9", ctx2:"", ctx3:'', get:"md/14"
    , form:<MasterfileForm/>, state:initVat, state1:initAcc ,state2:'', state3:'', modelid:formEnum.VAT, columns:ColumnsVAT(initAcc, t)})
const BS =(t)=>({id:"18", name:"Bankstatement", title:t('bankstatement.title'), ctx:"/bs", ctx1:"/acc/accmd/9", ctx2:"", ctx3:'', get:"md/18"
    , form:<BankStatementForm />, state:initBS, state1:'' ,state2:'', state3:'', modelid:formEnum.BANKSTATEMENT,
    columns:ColumnsBS(t)})
const PACB = (t)=>({id:"106", name:"PAC", title:t('pac.title'), ctx:"/pac", ctx1:"/acc", ctx2:"", ctx3:'', get:"md/106"
    , form:<JForm/>, state:initPac, state1:initAcc, state2:'', state3:'', modelid:formEnum.PACB, columns:columnsPACB(t) })
const USER =(t)=>({id:"111", name:"User", title:t('user.title'), ctx:"/users", ctx1:'', ctx2:"", ctx3:'', get:"md/111"
    , form:<MasterfileForm/>, state:initUser, state1:'', state2:'', state3:'', modelid:formEnum.USER, columns:ColumnsUSER(t)  })
const JOURNAL = (t)=>({id:"112", name:"Journal", title:t('journal.title'), ctx:"/jou", ctx1:"/acc", ctx2:"", ctx3:'', get:"md/112"
    , form:<JForm/>, state:initJour, state1:initAcc, state2:'', state3:'', modelid:formEnum.JOURNAL, columns:ColumnJournal(t)  });
const FINANCIALS= (t)=>({id:"1120", name:"Financials", title:t('financials.title'), ctx:"/ftr", ctx1:"/acc"
    , ctx2:"/cc", ctx3:'', get:"md/112"
    , form:<FinancialsForm/>, state:initFrt, state1:initAcc, state2:initCC , state3:'', modelid:formEnum.FINANCIALS});

const BALANCESHEET =(t)=>({id:"1300", name:"Balancesheet", title:t('balancesheet.title'), ctx:"/acc/balance"
    , ctx1:"/acc", ctx2:"", ctx3:'', get:"md/112"
    , form:<BasicTreeTable/>, state:initAcc, state1:initAcc, state2:'', state3:'', modelid:formEnum.BALANCESHEET
    , columns:ColumnsBalancesheet(t) });
export const LOGIN_MENU = (t)=> ([LOGIN(t)]);

export const modules  = (t) =>[
        {id:"0", name:'Login', title:t('login.title'), ctx:"/users/login", ctx1:"/md", get:""
            , ctx2:"/", ctx3:'', form:<Login/>, state:initCC, state1:initAcc ,state2:'',  columns:[]}
      , {id:"1", name:"Supplier", title:t('supplier.title'), ctx:"/sup", ctx1:"/acc/accmd/9", ctx2:"/vat",  ctx3:"/bank", get:"md/1"
            , form:<MasterfileForm/> , state:initSup, state1:initAcc ,state2:initVat, modelid:formEnum.CUSTOMER, columns:ColumnsCUST(initAcc, t)}
    , {id:"3", name:'Customer', title:t('customer.title'), ctx:"/cust", ctx1:"/acc/accmd/9", ctx2:"/vat", ctx3:"/bank", get:"md/3"
        , form:<MasterfileForm/> , state:initCust, state1:initAcc, state2:initVat, modelid:formEnum.CUSTOMER, columns:ColumnsCUST(initAcc,t)}
    , {id:"6", name:'CostCenter', title:t('costcenter.title'), ctx:"/cc", ctx1:"/acc/accmd/9", ctx2:'/', ctx3:'', get:"md/6"
        , form:<MasterfileForm/>, state:initCC, state1:initAcc ,state2:'', modelid:formEnum.COSTCENTER, columns:ColumnsM(initAcc, t)}
    , {id:"9", name:"Account", title:t('account.title'), ctx:"/acc", ctx1:"/acc/accmd/9", ctx2:'', ctx3:'', get:"md/9"
        , form:<MasterfileForm/>, state:initCC, state1:initAcc ,state2:'', modelid:formEnum.ACCOUNT, columns:ColumnsACC(initAcc, t)}
    , {id:"10", name:"Company", title:t('company.title'), ctx:"/comp", ctx1:"/acc/accmd/9", ctx2:"/vat", ctx3:"/bank", get:"md/10"
        , form:<MasterfileForm/>, state:initComp, state1:initAcc ,state2:initVat, modelid:formEnum.COMPANY, columns:ColumnsComp(initAcc,t)}
    , {id:"11", name:"Bank", title:t('bank.title'), ctx:"/bank", ctx1:"", ctx2:"", ctx3:'', get:"md/11"
        , form:<MasterfileForm/>, state:initBank, state1:initAcc ,state2:'', modelid:formEnum.BANK, columns:ColumnsM(initAcc, t)}
    , {id:"14", name:"Vat", title:t('vat.title'), ctx:"/vat", ctx1:"/acc/accmd/9", ctx2:"", ctx3:'', get:"md/14"
        , form:<MasterfileForm/>, state:initVat, state1:initAcc ,state2:'', modelid:formEnum.VAT, columns:ColumnsVAT(initAcc, t)}
    , {id:"18", name:"Bankstatement", title:t('bankstatement.title'), ctx:"/bs", ctx1:"/acc/accmd/9", ctx2:"", ctx3:'', get:"md/18"
        , form:<BankStatementForm />, state:initBS, state1:initAcc ,state2:'', modelid:formEnum.BANKSTATEMENT, columns:ColumnsBS(initAcc, t)}
    , {id:"106", name:"PAC", title:t('pac.title'), ctx:"/pac", ctx1:"/acc", ctx2:"", ctx3:'', get:"md/106"
        , form:<JForm/>, state:initPac, state1:initAcc, state2:'', modelid:formEnum.PACB, columns:columnsPACB(t) }
    , {id:"111", name:"User", title:t('user.title'), ctx:"/users", ctx1:'', ctx2:"", ctx3:'', get:"md/111"
        , form:<MasterfileForm/>, state:initUser, state1:'', state2:'', modelid:formEnum.USER, columns:ColumnsUSER(t)  }
    , {id:"112", name:"Journal", title:t('journal.title'), ctx:"/jou", ctx1:"/acc/accmd/9", ctx2:"", ctx3:'', get:"md/112"
     , form:<JForm/>, state:initJour, state1:initAcc, state2:'', modelid:formEnum.JOURNAL, columns:ColumnJournal(t)  }

   , {id:"1120", name:"Financials", title:t('financials.title'), ctx:"/ftr", ctx1:"/acc", ctx2:"/cc", ctx3:'', get:"md/112"
   , form:<FinancialsForm/>, state:initFrt, state1:initAcc, state2:initCC , modelid:formEnum.FINANCIALS}

 , {id:"1300", name:"Balancesheet", title:t('balancesheet.title'), ctx:"/acc/balance", ctx1:"/acc", ctx2:"", ctx3:'', get:"md/112"
        , form:<BasicTreeTable/>, state:QUERY, state1:initAcc, state2:'', modelid:formEnum.BALANCESHEET
    , columns:ColumnsBalancesheet(t) }

    ]

export const loginInit ={username:'', password:'', company:'1000', language:'' }
export const initAcc = [{id:'', name: '', description: '', enterdate:date, postingdate:date
            , changedate:date, company:'', modelid:9, account:'-1', isDebit:false, balancesheet:false, currency:''
            , idebit:0.0,icredit:0.0, debit:0.0, credit:0.0 }]
export const initBank = [ {id:'', name: '', description: '', enterdate:date, postingdate:date
            , changedate:date, modelid:11, account:'-1', company:''}]
export const initCC = [ {id:'', name: '', description: '', enterdate:date, postingdate:date,changedate:date
            , modelid:6, account:'-1', company:''}]
export const initComp = [ {id:'', name:'', description:'', street:'', city:'', state:'', zip:'', bankAcc:''
    , purchasingClearingAcc:'', salesClearingAcc:'', paymentClearingAcc:'', settlementClearingAcc:'', balanceSheetAcc:''
    , incomeStmtAcc:'', cashAcc:'', taxCode:'-1', vatCode:'-1', currency:'', enterdate:date, postingdate:date
    , changedate:date, modelid:10, pageHeaderText:'', pageFooterText:'', headerText:'', footerText:'', logoContent:''
    , logoName:'', contentType:'', partner:'', phone:'', fax:'', email:'', locale:'de'}]


export const initVat=[{ id:'', name:'', description:'', percent:'', inputVatAccount:'', outputVatAccount:''
            , enterdate:date, postingdate:date, changedate:date, company:'', modelid:14}]

export const initCust=[{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
            , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
            , company:'', modelid:3 ,enterdate:date, postingdate:date, changedate:date
            , bankaccounts:[{iban:'', bic:'', owner:'', modelid:12, company:'1000'}]
            }]

export const initSup=[{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
            , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
            , company:'', modelid:1,enterdate:date, postingdate:date, changedate:date
            , bankaccounts:[{iban:'', bic:'', owner:'', modelid:12, company:'1000'}]
            }]

export const initJour=[{ id:'', transid:'', oid:'', account:'', oaccount:'', transdate:''
            , postingdate:'', enterdate:'', period:'', amount:'', idebit:'', debit:'', icredit:''
            , credit:'', currency:'',  side:'', text:'', month:'', year:'', company:'', typeJournal:''
            , file_content:'', modelid:''
            , query:{ account:'', account2:'', fromPeriod:'', toPeriod:''}}]
export const initBS=[{ bid:'', depositor:'', postingdate:date, valuedate:date, postingtext:'', purpose:''
            , beneficiary:'', accountno:'', bankCode:'', amount:'', currency:'', info:'', company:'', companyIban:''
            , posted:'',modelid:18}]
export const initFrt=[{ tid:-1, oid:0, costcenter:'', account:'', transdate:new Date()
            , enterdate:date, postingdate:date, period:getPeriod(new Date())
            , posted:false, modelid:112, company:'1000', text:'', typeJournal:0, file_content:0,lines:[{lid:-1, transid:0
                , side:true, account:'', oaccount:'', amount:0, duedate:date, text:'', currency:'EUR', company:'1000'
            }]}]
export const initPac=[{ period:'', idebit:0.0, icredit:0.0, debit:0.0, credit:0.0, currency:'', company:''
            , query:{ account:'', account2:'', fromPeriod:'', toPeriod:''}}]
export const initUser=[{ userName:'', firstName:'', lastName:'', email:'', hash:'', phone:'', company:'', id:0
        , role:'', modelid:111, menu:''}]

const QUERY ={ account:'', account2:'', fromPeriod:'', toPeriod:''}
export const MENU = (t)=> new Map([['/journal', JOURNAL(t)],
                     ['/pacb', PACB(t)]
                    ,['/bank', BANK(t)]
                    ,['/acc', ACCOUNT(t)]
                    ,['/cc', COSTCENTER(t)]
                    ,['/customer', CUSTOMER(t)]
                    ,['/supplier', SUPPLIER(t)]
                    ,['/vat', VAT(t)]
                    ,['/user', USER(t)]
                    ,['/login', LOGIN(t)]
                    ,['/company', COMPANY(t)]
                    ,['/bs', BS(t)]
                    ,['/ftr', FINANCIALS(t)]
                    ,['/balance', BALANCESHEET(t)]
]);

const initialState = {profile:{token:'noTOken', company:'', modules:[]}, selected:'', menu:new Map(),
history_:''}
export const { useGlobalState } = createGlobalState(initialState);




