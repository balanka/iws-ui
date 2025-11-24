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

export  interface  IPACBQueryParam {
  account: string,
  account2:string,
  fromPeriod:number,
  toPeriod: number,
  modelid:number,
  isMulti?:boolean,
  isDebit?:boolean,
}
export interface IEditing {
  editing:boolean
}
export interface  IWSModel {
  id:string|bigint,
  modelid: number,
  company:string
}
export interface  IWSTransaction <L extends IWSLine>extends IWSModel {
  transdate: Date,
  postingdate:Date,
  enterdate:Date,
  period: number,
  posted: boolean,
  text: string,
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
  //parent: string,
  account:string,
  isDebit:boolean,
  copyFrom:number,
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
  , quantityUnit: string, packUnit: string, vatCode: string, stocks:IStock[]
}

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
    text: number,
    month: number,
    year: number,
    company: string,
    typeJournal:number,
    file_content: string,
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
export interface IBusinespartner  extends IMasterfile, IAddress, IStockAccount {
  //email?:string,
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
  transid: bigint,
  //buldTotal:  ,
  currency: string,
  duedate: Date,
  text: string,
  company: string
}
export interface ILineTransaction extends IWSLine {
  //id: bigint,
  //transid: bigint,
  article: string,
  articleName: string,
  quantity: number,
  unit: string,
  price: number,
  //currency: string,
  vatCode: string,
  vat: number,
  net:  number,
  total:  number,
  //duedate: Date,
 // text: string,
  //company: string
}
export interface ITransaction extends IWSTransaction<ILineTransaction> {
  oid: bigint,
  id1: bigint,
  store: string,
  account: string,
  // transdate: Date,
  // enterdate: Date,
  // postingdate: Date,
  // period: number,
  // posted: boolean,
  // text: string,
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

export interface ILineFinancials extends IWSLine {
  account: string,
  accountName: string,
  side: boolean,
  oaccount: string,
  oaccountName: string,
  amount: number,
}

export interface IFinancials extends  IWSTransaction<ILineFinancials> {
  //id:bigint,
  oid:bigint,
  id1:bigint,
  costcenter: string,
  account: string,
 // transdate: Date,
  //enterdate: Date,
  //postingdate: Date,

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

export interface IUser  extends IWSModel {
  userName: string,
  firstName: string,
  lastName: string,
  email: string,
  hash: string,
  phone: string,
  menu: string,
  roles: IRole[],
  rights: IUserRight[],
}
export interface IVat extends IMasterfile {
  percent:number,
  inputVatAccount:string,
  outputVatAccount:string
}
export interface IProfile {
  token: string, company: string, currency?:string, locale?:string, language?: string, incomeStmtAcc?: string
  , modules?: any[], roles?: any[], rights?: any[], error?: string,
}

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



