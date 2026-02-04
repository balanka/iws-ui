import {
  IAccount,
  IAddress,
  IArticle, IAsset, IBankAccount, IBankStatement, IBankStatementParam, IBusinespartner, ICompany,
  ICustomer,
  IEmployee, IFinancials, IFmodule, ILineFinancials, ILineTransaction, ILoggingContext,
  IMasterfile,
  IMasterfile2, IPartner, IProfile, IRole,
  IStore,
  ISupplier, ITransaction, IUser,
  IVat, IWSLine, IWSModel, IWSTransaction
} from "./Models.ts";
import {type i18n, TFunction} from "i18next";
import React, {CSSProperties, Dispatch, SetStateAction} from "react";
import {GridApi, GridReadyEvent} from "ag-grid-community";
// @ts-ignore
import type {RowSelectedEvent} from "ag-grid-community/dist/types/src/events";

import {AgGridReact} from "ag-grid-react";
import {NavigateFunction} from "react-router-dom";
import './i18n.tsx'
import I18n from "./i18n.tsx";



export interface AddressProps {
    current: IAddress,
    setCurrent: (arg: any | ICustomer | ISupplier | IEmployee) => void,
    t: TFunction<'transalation', undefined>,
    disable: boolean,
    height: number
}
export interface SaveProps {fileName:string, sheetName:string, data: any}
export interface printDocProps  { e:any, templateFileName:string, data:any}
export interface BankAccountFormProps {
     currentBankAccount: IBankAccount
    , setCurrentBankAccount: (arg:IBankAccount)=>void
    , businessPartner:ICustomer|ISupplier|IEmployee|ICompany
    , setBusinessPartner: (arg:any)=>void
    , bankData: IMasterfile[]
    , t:TFunction<'transalation', undefined>
    , zIndex:number
    , disable: boolean
    , height?: number}

export interface CustomerTabProps {
     current: ICustomer | ISupplier | IEmployee
    , setCurrent: (set: any ) => void
    , currentBankAccount:IBankAccount
    , setCurrentBankAccount:(arg:IBankAccount) =>void
    , token: string
    , modifyUrl: string
    , t: TFunction<'transalation', undefined>
    , data: ICustomer[] | ISupplier[] | IEmployee[]
    , locale: string
    , accData: IAccount[]
    , bankData:IMasterfile[]
    , vatData: IVat[]
    , ccyData: IMasterfile[]
    , height: number
    , disable: boolean
    , zIndex:number
    , onGridReady:(params: GridReadyEvent)=>void
}
export interface CompanyTabProps {
      current: ICompany
    , setCurrent: (set: any ) => void
    , currentBankAccount:IBankAccount
    , setCurrentBankAccount:(arg:IBankAccount) =>void
    , token: string
    , modifyUrl: string
    , t: TFunction<'transalation', undefined>
    , data:ICompany[]
    , locale: string
    , accData: IAccount[]
    , bankData:IMasterfile[]
    , vatData: IVat[]
    , ccyData: IMasterfile[]
    , height: number
    , disable: boolean
    , zIndex:number
    , onGridReady:(params: GridReadyEvent)=>void
}

export interface ArticleProps {
  current: IArticle
  , setCurrent: (art: IArticle) => void
  ,  accData: IAccount[]
  , vatData: IVat[]
  , data:IArticle[]
  , quantityUnitData:IMasterfile[]
  , groupData:IMasterfile[]
  , ccyData:IMasterfile[]
  , locale: string
  , currency: string
  , t: TFunction<'transalation', undefined>
  , disable: boolean
  , height?: number
  , zIndex:number
}

export interface ArticleQRFormProps {
  current: IArticle
  , t: TFunction<'transalation', undefined>
}
export interface ArticleGeneralFormProps {
    current: IArticle
    , setCurrent: (art: IArticle) => void
    , quantityUnitData:IMasterfile[]
    , groupData:IMasterfile[]
    , ccyData:IMasterfile[]
    , t: TFunction<'transalation', undefined>
    , disable: boolean
}

export interface AssetProps {
    current: IAsset
    , setCurrent: (arg: IAsset) => void
    , accData: IAccount[]
    , t: TFunction<'transalation', undefined>
    , disable: boolean
    , locale: string
    , currency: string
    , height?: number
    , zIndex:number
}

export interface BankStatementProps {
    collapse:boolean,
    current: IBankStatement,
    setCurrent: (arg: any | IBankStatement) => void,
    t: TFunction<'transalation', undefined>,
    locale: string,
    currency: string,
    height: number
}

