import {formEnum} from "./FORMS";
import {ColumnsACC, columnsPACB, ColumnJournal, ColumnsBalancesheet, ColumnsVAT, ColumnsBS, ColumnsM, columnsJ
    , ColumnsComp, ColumnsCUST  } from "../views/Tables2/LineFinancialsProps";

export const getCurrentMonth = (date)=>{
        const p=date.getUTCMonth()+1;
        return p<=10?"0".concat(p.toString()):p.toString();
    }
export const date= new Date().toISOString()
export const getPeriod = (date ) => {return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))};

export const modules  = (t) =>[
        {id:"0", name:'Login', title:t('login.title'), ctx:"/users/login", ctx1:"/md", get:""
            , ctx2:"/", ctx3:'', form:'loginForm', state:initCC, state1:initAcc ,state2:'',  columns:[]} 
         , {id:"1", name:"Supplier", title:t('supplier.title'), ctx:"/sup", ctx1:"/acc/accmd/9", ctx2:"/vat",  ctx3:"/bank", get:"md/1"
            , form:'masterfileForm' , state:initSup, state1:initAcc ,state2:initVat, modelid:formEnum.CUSTOMER, columns:ColumnsCUST(initAcc, t)}
        , {id:"3", name:'Customer', title:t('customer.title'), ctx:"/cust", ctx1:"/acc/accmd/9", ctx2:"/vat", ctx3:"/bank", get:"md/3"
            , form:'masterfileForm' , state:initCust, state1:initAcc, state2:initVat, modelid:formEnum.CUSTOMER, columns:ColumnsCUST(initAcc,t)}
        , {id:"6", name:'CostCenter', title:t('costcenter.title'), ctx:"/cc", ctx1:"/acc/accmd/9", ctx2:'/', ctx3:'', get:"md/6"
            , form:'masterfileForm', state:initCC, state1:initAcc ,state2:'', modelid:formEnum.COSTCENTER, columns:ColumnsM(initAcc, t)}
        , {id:"9", name:"Account", title:t('account.title'), ctx:"/acc", ctx1:"/acc/accmd/9", ctx2:'', ctx3:'', get:"md/9"
            , form:'masterfileForm', state:initCC, state1:initAcc ,state2:'', modelid:formEnum.ACCOUNT, columns:ColumnsACC(initAcc, t)}
        , {id:"10", name:"Company", title:t('company.title'), ctx:"/comp", ctx1:"/acc/accmd/9", ctx2:"/vat", ctx3:"/bank", get:"md/10"
            , form:'masterfileForm', state:initComp, state1:initAcc ,state2:initVat, modelid:formEnum.COMPANY, columns:ColumnsComp(initAcc,t)}
        , {id:"11", name:"Bank", title:t('bank.title'), ctx:"/bank", ctx1:"", ctx2:"", ctx3:'', get:"md/11"
            , form:'masterfileForm', state:initBank, state1:initAcc ,state2:'', modelid:formEnum.BANK, columns:ColumnsM(initAcc, t)}
        , {id:"14", name:"Vat", title:t('vat.title'), ctx:"/vat", ctx1:"/acc/accmd/9", ctx2:"", ctx3:'', get:"md/14"
            , form:'masterfileForm', state:initVat, state1:initAcc ,state2:'', modelid:formEnum.VAT, columns:ColumnsVAT(initAcc, t)}
        , {id:"18", name:"Bankstatement", title:t('bankstatement.title'), ctx:"/bs", ctx1:"/acc/accmd/9", ctx2:"", ctx3:'', get:"md/18"
            , form:'bankStmtForm', state:initBS, state1:initAcc ,state2:'', modelid:formEnum.BANKSTATEMENT, columns:ColumnsBS(initAcc, t)}
        , {id:"106", name:"PAC", title:t('pac.title'), ctx:"/pac", ctx1:"/acc", ctx2:"", ctx3:'', get:"md/106"
            , form:'jForm', state:initPac, state1:initAcc, state2:'', modelid:formEnum.PACB, columns:columnsPACB(t) }
        , {id:"112", name:"Journal", title:t('journal.title'), ctx:"/jou", ctx1:"/acc/accmd/9", ctx2:"", ctx3:'', get:"md/112"
            , form:'jForm', state:initJour, state1:initAcc, state2:'', modelid:formEnum.JOURNAL, columns:ColumnJournal(t)  }
        , {id:"1120", name:"Financials", title:t('financials.title'), ctx:"/ftr", ctx1:"/acc", ctx2:"/cc", ctx3:'', get:"md/112"
            , form:'financialsForm', state:initFrt, state1:initAcc, state2:initCC , modelid:formEnum.FINANCIALS}

        //, {id:"1000", name:"Balancesheet", title:t('balancesheet.title'), ctx:"/acc/balance", ctx1:"/acc", ctx2:"", ctx3:'', get:"md/112"
         //   , form:"balancesheetForm", state:initBalanceSheet, state1:initAcc, state2:'', modelid:formEnum.BALANCESHEET, columns:balanceHeaders(t) }
        , {id:"1300", name:"Balancesheet", title:t('balancesheet.title'), ctx:"/acc/balance", ctx1:"/acc", ctx2:"", ctx3:'', get:"md/112"
            , form:"balancesheetForm", state:initAcc, state1:initAcc, state2:'', modelid:formEnum.BALANCESHEET
        , columns:ColumnsBalancesheet(t) }
    ]

