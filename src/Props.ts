import {
  IAccount,
  IAddress,
  IArticle, IAsset, IBankAccount, IBankStatement, IBusinespartner, ICompany,
  ICustomer,
  IEmployee, IFinancials, IFmodule, ILineFinancials, ILineTransaction, ILoggingContext,
  IMasterfile,
  IMasterfile2, IContact, IProfile, IRole,
  IStore,
  ISupplier, ITransaction, IUser,
  IVat, IWSLine, IWSModel, IWSTransaction, type IRealEstate, IPermission
} from "./Models.ts";
import {type i18n, TFunction} from "i18next";
import React, {CSSProperties, Dispatch, ReactNode, SetStateAction} from "react";
import {ColDef, GridApi, GridOptions, GridReadyEvent} from "ag-grid-community";
// @ts-expect-error -- legacy, see TODO
import type {RowSelectedEvent} from "ag-grid-community/dist/types/src/events";
import {NavigateFunction} from "react-router-dom";
import './i18n.tsx'
import I18n from "./i18n.tsx";

export interface FormStyles {
  outer: CSSProperties
  outer0: CSSProperties
  inner: CSSProperties
  inner2: CSSProperties
  // add any others that exist in BasicTreeTableProps.tsx
}
export interface AddressProps {
    current: IAddress,
    setCurrent: Dispatch<SetStateAction<ICustomer>>| Dispatch<SetStateAction<ISupplier>>|
      Dispatch<SetStateAction<IEmployee>>|Dispatch<SetStateAction<ICompany>>|Dispatch<SetStateAction<IContact>>
      |Dispatch<SetStateAction<IMasterfile>>,
    t: TFunction<'transalation', undefined>,
    disable: boolean,
    height: number
}
export interface SaveProps <A> {fileNames:[string, string], sheetName:string, data: A[]}
//export interface printDocProps<A>  { e:any, templateFileName:string, data:A}
export interface BankAccountFormProps {
     currentBankAccount: IBankAccount
    , setCurrentBankAccount: (arg:IBankAccount)=>void
    , businessPartner:ICustomer|ISupplier|IEmployee|ICompany
    , setBusinessPartner: Dispatch<SetStateAction<ICustomer>>|Dispatch<SetStateAction<ISupplier>>|
    Dispatch<SetStateAction<IEmployee>>| Dispatch<SetStateAction<ICompany>>
    , bankData: IMasterfile[]
    , t:TFunction<'transalation', undefined>
    , zIndex:number
    , disable: boolean
    , height?: number}

export interface CustomerTabProps {
  collapse:boolean
    , current: ICustomer | ISupplier | IEmployee
    , setCurrent: Dispatch<SetStateAction<ICustomer | ISupplier | IEmployee>>
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
    , contactData: IContact[]
    , height: number
    , disable: boolean
    , zIndex:number
    , onGridReady:(params: GridReadyEvent)=>void
}
export interface CompanyTabProps {
     collapse:boolean
    ,  current: ICompany
    , setCurrent: Dispatch<SetStateAction<ICompany>>
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
   , contactData: IContact[]
    , height: number
    , disable: boolean
    , zIndex:number
    , onGridReady:(params: GridReadyEvent)=>void
}
export interface ArticleAcccountProps {
    current: IArticle
  , setCurrent: (art: IArticle) => void
  , accData: IAccount[]
  , vatData: IVat[]
  , t: TFunction<'transalation', undefined>
  , disable: boolean
  , height: number
}

export interface ArticleProps {
    collapse:boolean
  , current: IArticle
  , setCurrent: (art: IArticle) => void
  , accData: IAccount[]
  , vatData: IVat[]
  , data:IArticle[]
  , quantityUnitData:IMasterfile[]
  , groupData:IMasterfile[]
  , ccyData:IMasterfile[]
  , locale: string
  , currency: string
  , t: TFunction<'transalation', undefined>
  , disable: boolean
  , height: number
  , zIndex:number
}

