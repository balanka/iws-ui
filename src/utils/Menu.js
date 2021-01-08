import React from 'react'
//import Login from "../../pages/login/Login";
import {currencyFormatDE, dateFormat} from "./utils";
import {formEnum} from "./FORMS";


    export const getCurrentMonth = (date)=>{
        const p=date.getUTCMonth()+1;
        return p<=10?"0".concat(p.toString()):p.toString();
    }
    export const date=new Date().toISOString()
    export const getPeriod = (date ) => {return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))};
    export const pacHeaders =(t) => [ {id:'period', label:t('pac.period'), minWidth:1, numeric:true }
        , { id: 'idebit', label:t('common.idebit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'debit', label:t('common.debit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'icredit', label:t('common.icredit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'credit', label:t('common.credit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'balance', label:t('common.balance'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'currency', label:t('common.currency'), minWidth:1}
    ]
export const JournalHeaders =(t) =>[ {id:'id', label:t('journal.id'), minWidth:2, numeric:true }, {id:'transid', label:t('journal.transid'), minWidth:1, numeric:true }
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

export const balanceHeaders=(t) =>[ {id:'id', label:t('balancesheet.id'), minWidth:1}
        , {id:'name', title:t('balancesheet.name'), minWidth:8}
        , {id:'account', title:t('balancesheet.account')}
        , { id: 'idebit', title: t('common.idebit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'debit', title: t('common.debit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'icredit', title: t('common.icredit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'credit', title:t('common.credit'), minWidth:2, numeric:true, format: (value) => currencyFormatDE(Number(value))}
        , { id: 'currency', label:t('common.currency'), minWidth:1}
    ]

export const treeHeaders =(t) =>( {h:[{ title:t('account.id'), field: 'id' }
            ,  { title:t('account.name'), field: 'name' }
            ,  { title:t('account.account'), field: 'account' }
            ,  { title:t('common.idebit'), field: 'idebit', type: 'numeric', minWidth:3 }
            ,  { title:t('common.debit'), field: 'debit' , type: 'numeric', minWidth:3}
            ,  { title:t('common.icredit'), field: 'icredit', type: 'numeric', minWidth:3 }
            ,  { title:t('common.credit'), field: 'credit' , type: 'numeric', minWidth:3}
            , { title: 'currency', label:t('common.currency'), minWidth:1}
        ]})
export const modules  = (t) =>[
        {id:"0", name:'Login', title:t('login.title'), ctx:"/users/login", ctx1:"/md", get:""
            , ctx2:"/", form:'loginForm', state:initCC, state1:initAcc ,state2:'',  columns:[]}
        , {id:"6", name:'CostCenter', title:t('costcenter.title'), ctx:"/cc", ctx1:"/acc/accmd/9", get:"md/6"
            , ctx2:"/", form:'masterfileForm', state:initCC, state1:initAcc ,state2:'', modelid:formEnum.COSTCENTER, columns:[]}
        , {id:"1", name:"Supplier", title:t('supplier.title'), ctx:"/sup", ctx1:"/acc/accmd/9", ctx2:"/vat",get:"md/1"
            , form:'masterfileForm' , state:initSup, state1:initAcc ,state2:initVat, modelid:formEnum.CUSTOMER, columns:[]}
        , {id:"3", name:'Customer', title:t('customer.title'), ctx:"/cust", ctx1:"/acc/accmd/9", ctx2:"/vat",get:"md/3"
            , form:'masterfileForm' , state:initCust, state1:initAcc, state2:initVat, modelid:formEnum.CUSTOMER, columns:[]}
        , {id:"9", name:"Account", title:t('account.title'), ctx:"/acc", ctx1:"/acc/accmd/9", get:"md/9"
            , form:'masterfileForm', state:initCC, state1:initAcc ,state2:'', modelid:formEnum.ACCOUNT, columns:[]}
        , {id:"11", name:"Bank", title:t('bank.title'), ctx:"/bank", ctx1:"/acc", ctx2:"", get:"md/11"
            , form:'masterfileForm', state:initBank, state1:initAcc ,state2:'', modelid:formEnum.BANK, columns:[]}
        , {id:"14", name:"Vat", title:t('vat.title'), ctx:"/vat", ctx1:"/acc/accmd/9", ctx2:"", get:"md/14"
            , form:'masterfileForm', state:initVat, state1:initAcc ,state2:'', modelid:formEnum.VAT, columns:[]}
        , {id:"18", name:"Bankstatement", title:t('bankstatement.title'), ctx:"/bs", ctx1:"/acc/accmd/9", ctx2:"", get:"md/18"
            , form:'bankStmtForm', state:initBS, state1:initAcc ,state2:'', modelid:formEnum.BANKSTATEMENT, columns:[]}
        , {id:"106", name:"PAC", title:t('pac.title'), ctx:"/pac", ctx1:"/acc", ctx2:"", get:"md/106"
            , form:'pacForm', state:initPac, state1:initAcc, state2:'', modelid:formEnum.PACB, columns:pacHeaders(t) }
        , {id:"112", name:"Journal", title:t('journal.title'), ctx:"/jou", ctx1:"/acc/accmd/9", ctx2:"", get:"md/112"
            , form:'journalForm', state:initJour, state1:initAcc, state2:'', modelid:formEnum.JOURNAL, columns:JournalHeaders(t)  }
        , {id:"1120", name:"Financials", title:t('financials.title'), ctx:"/ftr", ctx1:"/acc", ctx2:"/cc", get:"md/112"
            , form:'financialsForm', state:initFrt, state1:initAcc, state2:initCC , modelid:formEnum.FINANCIALS}

        , {id:"1000", name:"Balancesheet", title:t('balancesheet.title'), ctx:"/acc/balance", ctx1:"/acc", ctx2:"", get:"md/112"
            , form:"balancesheetForm", state:initBalanceSheet, state1:initAcc, state2:'', modelid:formEnum.BALANCESHEET, columns:balanceHeaders(t) }
        , {id:"1300", name:"BalanceTree", title:t('common.title'), ctx:"/acc", ctx1:"/acc", ctx2:"", get:"md/106"
            , form:"treeForm", state:initAcc, state1:initAcc, state2:'', modelid:formEnum.BALANCETREE, columns:treeHeaders(t).h }
    ]

export const initAcc = {hits:[{id:'', name: '', description: '', enterdate:date, postingdate:date
            , changedate:date, company:'', modelid:9, account:'-1', isDebit:false, balancesheet:false, currency:''
            , idebit:0.0,icredit:0.0, debit:0.0, credit:0.0 }]}
export const initBank = { hits:[ {id:'', name: '', description: '', enterdate:date, postingdate:date
            , changedate:date, modelid:11, account:'-1', company:''}]}
export const initCC = { hits:[ {id:'', name: '', description: '', enterdate:new Date().toISOString()
            , postingdate:new Date().toISOString(),changedate:new Date().toISOString()
            , modelid:6, account:'-1', company:''}]}

export const initVat={ hits:[{ id:'', name:'', description:'', percent:'', inputVatAccount:'', outputVatAccount:''
            , enterdate:date, postingdate:date, changedate:date, company:'', modelid:14}]}

export const initCust={hits:[{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
            , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
            , enterdate:date, postingdate:date, changedate:date, company:'', modelid:3}]}

export const initSup={hits:[{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
            , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
            , enterdate:date, postingdate:date, changedate:date, company:'', modelid:1}]}

export const initJour={hits:[{ id:'', transid:'', oid:'', account:'', oaccount:'', transdate:''
            , postingdate:'', enterdate:'', period:'', amount:'', idebit:'', debit:'', icredit:''
            , credit:'', currency:'',  side:'', text:'', month:'', year:'', company:'', typeJournal:''
            , file_content:'', modelid:''
            , query:{ account:'', account2:'', fromPeriod:'', toPeriod:''}}]}

export const initBalanceSheet= {"data":[{
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
export const initBS={hits:[{ bid:'', depositor:'', postingdate:date, valuedate:new Date(), postingtext:'', purpose:''
            , beneficiary:'', accountno:'', bankCode:'', amount:'', currency:'', info:'', company:'', companyIban:''
            , posted:'',modelid:18}]}
export const initFrt={hits:[{ tid:-1, oid:0, costcenter:'', account:'', transdate:new Date()
            , enterdate:date, postingdate:date, period:getPeriod(new Date())
            , posted:false, modelid:112, company:'1000', text:'', typeJournal:0, file_content:0,lines:[{lid:-1, transid:0
                , side:true, account:'', oaccount:'', amount:0, duedate:date, text:'', currency:'EUR', company:'1000'
            }]}]}
export const initPac={hits:[{ period:'', idebit:0.0, icredit:0.0, debit:0.0, credit:0.0, currency:'', company:''
            , query:{ account:'', account2:'', fromPeriod:'', toPeriod:''}}]}

