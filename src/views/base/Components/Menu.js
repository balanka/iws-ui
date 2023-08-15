import {formEnum} from "../../../utils/FORMS";
import {
  ColumnsACC, columnsPACB, ColumnJournal, ColumnsBalancesheet, ColumnsVAT, ColumnsBS, ColumnsM
  , ColumnsComp, ColumnsCUST, ColumnsUSER, ColumnsLOGIN
} from "../../Tables2/LineFinancialsProps";

import create from "zustand";
export const getCurrentMonth = (date)=>{
        const p=date.getUTCMonth()+1;
        return p<=10?"0".concat(p.toString()):p.toString();
    }

export const date= new Date().toISOString()
export const getPeriod = (date ) => {return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))};
export const MASTERFILE ={accURL:'/acc/1000', bankURL:'/bank/1000', ccURL:'/cc/1000', moduleURL:'/module/1000' , vatURL:'/vat/1000', custURL:'/cust/1000', supURL:'/sup/1000', compURL:'/comp/1000'};
const LOGIN=(t)=> ( {id:"11111", name:'Login', title:t('login.title'), ctx:"/users/login", ctx1:"/md", get:"",  modelid:formEnum.LOGIN
    , ctx2:"/", ctx3:'' , state:loginInit, state1:'' ,state2:'',  state3:'', columns:ColumnsLOGIN()});
const SUPPLIER =(t)=>({id:"1", name:"Supplier", title:t('supplier.title'), ctx:"/sup/1000", ctx1:"/acc/1000", ctx2:"/vat/1000",  ctx3:"/bank/1000", get:"md/1"
    ,  state:initSup, state1:initAcc ,state2:initVat, state3:initBank, modelid:formEnum.CUSTOMER, columns:ColumnsCUST(initAcc, t)})
const CUSTOMER = (t)=>({id:"3", name:'Customer', title:t('customer.title'), ctx:"/cust/1000", ctx1:"/acc/1000", ctx2:"/vat/1000", ctx3:"/bank/1000", get:"md/3"
    ,  state:initCust, state1:initAcc, state2:initVat, state3:initBank, modelid:formEnum.CUSTOMER, columns:ColumnsCUST(initAcc,t)})
export const COSTCENTER =(t)=>({id:"6", name:'CostCenter', title:t('costcenter.title'), ctx:"/cc/1000", ctx1:"/acc/1000", ctx2:'/', ctx3:'', get:"md/6"
    ,  state:initCC, state1:initAcc ,state2:'', state3:'/cc', modelid:formEnum.COSTCENTER, columns:ColumnsM(initAcc, t)})
export const ACCOUNT =(t)=>({id:"9", name:"Account", title:t('account.title'), ctx:"/acc/1000", ctx1:"", ctx2:'', ctx3:'', get:"md/9"
    ,  state:initCC, state1:initAcc ,state2:'', state3:'/acc', modelid:formEnum.ACCOUNT, columns:ColumnsACC(initAcc, t)})
const COMPANY = (t)=>({id:"10", name:"Company", title:t('company.title'), ctx:"/comp/1000", ctx1:"/acc/1000", ctx2:"/vat/1000", ctx3:"/bank/1000", get:"md/10"
    ,  state:initComp, state1:initAcc ,state2:initVat, state3:initBank, modelid:formEnum.COMPANY, columns:ColumnsComp(initAcc,t)})
export const BANK =(t)=>({id:"11", name:"Bank", title:t('bank.title'), ctx:"/bank/1000", ctx1:"", ctx2:"", ctx3:'', get:"md/11"
    ,  state:initBank, state1:initAcc ,state2:'', state3:'/bank', modelid:formEnum.BANK, columns:ColumnsM(initAcc, t)})
export const MODULE =(t)=>({id:"11", name:"Module", title:t('module.title'), ctx:"/module/1000", ctx1:"", ctx2:"", ctx3:'', get:"md/400"
  ,  state:initBank, state1:initAcc ,state2:'', state3:'/module', modelid:formEnum.BANK, columns:ColumnsM(initAcc, t)})
export const VAT =(t)=>({id:"14", name:"Vat", title:t('vat.title'), ctx:"/vat/1000", ctx1:"/acc/1000", ctx2:"", ctx3:'', get:"md/14"
    ,  state:initVat, state1:initAcc ,state2:'', state3:'/vat', modelid:formEnum.VAT, columns:ColumnsVAT(initAcc, t)})
const BS =(t)=>({id:"18", name:"Bankstatement", title:t('bankstatement.title'), ctx:"/bs/1000", ctx1:"/acc/1000", ctx2:"", ctx3:'', get:"md/18"
    , state:initBS, state1:'' ,state2:'', state3:'/bs', modelid:formEnum.BANKSTATEMENT,
    columns:ColumnsBS(t)})
const PACB = (t)=>({id:"106", name:"PAC", title:t('pac.title'), ctx:"/pac/1000", ctx1:"/acc/1000", ctx2:"/acc/1000", ctx3:'/acc/1000', get:"md/106"
    ,  state:initPac, state1:initAcc, state2:'', state3:'/pac', modelid:formEnum.PACB, columns:columnsPACB(t) })
const USER =(t)=>({id:"111", name:"User", title:t('user.title'), ctx:"/user/1000", ctx1:'', ctx2:"", ctx3:'', get:"md/111"
    ,  state:initUser, state1:'', state2:'', state3:'', modelid:formEnum.USER, columns:ColumnsUSER(t)  })
