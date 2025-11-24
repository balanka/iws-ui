import {
  IAccount,
  IAddress,
  IArticle, IAsset, IBankAccount, IBankStatement, IBankStatementParam, IBusinespartner, ICompany,
  ICustomer,
  IEmployee, IFinancials, ILineFinancials, ILineTransaction,
  IMasterfile,
  IMasterfile2, IRole,
  IStore,
  ISupplier, ITransaction, IUser,
  IVat, IWSLine, IWSTransaction
} from "./Models.ts";
import {TFunction} from "i18next";
import React, {CSSProperties, Dispatch} from "react";
import {GridReadyEvent} from "ag-grid-community";
// @ts-ignore
import type {RowSelectedEvent} from "ag-grid-community/dist/types/src/events";

import {AgGridReact} from "ag-grid-react";
import {NavigateFunction} from "react-router-dom";


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
  , locale: string
  , currency: string
  , t: TFunction<'transalation', undefined>
  , disable: boolean
  , height?: number
  , zIndex:number
}

export interface ArticleGeneralFormProps {
    current: IArticle
    , setCurrent: (art: IArticle) => void
    , quantityUnitData:IMasterfile[]
    , groupData:IMasterfile[]
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

export interface FinancialsDetailsTabProps {
    transaction: IFinancials,
    setTransaction:(arg:IFinancials)=>void
    currentLineFinancials:ILineFinancials,
    setCurrentLineFinancials:(arg:ILineFinancials) =>void,
    accData: IAccount[],
    t: TFunction<'transalation', undefined>,
    zIndex:number,
    onGridReady:(params: GridReadyEvent)=>void,
    gridRef?:React.RefObject<AgGridReact>
}

export interface FinancialsDetailsFormProps {
    transaction: IFinancials,
    setTransaction:(arg:IFinancials)=>void
    currentLineFinancials:ILineFinancials,
    setCurrentLineFinancials:(arg:ILineFinancials) =>void,
    accData: IAccount[],
    t: TFunction<'transalation', undefined>,
    disable: boolean,
    height?: number,
    zIndex:number,
}

export interface TransactionDetailsTabProps {
    transaction: ITransaction,
    setTransaction:(arg:ITransaction)=>void,
    currentLineTransaction:ILineTransaction,
    setCurrentLineTransaction:(arg:ILineTransaction) =>void,
    articleData: IArticle[],
    vatData: IVat[],
    t: TFunction<'transalation', undefined>,
    onGridReady:(params: GridReadyEvent)=>void,
    //gridApi:GridApi,
    //gridRef?:React.RefObject<AgGridReact>,
    zIndex:number,
}

export interface TransactionDetailsFormProps {
    transaction: ITransaction,
    setTransaction:(arg:ITransaction)=>void
    currentLineTransaction: ILineTransaction,
    setCurrentLineTransaction: (line: ILineTransaction) => void,
    articleData: IArticle[],
    vatData: IVat[],
    t: TFunction<'transalation', undefined>,
    disable: boolean,
    height?: number
}


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
  , buildTotal:(arg:A)=>Number, formatLines: (arg:L) => L
  , submitPrintPreview:(arg:A, templateName: () =>string, buildTotal:(arg:A)=>Number, formatLines: (arg:L) => L ) =>Promise<void>
  , toggle:()=>void, submitPost:(arg:any)=>void,  reload:()=>void
  , handleLanguageChange: (arg:any)=>void
  , navigate:NavigateFunction, language:string, dispatch:Dispatch<any>
  , logout:(navigate:NavigateFunction) =>void
  , current:IFinancials|ITransaction
}