export interface BankStatementParamProps {
    current: IBankStatementParam,
    setCurrent: (arg: IBankStatementParam) => void,
    t: TFunction<'transalation', undefined>,
    height: number
}
export interface AccountMainProps {
  collapse:boolean,
  current: IAccount,
  setCurrent: (arg: IAccount) => void,
  accData: IAccount[],
  t: TFunction<'transalation', undefined>,
  locale: string,
  disable: boolean,
  height: number
}
export interface IAddressProps {
  current:IAddress, setCurrent:(arg:IAddress)=>void, disable:boolean, t:TFunction<'transation', undefined>, height:number }
export interface MasterfileProps2<A extends IMasterfile2>{
    collapse:boolean
    current: A,
    setCurrent: (arg: any) => void,
    accData: IMasterfile[],
    t: TFunction<'translation', undefined>,
    disable: boolean,
    height: number
}
export interface FModuleProps2<A extends IMasterfile2>{
  collapse:boolean
  current: A,
  setCurrent: (arg: any) => void,
  accData: IMasterfile[],
  accountData: IMasterfile[],
  rowData: IMasterfile2[],
  t: TFunction<'translation', undefined>,
  disable: boolean,
  height: number
}
export interface MasterfileProps<A extends IMasterfile> {
  collapse: boolean,
  current: A,
  setCurrent: (arg: any) => void,
  t: TFunction<'translation', undefined>,
  disable: boolean,
  height: number
}
export interface PartnerProps<A extends IPartner> extends MasterfileProps<A> {
  collapse: boolean,
  current: A,
  setCurrent: (arg: any) => void,
  //setAddress: (arg: IAddress) => void,
  t: TFunction<'translation', undefined>,
  disable: boolean,
  height: number
}

export interface MasterfileComboboxProps<A extends IMasterfile, B extends IMasterfile> {
    current: A,
    data: B[]
    setCurrent: (arg: any) => void,
    fieldName:string,
    defaultValue:B,
    disable: boolean,
    zIndex:number,
    styles:CSSProperties,
    height?: number
}

export interface RoleProps {
    collapse: boolean,
    current: IRole,
    setCurrent: (arg: IRole) => void,
    t: TFunction<'translation', undefined>,
    disable: boolean,
    height: number
}

export interface StoreGeneralFormProps {
     collapse: boolean
    , current: IStore
    , setCurrent: (art: any | IStore) => void
    , accData: IAccount[]
    , locale: string
    , t: TFunction<'transalation', undefined>
    , disable: boolean
    , height: number
}
export interface StoreProps {
      collapse: boolean
    , current: IStore
    , setCurrent: (art: any | IStore) => void
    , accData: IAccount[]
    , locale: string
    , t: TFunction<'transalation', undefined>
    , zIndex:number
    , disable: boolean
    , height: number
}

export interface CustomerGeneralFormProps {
    current: IBusinespartner,
    setCurrent: (arg: IBusinespartner) => void,
    ccyData:IMasterfile[]
    disable: boolean,
    t: TFunction<'transalation', undefined>
}
export type ILine = ILineTransaction|ILineFinancials
export interface FinancialsDetailsTabProps<T extends IFinancials, L extends  ILine> {
    transaction: T,
    setTransaction:(arg:T)=>void
    currentLineFinancials:L,
    setCurrentLineFinancials:Dispatch<SetStateAction<L>>,
    accData: IAccount[],
    t: TFunction<'transalation', undefined>,
    zIndex:number,
    onGridReady:(params: GridReadyEvent)=>void,
    gridRef?:React.RefObject<AgGridReact>
}

export interface FinancialsDetailsFormProps<T extends IWSTransaction<L>, L extends  ILineFinancials> {
    transaction: T,
    setTransaction:(arg:T)=>void
    currentLineFinancials:L,
    setCurrentLineFinancials:Dispatch<SetStateAction<L>>,
    accData: IAccount[],
    t: TFunction<'transalation', undefined>,
    disable: boolean,
    height?: number,
    zIndex:number,
}

export interface TransactionDetailsTabProps <T extends ITransaction, L extends ILineTransaction> {
    transaction: T,
    setTransaction:Dispatch<SetStateAction<T>>,
    currentLineTransaction:L,
    setCurrentLineTransaction:Dispatch<SetStateAction<L>>,
    articleData: IArticle[],
    vatData: IVat[],
    t: TFunction<'transalation', undefined>,
    onGridReady:(params: GridReadyEvent)=>void,
    //gridApi:GridApi,
    //gridRef?:React.RefObject<AgGridReact>,
    zIndex:number,
}

export interface TransactionDetailsFormProps<T extends IWSTransaction<L>, L extends  ILine> {
    transaction: T,
    setTransaction:Dispatch<SetStateAction<T>>
    currentLineTransaction: L,
    setCurrentLineTransaction: Dispatch<SetStateAction<L>>,
    articleData: IArticle[],
    vatData: IVat[],
    t: TFunction<'transalation', undefined>,
    disable: boolean,
    height?: number
}

