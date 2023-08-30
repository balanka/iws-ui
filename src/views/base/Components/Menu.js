import {formEnum} from "../../../utils/FORMS";
import {
  ColumnsACC, columnsPACB, ColumnJournal, ColumnsBalancesheet, ColumnsVAT, ColumnsBS, ColumnsM
  , ColumnsComp, ColumnsCUST, ColumnsUSER, ColumnsLOGIN, ColumnsModule
} from "../../Tables2/LineFinancialsProps";

import create from "zustand";
export const getCurrentMonth = (date)=>{
        const p=date.getUTCMonth()+1;
        return p<=10?"0".concat(p.toString()):p.toString();
    }

export const date= new Date().toISOString()
export const getPeriod = (date ) => {return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))};
export const MASTERFILE ={acc:'/acc', bank:'/bank', cc:'/cc', module:'/module', fmodule:'/fmodule', role:'/role', perm:'/perm'
  , vat:'/vat', cust:'/cust', sup:'/sup', comp:'/comp', ftr:'/ftr/model', bs:'/bs', pac:'/pac', jou:'/journal', balancesheet:'/balance'
  , user:'/user'};
const LOGIN=(t)=> ( {id:"11111", name:'Login', title:"login.title", ctx:"/users/login",  modelid:formEnum.LOGIN
    , state:loginInit, state1:'' ,state2:'',  state3:'', columns:ColumnsLOGIN()});
const SUPPLIER =(t)=>({id:"1", name:"Supplier", title:"supplier.title", ctx:MASTERFILE.sup
    ,  state:initSup, state1:initAcc ,state2:initVat, state3:initBank, modelid:formEnum.SUPPLIER, columns:ColumnsCUST(initAcc, t)})
const CUSTOMER = (t)=>({id:"3", name:'Customer', title:"customer.title", ctx:MASTERFILE.cust
    ,  state:initCust, state1:initAcc, state2:initVat, state3:initBank, modelid:formEnum.CUSTOMER, columns:ColumnsCUST(initAcc,t)})
export const COSTCENTER =(t)=>({id:"6", name:'CostCenter', title:"costcenter.title", ctx:MASTERFILE.cc
    ,  state:initCC, state1:initAcc ,state2:'', state3:'/cc', modelid:formEnum.COSTCENTER, columns:ColumnsM(initAcc, t)})
export const ACCOUNT =(t)=>({id:"9", name:"Account", title:"account.title", ctx:MASTERFILE.acc
    ,  state:initAcc, state1:initAcc ,state2:'', state3:'/acc', modelid:formEnum.ACCOUNT, columns:ColumnsACC(initAcc, t)})
const COMPANY = (t)=>({id:"10", name:"Company", title:"company.title", ctx:MASTERFILE.comp
    ,  state:initComp, state1:initAcc ,state2:initVat, state3:initBank, modelid:formEnum.COMPANY, columns:ColumnsComp(initAcc,t)})
export const BANK =(t)=>({id:"11", name:"Bank", title:"bank.title", ctx:MASTERFILE.bank
    ,  state:initBank, state1:initAcc ,state2:'', state3:'/bank', modelid:formEnum.BANK, columns:ColumnsM(initAcc, t)})
export const MODULE =(t)=>({id:"400", name:"Module", title:t('module.title'), ctx:MASTERFILE.module
  ,  state:initModule, state1:initAcc ,state2:'', state3:'/module', modelid:formEnum.MODULE, columns:ColumnsModule(t)})
export const VAT =(t)=>({id:"14", name:"Vat", title:"vat.title", ctx:MASTERFILE.vat
    ,  state:initVat, state1:initAcc ,state2:'', state3:'/vat', modelid:formEnum.VAT, columns:ColumnsVAT(initAcc, t)})
const BS =(t)=>({id:"18", name:"Bankstatement", title:"bankstatement.title", ctx:MASTERFILE.bs
    , state:initBS, state1:'' ,state2:'', state3:'/bs', modelid:formEnum.BANKSTATEMENT, period:-1, columns:ColumnsBS(t)})
const PACB = (t)=>({id:"106", name:"PAC", title:"pac.title", ctx:MASTERFILE.pac
    ,  state:initPac, state1:initAcc, state2:'', state3:'/pac', modelid:formEnum.PACB, columns:columnsPACB(t) })
const USER =(t)=>({id:"111", name:"User", title:"user.title", ctx:MASTERFILE.user
    ,  state:initUser, state1:'', state2:'', state3:'', modelid:formEnum.USER, columns:ColumnsUSER(t)  })
const JOURNAL = (t)=>({id:"112", name:"Journal", title:"journal.title", ctx:MASTERFILE.jou
    ,  state:initJour, state1:initAcc, state2:'', state3:'', modelid:formEnum.JOURNAL, columns:ColumnJournal(t)  });
const FINANCIALS= (t)=>({id:"1120", name:"Financials", title:"financials.title", ctx:MASTERFILE.ftr
  ,  state:initFtr, state1:initAcc, state2:initCC , state3:'', modelid:formEnum.FINANCIALS});

const BALANCESHEET =(t)=>({id:"1300", name:"Balancesheet", title:"balancesheet.title", ctx:MASTERFILE.balancesheet
    ,   state:initAcc, state1:initAcc, state2:'', state3:'',
     modelid:formEnum.BALANCESHEET, columns:ColumnsBalancesheet(t) });