export interface ArticleGeneralFormProps {
     collapse:boolean
    , current: IArticle
    , setCurrent: (art: IArticle) => void
    , quantityUnitData:IMasterfile[]
    , groupData:IMasterfile[]
    , ccyData:IMasterfile[]
    , t: TFunction<'transalation', undefined>
    , disable: boolean
    , height:number
    , currency:string
    , locale:string


}
export interface CustomerAccountMainFormProps {
  readonly current: IArticle | ICustomer | ISupplier | IEmployee | ICompany|IStore
  readonly setCurrent:  Dispatch<SetStateAction<ICustomer>>|Dispatch<SetStateAction<ISupplier>>|
    Dispatch<SetStateAction<IEmployee>> |Dispatch<SetStateAction<ICompany>>|Dispatch<SetStateAction<IArticle>>
  |Dispatch<SetStateAction<IStore>>;
  readonly accData: IAccount[];
  readonly vatData: IVat[];
  readonly ccData?: IMasterfile[];
  readonly t: TFunction<'translation', undefined>;
  readonly disable: boolean;
  readonly height: number;
  readonly zIndex: number;
}
export interface AssetProps {
    collapse:boolean
    , current: IAsset
    , setCurrent: |Dispatch<SetStateAction<IAsset>>
    , accData: IAccount[]
    , ccyData: IMasterfile[]
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
    setCurrent: (arg: IBankStatement) => void,
    t: TFunction<'transalation', undefined>,
    locale: string,
    currency: string,
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

export interface MasterfileProps2<A extends IMasterfile|IMasterfile2|IStore>{
    collapse:boolean,
    current: A,
    setCurrent:  Dispatch<SetStateAction<IMasterfile>>| Dispatch<SetStateAction<IMasterfile2>> |
      Dispatch<SetStateAction<IStore>>| Dispatch<SetStateAction<IBusinespartner>>|
      Dispatch<SetStateAction<IRealEstate>>|Dispatch<SetStateAction<IRole>>
      |Dispatch<SetStateAction<IPermission>> |Dispatch<SetStateAction<IContact>>,
    accData: IMasterfile[],
    t: TFunction<'translation', undefined>,
    disable: boolean,
    height: number,
    propertyName:string,
   fieldName:string
}
export interface FModuleProps2<A extends IMasterfile2>{
  collapse:boolean,
  current: A,
  setCurrent: Dispatch<SetStateAction<IFmodule>>,
  accData: IMasterfile[],
  accountData: IMasterfile[],
  rowData: A[],
  t: TFunction<'translation', undefined>,
  disable: boolean,
  height: number
}

export interface MasterfileProps<A extends IMasterfile> {
  collapse: boolean,
  current: A,
  setCurrent: Dispatch<SetStateAction<IMasterfile>>|Dispatch<SetStateAction<IBusinespartner>>
    |Dispatch<SetStateAction<IContact>>,
  t: TFunction<'translation', undefined>,
  disable: boolean,
  height: number
}

export interface RoleProps {
    collapse: boolean,
    current: IRole,
    setCurrent: Dispatch<SetStateAction<IRole>>,
    t: TFunction<'translation', undefined>,
    disable: boolean,
    height: number
}

export interface StoreGeneralFormProps {
     collapse: boolean
    , current: IStore
    , setCurrent:Dispatch<SetStateAction<IStore>>
    , accData: IAccount[]
    , locale: string
    , t: TFunction<'transalation', undefined>
    , disable: boolean
    , height: number
}
export interface StoreProps {
      collapse: boolean
    , current: IStore
    , setCurrent: Dispatch<SetStateAction<IStore>>
    , ccData: IMasterfile[]
    , accData: IAccount[]
    , locale: string
    , currency: string
    , t: TFunction<'transalation', undefined>
    , zIndex:number
    , disable: boolean
    , height: number
    , minMaxHieght:number
}
 export interface CustomerGeneralFormProps<P extends IBusinespartner = IBusinespartner> {
     collapse: boolean,
     current: P,
     setCurrent: Dispatch<SetStateAction<P>>,
     ccyData: IMasterfile[],
     contactData: IContact[],
     disable: boolean,
     t: TFunction<'transalation', undefined>,
     height: number
   }

export type ILine = ILineTransaction|ILineFinancials


export interface TransactionDetailsTabProps<T extends ITransaction, L extends ILineTransaction> {
  collapseTable: boolean;
  transaction: T;
  setTransaction: Dispatch<SetStateAction<T>>;
  currentLineTransaction: L;
  setCurrentLineTransaction: Dispatch<SetStateAction<L>>;
  accountFilter: string[];
  oaccountFilter: string[];
  articleData: IArticle[];
  vatData: IVat[];
  t: (key: string) => string;
  onGridReady?: (params: GridReadyEvent) => void;
  zIndex?: number;
  locale: string;
  currency: string;
}


export interface TransactionDetailsFormProps<T extends IWSTransaction<L>, L extends  ILine> {
    transaction: T,
    setTransaction:Dispatch<SetStateAction<T>>
    currentLineTransaction: L,
    setCurrentLineTransaction: Dispatch<SetStateAction<L>>,
    accountFilter:string[],
    oaccountFilter:string[],
    articleData: IArticle[],
    vatData: IVat[],
    t: TFunction<'transalation', undefined>,
    disable: boolean,
    height?: number,
    locale:string,
     currency:string
}

export interface FinancialsCBoxProps3<A, B, L> {
  current: A,
  setCurrent: (arg: A) => void,
  currentLine: L,
  setCurrentLine: (arg: L) => void,
  data: B[],
  id:string,
  name:string,
  defaultValue:B
  accFilter?:string[],
  zIndex: number,
  styles: FormStyles
}
export interface FinancialsCBoxProps2<A, B> {
  current: A,
  setCurrent: Dispatch<SetStateAction<A>>,
  data: B[],
  fieldName:string,
  defaultValue:B
  accFilter?:string[],
  zIndex: number,
  styles: React.CSSProperties,
  height?: number
}


export interface UserFormProps { collapse: boolean, current:IUser, setCurrent:(arg:IUser)=>void
    , t:TFunction<'translation', undefined>, disable:boolean, height:number
}
export  interface TransactionToolBarProps<A extends IWSTransaction<L>, L extends  IWSLine>{
  title:string
  , saveProps:SaveProps <L>, collapse:boolean
  , initAdd:()=>void, onNewLine:()=>void, onDeleteLine:(arg:L)=>void
  , submitCancel:(e:any)=>void, submitEdit: (arg:A)=>void
  , getData:()=>any
  , getData2 :()=> Promise<any>
  , fmodule:IFmodule[]
  , submitPrintPreview:(current:A, getData:()=>any,  fmodule:IFmodule[], enumId:number) =>Promise<void>
  , template1EnumId:number,  template2EnumId:number
  , toggle:()=>void, toggleTable:()=>void, submitPost:(arg:any)=>void,  reload:()=>void
  , handleLanguageChange: (arg:any)=>void
  , navigate:NavigateFunction, language:string, dispatch:Dispatch<any>
  , logout:(navigate:NavigateFunction) =>void
  , current:IFinancials|ITransaction
  , t:TFunction<'translation', undefined>
  , zIndex:number
  , fileInputProps:FileInputProps<any>
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
  , fmodule:IFmodule[]
  , template1EnumId:number
  //, template2EnumId:number
  , getData: ()=>any
  , submitPrintPreview:(current:A,  getData:()=>any, fmodule:IFmodule[], template1EnumId:number) =>Promise<void>
  , language:string
  , handleLanguageChange:(language:any)=>void
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
  , toggleTable:()=>void
  , modelid : number
  , company:string
  , module_:any
}
export interface State {collapseForm: boolean, collapseTable:boolean,  fadeIn: boolean, timeout:  300}

export interface UseCustomerFormResult<T extends IBusinespartner> {
  header: ReactNode
  , body:React.JSX.Element|null
  , table:ReactNode
  , disable:boolean
  , visible:boolean
  , state:State
  ,  rowData:T[]
  , setRowData:Dispatch<SetStateAction<T[]>>
  , current:T
  , setCurrent:Dispatch<SetStateAction<T>>
  , currentBankAccount:IBankAccount
  , setCurrentBankAccount:Dispatch<SetStateAction<IBankAccount>>
  , setGridApi:Dispatch<SetStateAction<GridApi<any>|undefined>>
}

export interface UseTransactionFormResult<T extends IWSTransaction<L>, L extends  IWSLine> {
    language:string
  , fmodule:IFmodule[]
  , setFmodule:Dispatch<SetStateAction<IFmodule[]>>
  , current:T
  , setCurrent:Dispatch<SetStateAction<T>>
  , initAdd:()=>void
  , reload:()=>void
  , submitEdit: (event: any) => void
  , onRowSelected: (event: RowSelectedEvent) => void
  , onNewLine:()=>void
  , copyFromTransaction:T[]
  , setCopyFromTransaction:Dispatch<SetStateAction<T[]>>
  , onDeleteLine:(arg:any) =>void
  , submitCancel:(event:any) =>void
  , submitPost:(event:any)=>void
  , copyCall:(arg:bigint, modelid:any)=>Promise<void>
  , setGridApi:Dispatch<SetStateAction<GridApi<any>|undefined>>
  , templateName:(current:T, fmodule:IFmodule[])=>[string, string]
  , zIndex:number
  , handleLanguageChange:(event:any) =>void
  , saveProps:SaveProps <L>
  , modelid:number
  , isFetching:boolean
  , setIsFetching:Dispatch<SetStateAction<boolean>>
  , gridOptions:(
    columnDefs: (t: TFunction<'transalation', undefined>, locale: string, currency: string) => ColDef[]
    , locale: string
    , currency: string
    , lineColumnDefs: (t: TFunction<'transalation', undefined>, locale: string, currency: string) => ColDef[]
    , t: TFunction<'transalation', undefined>
  ) => GridOptions<T>
}
export interface UseJFormResult<T> {
  profile: IProfile
  , menu: Map<any, any>
  , selected: string
  , t:TFunction<'translation', undefined>
  , accData:IAccount[]
  , rowData:T[]
  , fmodule:IFmodule[]
  , setRowData:Dispatch<SetStateAction<T[]>>
  , current_:JournalProps
  , current:JournalProps
  , setCurrent:Dispatch<SetStateAction<JournalProps>>
  , submitQuery: (event: any, current: JournalProps) => void
  , submitQuery2: (event: any, current: JournalProps) => void
  , onRowSelected: (event: RowSelectedEvent) => void
  //, templateName: ()=>[string, string]
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
  , fmodule:IFmodule[]
  , setRowData:Dispatch<SetStateAction<T[]>>
  , current_:IJournalProps
  , current:IJournalProps
  , setCurrent:Dispatch<SetStateAction<IJournalProps>>
  , submitQuery: (event: any, current: IJournalProps) => void
  , onRowSelected: (event: RowSelectedEvent) => void
  , title:string
  , styles:any
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
export enum TEMPLATE_ENUM {
  FIRST = 0,
  SECOND = 1,
}
export interface FileInputProps<T extends (IAccount|ICustomer|ISupplier)> {
  company: string;
  currency: string;
  masterfiles: T[];
  onImportComplete?: (data: any[]) => void; // optional callback
}