export interface MasterfileFormProps<A, B> {
  collapse:boolean,
  current: A,
  setCurrent: (c: A) => void,
  accData: B[],
  disable: boolean,
  height: number,
  t: TFunction<'translation', undefined>
} //,

export interface Masterfile2FormProps<A> {
    collapse:boolean,
    current: A,
    setCurrent: (c: A) => void,
    accData: IMasterfile2[],
    disable: boolean,
    height: number,
    t: TFunction<'translation', undefined>
} //,
export interface FinancialsCBoxProps2<A, B> {
  current: A,
  setCurrent: (arg: any) => void,
  data: B[],
  fieldName:string,
  defaultValue:B
  zIndex: number,
  styles: any
}
export interface FinancialsCBoxProps<A, B> {
  current: A,
  setCurrent: (arg: A) => void,
  data: B[],
  zIndex: number,
  styles: any
}
export interface CompanyCBoxProps<A, B> {
  fieldName:string
  current: A,
  setCurrent: (arg: A) => void,
  data: B[],
  currentAcc:B,
  zIndex: number,
  styles: any,
  disable:boolean
}

export interface UserFormProps { collapse: boolean, current:IUser, setCurrent:(arg:IUser)=>void
    , t:TFunction<'translation', undefined>, disable:boolean, height:number
}
export  interface TransactionToolBarProps<A extends IWSTransaction<L>, L extends  IWSLine>{
  title:string, templateName: ()=> string
  , saveProps:SaveProps, collapse:boolean
  ,  initAdd:()=>void, onNewLine:()=>void, onDeleteLine:(arg:any)=>void
  , submitCancel:(e:any)=>void, submitEdit: (arg:any)=>void
  , getData:()=>any
  , submitPrintPreview:(arg:A, templateName: () =>string, getData:()=>any) =>Promise<void>
  , toggle:()=>void, submitPost:(arg:any)=>void,  reload:()=>void
  , handleLanguageChange: (arg:any)=>void
  , navigate:NavigateFunction, language:string, dispatch:Dispatch<any>
  , logout:(navigate:NavigateFunction) =>void
  , current:IFinancials|ITransaction
}
export interface IJournalIF<A>  extends IWSModel  {
    fromPeriod:number
  , toPeriod:number
  , currency:string
  , lines:A[]
}
export  interface JournalToolBarProps<A> {
   style: CSSProperties
  , title:string
  , submitQuery:(event:any, current:any)=>void
  , submitQuery2?:(event:any , current:any)=>void
  , balancesheet:boolean, t:TFunction<'translation', undefined>
  , dispatch:Dispatch<any>
  , logout:(navigate:NavigateFunction) =>void
  , current: IJournalIF<A>|A
  , templateName: ()=>string
  , getData: ()=>any
  , submitPrintPreview:(arg:A, templateName: () =>string, getData:()=>any) =>Promise<void>
   }
export interface UseFormResult {
    profile: IProfile
  , setProfile:(p:IProfile)=>void
  , menu: Map<any, any>
  , setMenu:(m: Map<any, any>) =>void
  , setModule:(m : any)=>void
  , setRoutes:(r : any)=>void
  , selected: string
  , t:TFunction<'translation', undefined>
  , i18n: i18n
  , title:string
  , language:string
  , setLanguage:Dispatch<SetStateAction<string>>
  , handleLanguageChange:(language:any)=>void
  , state:State
  , toggle:() =>void
  , modelid : number
  , company:string
  , module_:any
}
export interface State {collapse: boolean, fadeIn: boolean, timeout:  300}
export interface UseMasterfileFormResult<T> {
  profile: IProfile
  , menu: Map<any, any>
  , selected: string
  , t:TFunction<'translation', undefined>
  , i18n: i18n
  , language:string
  , modelid : number
  , initAdd:()=>void
  , added:boolean
  , disable:boolean
  , edit:()=>void
  , edited:boolean
  , submitEdit:(event:any) =>void
  , cancelEdit:()=>void
  , reload: ()=>void
  , handleLanguageChange:(event:any) =>void
  , title:string
  , zIndex:number
  , rowData:T[]
  , setRowData:Dispatch<SetStateAction<T[]>>
  , current:T
  , setCurrent:Dispatch<SetStateAction<T>>
}
export interface UseCustomerFormResult<T extends IBusinespartner> {
  profile: IProfile
  , menu: Map<any, any>
  , selected: string
  , t:TFunction<'translation', undefined>
  , edited:boolean|undefined, added:boolean|undefined
  , disable:boolean
  , language:string
  , accData:IAccount[]
  , bankData:IMasterfile[]
  , ccyData:IMasterfile[]
  , vatData:IVat[]
  , rowData:T[]
  , setRowData:Dispatch<SetStateAction<T[]>>
  , current_ :T
  , current:T
  , setCurrent:Dispatch<SetStateAction<T>>
  , currentBankAccount:IBankAccount
  , setCurrentBankAccount:Dispatch<SetStateAction<IBankAccount>>
  , edit:()=>void
  , initAdd:()=>void
  , reload:()=>void
  , submitEdit: (event: any) => void
  , cancelEdit:()=>void
  , handleLanguageChange:(event:any) =>void
  , onNewBankAccount: ()=>void
  , onDeleteBankAccount:(event:any) =>void
  , onNewSalaryItem:()=>void
  , submitQuery: (event: any) => void
  , onRowSelected: (event: RowSelectedEvent) => void
  , title:string
  , setGridApi:Dispatch<SetStateAction<GridApi<any>|undefined>>
}