export const initAcc = {hits:[{id:'', name: '', description: '', enterdate:date, postingdate:date
            , changedate:date, company:'', modelid:9, account:'-1', isDebit:false, balancesheet:false, currency:''
            , idebit:0.0,icredit:0.0, debit:0.0, credit:0.0 }]}
export const initBank = { hits:[ {id:'', name: '', description: '', enterdate:date, postingdate:date
            , changedate:date, modelid:11, account:'-1', company:''}]}
export const initCC = { hits:[ {id:'', name: '', description: '', enterdate:new Date().toISOString()
            , postingdate:new Date().toISOString(),changedate:new Date().toISOString()
            , modelid:6, account:'-1', company:''}]}
export const initComp = { hits:[ {id:'', name:'', description:'', street:'', city:'', state:'', zip:'', bankAcc:''
    , purchasingClearingAcc:'', salesClearingAcc:'', paymentClearingAcc:'', settlementClearingAcc:'', balanceSheetAcc:''
    , incomeStmtAcc:'', cashAcc:'', taxCode:'-1', vatCode:'-1', currency:'', enterdate:new Date().toISOString()
    , postingdate:new Date().toISOString(), changedate:new Date().toISOString(), modelid:10, pageHeaderText:''
    , pageFooterText:'', headerText:'', footerText:'', logoContent:'', logoName:'', contentType:'', partner:''
    , phone:'', fax:'', email:'', locale:'de'}]}


export const initVat={ hits:[{ id:'', name:'', description:'', percent:'', inputVatAccount:'', outputVatAccount:''
            , enterdate:date, postingdate:date, changedate:date, company:'', modelid:14}]}

export const initCust={hits:[{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
            , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
            , company:'', modelid:3 ,enterdate:date, postingdate:date, changedate:date
            , bankaccounts:[{iban:'', bic:'', owner:'', modelid:12, company:'1000'}]
            }]}

export const initSup={hits:[{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
            , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
            , company:'', modelid:1,enterdate:date, postingdate:date, changedate:date
            , bankaccounts:[{iban:'', bic:'', owner:'', modelid:12, company:'1000'}]
            }]}

export const initJour={hits:[{ id:'', transid:'', oid:'', account:'', oaccount:'', transdate:''
            , postingdate:'', enterdate:'', period:'', amount:'', idebit:'', debit:'', icredit:''
            , credit:'', currency:'',  side:'', text:'', month:'', year:'', company:'', typeJournal:''
            , file_content:'', modelid:''
            , query:{ account:'', account2:'', fromPeriod:'', toPeriod:''}}]}
export const initBS={hits:[{ bid:'', depositor:'', postingdate:date, valuedate:date, postingtext:'', purpose:''
            , beneficiary:'', accountno:'', bankCode:'', amount:'', currency:'', info:'', company:'', companyIban:''
            , posted:'',modelid:18}]}
export const initFrt={hits:[{ tid:-1, oid:0, costcenter:'', account:'', transdate:new Date()
            , enterdate:date, postingdate:date, period:getPeriod(new Date())
            , posted:false, modelid:112, company:'1000', text:'', typeJournal:0, file_content:0,lines:[{lid:-1, transid:0
                , side:true, account:'', oaccount:'', amount:0, duedate:date, text:'', currency:'EUR', company:'1000'
            }]}]}
export const initPac={hits:[{ period:'', idebit:0.0, icredit:0.0, debit:0.0, credit:0.0, currency:'', company:''
            , query:{ account:'', account2:'', fromPeriod:'', toPeriod:''}}]}


