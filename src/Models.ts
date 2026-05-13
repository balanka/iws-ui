export interface IAccount  extends IMasterfile{
  account:string,
  isDebit:boolean,
  balancesheet:boolean,
  idebit: number,
  icredit: number,
  debit: number,
  credit: number,
  currency: string,
  subAccounts: IAccount[]
}

export type IAccount2 = Omit<IAccount, "subAccounts">;
export interface  IWSModel {
  id:string|bigint,
  modelid: number,
  company:string
}
export interface  IWSTransaction <L extends IWSLine>extends IWSModel {
  id1:string|bigint,
  transdate: Date,
  postingdate:Date,
  enterdate:Date,
  period: number,
  posted: boolean,
  text: string,
  footText: string,
  lines: L []
}
export interface IMasterfile  extends IWSModel {
  name:string,
  description:string,
  enterdate: Date,
  changedate: Date,
  postingdate: Date
}
export interface IPermission  extends IMasterfile {
    short:string,
}

export interface IMasterfile2  extends IMasterfile {
  parent:string
}
export interface IMasterfile3  extends IMasterfile {
  account:string
}
export interface IFmodule  extends IMasterfile2  {
  account:string,
  isDebit:boolean,
  copyFrom:string,
  accFilter:string,
  oaccFilter:string
}
export interface IAsset  extends IMasterfile  {
  account: string,
  oaccount:string,
  scrapValue: number,
  lifeSpan:number,
  depMethod:number,
  rate:number,
  frequency:number,
  currency:string,
  amount:number
}
export interface IBankStatementParam { path: string, header: string,char: string,extension: string }
export interface IPayrollTaxRange { id: string, fromAmount: number,toAmount: number, tax:number, taxClass: string
  , modelid: number, company: string
}
export interface IStockAccount   { account: string, oaccount: string, accountName?: string, oaccountName?: string}

export interface IArticle  extends IMasterfile, IStockAccount {
  parent: string, sprice:number, pprice:number, avgPrice:number, currency:string, stocked: boolean
  , quantityUnit: string, packUnit: string, vatCode: string
  ,  revenueAccount:string
  , stocks:IStock[]
  , bom:IBom[]
}

export type HttpMethod = 'PATCH' | 'POST' | 'PUT' | 'GET'
export interface IJournal {
  id:bigint,
  transid:bigint,
  oid:string,
  account: string,
  oaccount: string,
  transdate: Date,
  postingdate:Date,
  enterdate:Date,
  period: number,
  amount: number,
  idebit: number,
  debit: number,
  icredit: number,
  credit: number,
  bdebit?: number,
  bcredit?: number,
  currency: string,
  side: boolean,
  text: string,
  month: number,
  year: number,
  company: string,
  typeJournal:number,
  file_content: string,
  modelid: number,
}

export interface InventoryJournal {
    id:bigint,
    id1:bigint,
    transid:bigint,
    oid:string,
    store: string,
    account: string,
    article:String,
    quantity:number,
    unit:String,
    stock:number,
    wholeStock:number,
    price:number,
    avgPrice:number,
    currency:String,
    transdate: Date,
    postingdate:Date,
    enterdate:Date,
    period: number,
    side: boolean,
    text: string,
    month: number,
    year: number,
    company: string,
    modelid: number,
  }
export interface IAddress {
  street:string,
  zip:string,
  city:string,
  state:string,
  country:string,
  phone:string,
  email:string,
  }
export interface IPartner  extends IMasterfile, IAddress {}

export interface IBusinespartner  extends IPartner, IStockAccount {
  taxCode: string,
  vatCode:string,
  currency?:string,
  bankaccounts:IBankAccount[]
}
export interface ICustomer  extends IBusinespartner {}
export interface ISupplier extends IBusinespartner {}
export interface IEmployee extends IBusinespartner {
  salary:number
}

export interface ICompany  extends IBusinespartner {
    bankAcc: string,
    purchasingClearingAcc?: string,
    salesClearingAcc?: string,
    paymentClearingAcc?:string,
    settlementClearingAcc?:string,
    balanceSheetAcc: string,
    incomeStmtAcc: string,
    cashAcc:string,
    //stockAcc:string
    //expenseAcc:string
    //revenueAcc:string
    currency: string,
    pageHeaderText: string,
    pageFooterText: string,
    headerText: string,
    footerText: string,
    logoContent: string,
    logoName: string,
    contentType:string,
    partner: string,
    fax: string,
    locale: string,
}