const JOURNAL = (t)=>({id:"112", name:"Journal", title:t('journal.title'), ctx:"/jou", ctx1:"/acc/1000", ctx2:"", ctx3:'', get:"md/112"
    ,  state:initJour, state1:initAcc, state2:'', state3:'', modelid:formEnum.JOURNAL, columns:ColumnJournal(t)  });
const FINANCIALS= (t)=>({id:"1120", name:"Financials", title:t('financials.title'), ctx:"/ftr/model/1000", ctx1:"/acc/1000"
    , ctx2:"/cc/1000", ctx3:'/ftr', get:"md/112"
    ,  state:initFtr, state1:initAcc, state2:initCC , state3:'', modelid:formEnum.FINANCIALS});

const BALANCESHEET =(t)=>({id:"1300", name:"Balancesheet", title:t('balancesheet.title'), ctx:"/balance/1000"
    , ctx1:"/acc/1000", ctx2:"", ctx3:'', get:"md/112"
    ,  state:initAcc, state1:initAcc, state2:'', state3:'', modelid:formEnum.BALANCESHEET
    , columns:ColumnsBalancesheet(t) });
export const LOGIN_MENU = (t)=> ([LOGIN(t)]);

export const loginInit =[{username:'', password:'', company:'1000', language:'' }]
export const initAcc = [{id:'', name: '', description: '', enterdate:date, postingdate:date
            , changedate:date, company:'', modelid:9, account:'-1', isDebit:false, balancesheet:false, currency:''
            , idebit:0.0,icredit:0.0, debit:0.0, credit:0.0 }]
export const initBank = [ {id:'', name: '', description: '', enterdate:date, postingdate:date
            , changedate:date, modelid:11, account:'-1', company:''}]
export const initModule = [ {id:'', name: '', description: '', path:'', parent:-1,
  enterdate:date, postingdate:date, changedate:date, modelid:400, account:'-1', company:''}]
export const initCC = [ {id:'6', name: '', description: '', enterdate:date, postingdate:date,changedate:date
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
            , bankaccounts:[{id:'', bic:'', owner:'', modelid:3, company:'1000'}]
            }]

export const initSup=[{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
            , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
            , company:'', modelid:1,enterdate:date, postingdate:date, changedate:date
            , bankaccounts:[{id:'', bic:'', owner:'', modelid:1, company:'1000'}]
            }]

export const initJour=[{ id:'', transid:'', oid:'', account:'', oaccount:'', transdate:''
            , postingdate:'', enterdate:'', period:'', amount:'', idebit:'', debit:'', icredit:''
            , credit:'', currency:'',  side:'', text:'', month:'', year:'', company:'', typeJournal:''
            , file_content:'', modelid:10002
            , query:{ account:'', account2:'', fromPeriod:'', toPeriod:''}}]
export const initBS=[{ id:'', depositor:'', postingdate:date, valuedate:date, postingtext:'', purpose:''
            , beneficiary:'', accountno:'', bankCode:'', amount:'', currency:'', info:'', company:'', companyIban:''
            , posted:'',modelid:18}]
export const initFtr=[{ id:-1, oid:0, id1:-1 ,costcenter:'', account:'', transdate:date
            , enterdate:date, postingdate:date, period:getPeriod(new Date())
            , posted:false, modelid:1300, company:'1000', text:'', typeJournal:0, file_content:0,lines:[{id:-1, transid:-1
            ,  account:'', side:true, oaccount:'', amount:0.0, duedate:date, text:'', currency:'EUR'}]}]
export const initPac=[{ period:'', idebit:0.0, icredit:0.0, debit:0.0, credit:0.0, currency:'', company:'', modelid:106
            , query:{ account:'', account2:'', fromPeriod:'', toPeriod:''}}]
export const initUser=[{ userName:'', firstName:'', lastName:'', email:'', hash:'', phone:'', company:'', id:0
        , role:'', modelid:111, menu:''}]

export const MENU = (t)=> new Map([
                     ['/journal', JOURNAL(t)]
                    ,['/pacb', PACB(t)]
                    ,['/bank', BANK(t)]
                    ,['/acc', ACCOUNT(t)]
                    ,['/cc', COSTCENTER(t)]
                    ,['/cust', CUSTOMER(t)]
                    ,['/sup', SUPPLIER(t)]
                    ,['/vat', VAT(t)]
                    ,['/user', USER(t)]
                    ,['/login', LOGIN(t)]
                    ,['/dashboard', LOGIN(t)]
                    ,['/comp', COMPANY(t)]
                    ,['/bs', BS(t)]
                    ,['/ftr', FINANCIALS(t)]
                    ,['/module', MODULE(t)]
                    ,['/balance', BALANCESHEET(t)]
]);

const initialState = {profile:{token:'noTOken', company:'', currency:'', modules:[]}, selected:''
    , userMenu:[], history_:'', routes:(t)=>LoginRoute}
const LoginMenu = (t) => new Map([['/login', LOGIN(t)]])
const LoginRoute = [{ path: '/login', name: 'Login', cp:'views/base/Components/Login' }]
export const  useStore = create((set) => ({
  profile: initialState, selected:'', menu:'', routes:'', module:'',
  setProfile: (p) => set((state) => ({ profile: p })),
  setSelected: (s) => set((state) => ({ selected: s })),
  setMenu: (m) => set((state) => ({ menu: m })),
  setModule: (module_) => set((state) => ({ module: module_ })),
  setRoutes: (r) => set((state) => ({ routes: r })),
}))

export {LoginMenu, LoginRoute};



