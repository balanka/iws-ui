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
    IVat
} from "./Models.ts";
import {TFunction} from "i18next";
import React from "react";
import {GridReadyEvent} from "ag-grid-community";
// @ts-ignore
import type {RowSelectedEvent} from "ag-grid-community/dist/types/src/events";

import {AgGridReact} from "ag-grid-react";


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
    formid: number
    , current: ICustomer | ISupplier | IEmployee
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
}
export interface CompanyTabProps {
    formid: number
    , current: ICompany
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

export interface AccountMainProps {
    current: IAccount,
    setCurrent: (arg: IAccount) => void,
    accData: IAccount[],
    t: TFunction<'transalation', undefined>,
    locale: string,
    disable: boolean,
    height: number
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

export interface MasterfileProps2 {
    collapse:boolean
    current: IMasterfile2,
    setCurrent: (arg: IMasterfile2) => void,
    accData: IMasterfile[],
    t: TFunction<'translation', undefined>,
    disable: boolean,
    height: number
}
export interface MasterfileProps<A> {
    collapse: boolean,
    current: A,
    setCurrent: (arg: A) => void,
    t: TFunction<'translation', undefined>,
    disable: boolean,
    height: number
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
      current: IStore
    , setCurrent: (art: any | IStore) => void
    , accData: IAccount[]
    , locale: string
    , t: TFunction<'transalation', undefined>
    , disable: boolean
    , height?: number
}
export interface StoreProps {
    current: IStore
    , setCurrent: (art: any | IStore) => void
    , accData: IAccount[]
    , locale: string
    , t: TFunction<'transalation', undefined>
    , zIndex:number
    , disable: boolean
    , height?: number
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
}
export interface FinancialsCBoxProps<A, B> {
  current: A,
  setCurrent: (arg: A) => void,
  data: B[],
  zIndex: number,
  styles: any
}

export interface UserFormProps { collapse: boolean, current:IUser, setCurrent:(arg:IUser)=>void
    , t:TFunction<'translation', undefined>, disable:boolean, height:number
}