export interface IBankAccount  extends IWSModel {
  owner:string,
  bic:string,
}
export interface IBankStatement extends IWSModel {
  id:bigint,
  depositor:string, postingdate:Date, valuedate:Date, postingtext:string, purpose: string, beneficiary:string
  , accountno:string, bankCode:string, amount:number, currency:string, info:string, company:string, companyIban:string
  , posted:boolean,  period:number, path:string, header:string, char:string, extension:string
}
export interface IStore extends IMasterfile, IStockAccount { costcenter:string, stocks:IStock[] }
export interface IModule extends IMasterfile {
  parent:string,
  path:string,
}
export interface IPeriodicAccountBalance extends IWSModel {
 account:string,  period:number, idebit:number, icredit:number, debit:number, credit:number
    , bdebit:number, bcredit:number, balance:number,  currency:string,  name:string
}
export interface IPeriodicAccountBalance2 extends IWSModel {
    account:string,  period:number, idebit:string, icredit:string, debit:string, credit:string
   , bdebit:string, bcredit:string, balance:string,  currency:string,  name:string
}
export interface  IWSLine  {
  id: bigint,
  transid: string|bigint,
  currency: string,
  duedate: Date,
  text: string,
  company: string
}
export interface ILineTransaction extends IWSLine {
  article: string,
  articleName: string,
  quantity: number,
  unit: string,
  price: number,
  vatCode: string,
  vat: number,
  net:  number,
  total:  number,
}
export interface ITransaction extends IWSTransaction<ILineTransaction> {
  oid: bigint,
  id1: bigint,
  store: string,
  account: string,
  lines: ILineTransaction[],
  vat:number,
  net:number,
  total:number
}
export interface IStock {
  article:string,
  store:string,
  quantity:number,
  price: number,
  charge:string
  unit:string,
  amount?:number,
}
export interface IBom {id:string, parent:string, quantity:number, description:string, company:string, modelid: number}

export interface ILineFinancials extends IWSLine {
  account: string,
  accountName: string,
  side: boolean,
  oaccount: string,
  oaccountName: string,
  amount: number,
}
export interface IFinancials extends  IWSTransaction<ILineFinancials> {
  oid:bigint,
  id1:bigint,
  costcenter: string,
  account: string,
  typeJournal?: number,
  fileContent?: number,
  lines: ILineFinancials [],
  //total ():number
}

export interface ISalaryItem extends IMasterfile3 {
  amount: number,
  currency:string,
  percentage: number,
}
  export interface IUserRight { moduleid:number, roleid:number, short:string, company:string, modelid:number }

export interface IRole extends IMasterfile { rights:IUserRight[] }

export interface IUser extends IWSModel {
  userName: string,
  firstName: string,
  lastName: string,
  hash: string,
  phone: string,
  email: string,
  department: string,
  menu: string ,
  company: string,
  modelid: number,
  roles:IRole[],
  locale: string,
  rights:IUserRight[],
  modules:number[]
}
export interface IVat extends IMasterfile {
  percent:number,
  inputVatAccount:string,
  outputVatAccount:string
}
export interface IProfile {
  token: string, company: string, currency?:string, locale?:string, language?: string, incomeStmtAcc?: string
  , stockAcc?: string, expenseAcc?: string, revenueAcc?: string,  vat?: string, modules?: any[], roles?: any[]
  , rights?: any[], error?: string,
}
export interface IRoom extends IMasterfile2 { kind:number, area:number}
export interface IApartment extends IMasterfile2 {rooms:IRoom[]}
export interface IFloor extends IMasterfile {apartments:IApartment[]}
export interface IRealEstate extends IMasterfile {apartments:IApartment[], floors:IFloor[]}

export interface ISTORE_Return {
  profile:IProfile, selected: string, menu: Map<any,any>, routes: string, module:string,
  setProfile: (p: IProfile) => void,
  setSelected: (s: string) => void,
  setMenu: (m: Map<any,any>) => void,
  setModule: (module_ : any) => void,
  setRoutes: (r: any) => void
}
export interface ILoggingContext {
  userName: string,
  password: string,
  company:  string,
  language: string,
}
export type DefaultColDefType = {
  resizable: boolean,
  editable: boolean,
  filter: string,
}
export type TransactionType = "IFinancials" | "ITransaction"
export const statuses = {
  all: "All",
  active: "Active",
  paused: "On Hold",
  outOfStock: "Out of Stock",
}
export type Status = keyof typeof statuses