export interface UseTransactionFormResult<T extends IWSTransaction<L>, L extends  IWSLine> {
  profile: IProfile
  , menu: Map<any, any>
  , selected: string
  , t:TFunction<'translation', undefined>
  , language:string
  , isFetching:boolean
  , accData?:IAccount[]
  , storeData:IStore[]
  , fmodule:IFmodule[]
  , articleData?:IArticle[]
  , vatData?:IVat[]
  , rowData:T[]
  , setRowData:Dispatch<SetStateAction<T[]>>
  , current_ :T
  , current:T
  , setCurrent:Dispatch<SetStateAction<T>>
  , initAdd:()=>void
  , reload:()=>void
  , submitEdit: (event: any) => void
  , copyFromTransaction:T[]
  , setCopyFromTransaction:Dispatch<SetStateAction<T[]>>
  , handleLanguageChange:(event:any) =>void
  , handleModuleChange:(event:any) =>void
  , handleKeyPress:(event:any)=>void
  , onNewLine:()=>void
  , onRowSelected: (event: RowSelectedEvent) => void
  , onDeleteLine:(arg:any) =>void
  , submitCancel:(event:any) =>void
  , submitPost:(event:any)=>void
  , copyCall:(arg:BigInt)=>void
  , setGridApi:Dispatch<SetStateAction<GridApi<any>|undefined>>
  , templateName:()=>string
  , zIndex:number
  , saveProps:SaveProps
  , modelid:number
  , partnerId:number
  , title:string
}
export interface UseJFormResult<T> {
  profile: IProfile
  , menu: Map<any, any>
  , selected: string
  , t:TFunction<'translation', undefined>
  , accData:IAccount[]
  , rowData:T[]
  , setRowData:Dispatch<SetStateAction<T[]>>
  , current_:JournalProps
  , current:JournalProps
  , setCurrent:Dispatch<SetStateAction<JournalProps>>
  , submitQuery: (event: any, current: JournalProps) => void
  , submitQuery2: (event: any, current: JournalProps) => void
  , onRowSelected: (event: RowSelectedEvent) => void
  , templateName: ()=>string
  , title:string
  , styles:any
}
export interface UseArticleAccountResult<T> {
  profile: IProfile
  , menu: Map<any, any>
  , selected: string
  , t:TFunction<'translation', undefined>
  , articleData:IArticle[]
  , storeData:IStore[]
  , rowData:T[]
  , setRowData:Dispatch<SetStateAction<T[]>>
  , current_:IJournalProps
  , current:IJournalProps
  , setCurrent:Dispatch<SetStateAction<IJournalProps>>
  , submitQuery: (event: any, current: IJournalProps) => void
  , onRowSelected: (event: RowSelectedEvent) => void
  , templateName: ()=>string
  , title:string
  , styles:any
}
export interface IMenu <T> {
  id: string,
  name:string,
  title: string,
  ctx:  string,
  modelid: number,
  state: T [],
}
export  interface JournalProps {
  account: string,
  account2:string,
  fromPeriod:number,
  toPeriod: number,
  modelid:number,
  isMulti?:boolean,
  isDebit?:boolean,
  currency:string
}
export  interface IJournalProps {
  article: string,
  store:string,
  fromPeriod:number,
  toPeriod: number,
  modelid:number,
  currency:string
}
export interface LoginProps {
   languages: {id:string, name:string}[]
  , companies: {id:string, name:string}[]
  , current:ILoggingContext
  , t:TFunction<'translation', undefined>, profile:IProfile
  , i18n:typeof I18n
  , setProfile:(p:IProfile)=>void //Dispatch<SetStateAction<IProfile>>
  , submit:(event: any) =>void
  , handleEvent:(event:any, value: ILoggingContext) =>void
}