export const ROLE =(t)=>({id:"121", name:"UserRole", title:"role.title", ctx:MASTERFILE.role
  ,  state:initRole, state1:initAcc ,state2:'', state3:'/role', modelid:formEnum.ROLE, columns:ColumnsM(initAcc, t)})

export const PERMISSION =(t)=>({id:"141", name:"Permission", title:"permission.title", ctx:MASTERFILE.perm
  ,  state:initPermission, state1:initAcc ,state2:'', state3:'/perm', modelid:formEnum.PERMISSION, columns:ColumnsM(initAcc, t)})

export const FMODULE =(t)=>({id:"151", name:"FModule", title:"fmodule.title", ctx:MASTERFILE.fmodule
  ,  state:initfModule, state1:initAcc ,state2:'', state3:'/fmodule', modelid:formEnum.FMODULE, columns:ColumnsM(initAcc, t)})
export const LOGIN_MENU = (t)=> ([LOGIN(t)]);

export const loginInit =[{username:'', password:'', company:'', language:'' }]
export const initAcc = [{id:'9', name: '', description: '', enterdate:date, postingdate:date
            , changedate:date, company:'', modelid:9, account:'-1', isDebit:false, balancesheet:false, currency:''
            , idebit:0.0,icredit:0.0, debit:0.0, credit:0.0 }]
export const initBank = [ {id:'', name: '', description: '', enterdate:date, postingdate:date
            , changedate:date, modelid:11, account:'-1', company:''}]
export const initModule = [ {id:'400', name: '', description: '', path:'', parent:-1,
  enterdate:date, postingdate:date, changedate:date, modelid:400,  company:''}]
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
            , bankaccounts:[{id:'', bic:'', owner:'', modelid:12, company:''}]
            }]

export const initSup=[{ id:'', name:'', description:'', street:'', city:'', state:'', zip:''
            , country:'', phone:'', email:'', account:'-1', oaccount:'-1', iban:'-1', vatcode:'-1'
            , company:'', modelid:1,enterdate:date, postingdate:date, changedate:date
            , bankaccounts:[{id:'', bic:'', owner:'', modelid:12, company:''}]
            }]

export const initJour=[{ id:'', transid:'', oid:'', account:'', oaccount:'', transdate:''
            , postingdate:'', enterdate:'', period:'', amount:'', idebit:'', debit:'', icredit:''
            , credit:'', currency:'',  side:'', text:'', month:'', year:'', company:'', typeJournal:''
            , file_content:'', modelid:10002
            , query:{ account:'', account2:'', fromPeriod:'', toPeriod:''}}]
export const initBS=[{ id:'', depositor:'', postingdate:date, valuedate:date, postingtext:'', purpose:''
            , beneficiary:'', accountno:'', bankCode:'', amount:'', currency:'', info:'', company:'', companyIban:''
            , posted:'',modelid:18, period:-1}]
export const initFtr=[{ id:-1, oid:0, id1:-1 ,costcenter:'', account:'', transdate:date
            , enterdate:date, postingdate:date, period:getPeriod(new Date())
            , posted:false, modelid:1300, company:'', text:'', typeJournal:0, file_content:0,lines:[{id:-1, transid:-1
            ,  account:'', side:true, oaccount:'', amount:0.0, duedate:date, text:'', currency:'EUR'}]}]
export const initPac=[{  id:'',  name:'', period:'', idebit:0.0, icredit:0.0, debit:0.0, credit:0.0, currency:'', company:'', modelid:106
            , query:{ account:'', account2:'', fromPeriod:'', toPeriod:''}}]
export const initUser=[{ userName:'', firstName:'', lastName:'', email:'', hash:'', phone:'', company:'', id:0
        , role:'', modelid:111, menu:''}]

export const initRole = [ {id:'121', name: '', description: '', enterdate:date, postingdate:date
  , changedate:date, modelid:121,  company:'', rights: [{moduleid:'', roleid:-1, short:'', company:'', modelid:151}]}]
export const initPermission = [ {id:'141', name: '', description: '', enterdate:date, postingdate:date
  , changedate:date, modelid:141, account:'-1', company:''}]

export const initfModule = [ {id:'151', name: '', description: '', enterdate:date, postingdate:date
  , changedate:date, modelid:151, account:'-1', isDebit:false, company:''}]
export const MENU = (t)=> new Map([
                     ['/journal', JOURNAL(t)]
                    ,['/pac', PACB(t)]
                    ,['/bank', BANK(t)]
                    ,['/acc', ACCOUNT(t)]
                    ,['/cc', COSTCENTER(t)]
                    ,['/cust', CUSTOMER(t)]
                    ,['/sup', SUPPLIER(t)]
                    ,['/vat', VAT(t)]
                    ,['/user', USER(t)]
                    ,['/role', ROLE(t)]
                    ,['/perm', PERMISSION(t)]
                    ,['/login', LOGIN(t)]
                    ,['/dashboard', LOGIN(t)]
                    ,['/comp', COMPANY(t)]
                    ,['/bs', BS(t)]
                    ,['/ftr', FINANCIALS(t)]
                    ,['/module', MODULE(t)]
                    ,['/fmodule', FMODULE(t)]
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




