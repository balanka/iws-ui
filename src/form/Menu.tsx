import { formEnum } from '../utils/FormEnum'
import { create } from 'zustand'
import {
  IAccount, IArticle, IAsset, IBankAccount, IBankStatement, ICompany,
  ICustomer,
  IEmployee, IFinancials,
  IFmodule, ILineFinancials, ILineTransaction, ILoggingContext, IMasterfile, IMasterfile2,
  IProfile, IStore,
  ISTORE_Return,
  ISupplier, ITransaction
} from '../Models'
import {IJournalProps} from "../Props.ts";


export const getCurrentMonth = (date:Date) => {
  const p = date.getUTCMonth() + 1
  return p <= 10 ? '0'.concat(p.toString()) : p.toString()
}

export const date = new Date().toISOString()
export const getPeriod = (date:Date) => parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))

export const loginInit:ILoggingContext[] = [
  {
    userName: '',
    password: '',
    company: '',
    language: 'en',
  },
]
export const initAcc:IAccount[] = [
  {
    id: '9',
    name: '',
    description: '',
    enterdate: new Date(),
    postingdate: new Date(),
    changedate: new Date(),
    company: '',
    modelid: 9,
    account: '-1',
    isDebit: false,
    balancesheet: false,
    currency: '',
    idebit: 0.0,
    icredit: 0.0,
    debit: 0.0,
    credit: 0.0,
    subAccounts:[]
  },
]
export const initArticle:IArticle[] = [
  {
    id: '*',
    name: '*',
    description: '',
    parent: '',
    sprice: 0,
    pprice: 0,
    avgPrice: 0,
    currency: '',
    stocked: true,
    quantityUnit: '',
    packUnit: '',
    account: '',
    oaccount: '',
    vatCode: '',
    company: '',
    modelid: 34,
    enterdate: new Date(),
    changedate: new Date(),
    postingdate: new Date(),
    stocks: [
      {
        article: '',
        store: '',
        quantity: 0.0,
        unit: '',
        price: 0.0,
        amount: 0.0,
        charge: '',
      },
    ],
  },
]
export const initAsset:IAsset[] = [
  {
    id: '',
    name: '',
    description: '',
    enterdate: new Date(),
    postingdate: new Date(),
    changedate: new Date(),
    company: '',
    modelid: 19,
    account: '',
    oaccount: '',
    scrapValue: 1.0,
    lifeSpan: 1,
    depMethod: 1,
    amount: 0.0,
    rate: 0.0,
    frequency: 1,
    currency: '',
  },
]

export const initBank = [
  {
    id: '',
    name: '',
    description: '',
    enterdate: date,
    postingdate: date,
    changedate: date,
    modelid: 11,
    parent: '-1',
    company: '',
  },
]
export const initCurrency:IMasterfile2[] = [
  {
    id: '',
    name: '',
    description: '',
    enterdate: new Date(),
    postingdate: new Date(),
    changedate: new Date(),
    modelid: 99,
    parent: '-1',
    company: '',
  },
]
export const initQuantity:IMasterfile[] = [
  {
    id: '',
    name: '',
    description: '',
    enterdate: new Date(),
    postingdate: new Date(),
    changedate: new Date(),
    modelid: 15,
    company: '',
  },
]
export const initStore:IStore[] = [
  {
    id: '*',
    name: '*',
    description: '',
    enterdate: new Date(),
    postingdate: new Date(),
    changedate: new Date(),
    modelid: 35,
    costcenter:'',
    account: '-1',
    oaccount: '-1',
    company: '',
    stocks: [
      {
        article: '',
        store: '',
        quantity: 0.0,
        unit: '',
        price: 0.0,
        amount: 0.0,
        charge: '',
      },
    ],
  },
]
export const initCloseAccPeriod = [
  {
    id: '38',
    account: '',
    accountName: '',
    period: '',
    company: '',
  },
]
export const initCreatePayrollTransaction = [
  {
    id: '39',
    company: '',
  },
]
export const initCreateDepreciationTransaction = [
  {
    period: '',
    company: '',
  },
]
export const initModule = [
  {
    id: '400',
    name: '',
    description: '',
    path: '',
    parent: '-1',
    enterdate: date,
    postingdate: date,
    changedate: date,
    modelid: 400,
    company: '',
  },
]
export const initAccountClass = [
  {
    id: '',
    name: '',
    description: '',
    parent: '-1',
    enterdate: date,
    postingdate: date,
    changedate: date,
    company: '',
    modelid: 36,
  },
]
export const initAccountGroup = [
  {
    id: '',
    name: '',
    description: '',
    parent: '-1',
    enterdate: date,
    postingdate: date,
    changedate: date,
    company: '',
    modelid: 37,
  },
]
export const initArticleGroup:IMasterfile2 []  = [
  {
    id: '',
    name: '',
    description: '',
    parent: '-1',
    enterdate: new Date(),
    postingdate: new Date(),
    changedate: new Date(),
    company: '',
    modelid: 13,
  },
]
export const initCc:IMasterfile2 [] = [
  {
    id: '6',
    name: '',
    description: '',
    enterdate: new Date(),
    postingdate: new Date(),
    changedate: new Date(),
    modelid: 6,
    parent: '-1',
    company: '',
  },
]
export const initBankAccount:IBankAccount = { id: '', bic: '', owner: '', modelid: -1, company: ''}
export const initComp:ICompany[] = [
  {
    id: '',
    name: '',
    description: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    bankAcc: '',
    purchasingClearingAcc: '',
    salesClearingAcc: '',
    paymentClearingAcc: '',
    settlementClearingAcc: '',
    balanceSheetAcc: '',
    incomeStmtAcc: '',
    cashAcc: '',
    taxCode: '-1',
    vatCode: '-1',
    currency: '',
    enterdate: new Date(),
    postingdate: new Date(),
    changedate: new Date(),
    modelid: 10,
    pageHeaderText: '',
    pageFooterText: '',
    headerText: '',
    footerText: '',
    logoContent: '',
    logoName: '',
    contentType: '',
    partner: '',
    phone: '',
    fax: '',
    email: '',
    locale: 'de',
    company:'',
    account:'',
    oaccount:'',
    bankaccounts: [initBankAccount],
  },
]
export const initVat = [
  {
    id: '',
    name: '',
    description: '',
    percent: 0,
    inputVatAccount: '',
    outputVatAccount: '',
    enterdate: new Date(),
    postingdate: new Date(),
    changedate: new Date(),
    company: '',
    modelid: 14,
  },
]
export const initCust:ICustomer[] = [
  {
    id: '',
    name: '',
    description: '',
    street: '',
    zip: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
    account: '-1',
    oaccount: '-1',
    taxCode: '-1',
    vatCode: '-1',
    currency: '',
    company: '',
    modelid: 3,
    enterdate: new Date(),
    postingdate: new Date(),
    changedate: new Date(),
    bankaccounts: [initBankAccount],
  },
]
export const initSalaryItem = [
  {
    id: '-1',
    name: '',
    description: '',
    amount: 0,
    percentage: 0,
    account: '',
    enterdate: date,
    postingdate: date,
    changedate: date,
    modelid: 171,
    company: '',
  },
]
export const initPayrollTaxRange = [
  {
    id: '-1',
    fromAmount: 0,
    toAmount: 0,
    tax: 0,
    taxClass: '',
    modelid: 172,
    company: '',
  },
]
export const initEmp:IEmployee[] = [
      {
        id: '',
        name: '',
        description: '',
        street: '',
        zip: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        email: '',
        account: '-1',
        oaccount: '-1',
        taxCode: '-1',
        vatCode: '-1',
        company: '',
        salary: 0.0,
        modelid: 33,
        enterdate: new Date(),
        postingdate: new Date(),
        changedate: new Date(),
        bankaccounts: [initBankAccount],
    // salaryItem: [
    //   {
    //     id: '-1',
    //     owner: '-1x',
    //     account: '',
    //     amount: 0,
    //     text: '',
    //     company: '',
    //   },
    // ],
  },
]
export const initSup:ISupplier[] = [
  {
    id: '',
    name: '',
    description: '',
    street: '',
    zip: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
    account: '-1',
    //accountName: '',
    oaccount: '-1',
    //oaccountName: '',
    taxCode: '-1',
    vatCode: '-1',
    //vatName: '',
    currency: '',
    company: '',
    modelid: 1,
    enterdate: new Date(),
    postingdate: new Date(),
    changedate: new Date(),
    bankaccounts: [initBankAccount],
  },
]

export const initBS:IBankStatement[] = [
  {
    id: BigInt(-1),
    depositor: '',
    postingdate: new Date(),
    valuedate: new Date(),
    postingtext: '',
    purpose: '',
    beneficiary: '',
    accountno: '',
    bankCode: '',
    amount: 0,
    currency: '',
    info: '',
    company: '',
    companyIban: '',
    posted: false,
    modelid: 18,
    period: -1,
    path: '',
    header: '',
    char: '',
    extension: ''
  },
]
export const initLineFinancials:ILineFinancials = {
  id: BigInt(-1),
  transid: BigInt(-1),
  account: '',
  accountName: '',
  side: true,
  oaccount: '',
  oaccountName: '',
  amount: 0.0,
  duedate: new Date(),
  text: '',
  currency: 'EUR',
  company: '',
}
export const initFtr:IFinancials[] = [
  {
    id: BigInt(-1),
    oid: BigInt(-1),
    id1: BigInt(-1),
    costcenter: '',
    account: '',
    transdate: new Date(),
    enterdate: new Date(),
    postingdate: new Date(),
    period: getPeriod(new Date()),
    posted: false,
    modelid: 1300,
    company: '',
    text: '',
    typeJournal: 0,
    fileContent: 0,
    lines: [initLineFinancials]
  },
]
export const initLineTransaction:ILineTransaction =
    {
      id: BigInt(-1),
      transid: BigInt(-1),
      article: '',
      articleName: '',
      quantity: 0.0,
      unit: 'x',
      price: 0.0,
      currency: 'EUR',
      vatCode: '-1',
      vat: 0.0,
      net:0.0, //{return this.quantity*this.price},
      total:0.0,
      //get total () {return this.quantity*this.price+ this.vat},
      duedate: new Date(),
      text: '',
      company: '',
    }
export const initLtr:ITransaction[] = [
  {
    id: BigInt(-1),
    oid: BigInt(0),
    id1: BigInt(-1),
    store: '',
    account: '',
    transdate: new Date(),
    enterdate: new Date(),
    postingdate: new Date(),
    period: getPeriod(new Date()),
    posted: false,
    modelid: 1600,
    company: '',
    text: '',
    lines: [initLineTransaction],
    vat:0.0,
    net:0.0,
    total:0.0,
  },
]
export const PACB_JOURNAL_QUERY_PARM ={
  account: '',
  account2: '',
  fromPeriod:-1,
  toPeriod: -1,
  modelid:-1.
}
export const ARTICLE_ACCOUNT_QUERY_PARM:IJournalProps = {
  article: '',
  store: '',
  fromPeriod:-1,
  toPeriod: -1,
  modelid:-1,
  currency:''
}
export const initPac  = [
  {
    id: '',
    name: '',
    period: '',
    idebit: 0.0,
    icredit: 0.0,
    debit: 0.0,
    credit: 0.0,
    bdebit: 0.0,
    bcredit: 0.0,
    balance: 0.0,
    currency: '',
    company: '',
    modelid: 106,
    // query: {
    //   account: '',
    //   account2: '',
    //   fromPeriod: '',
    //   toPeriod: '',
    // },
  },
]

export const initRole = [
  {
    id: '121',
    name: '',
    description: '',
    enterdate: date,
    postingdate: date,
    changedate: date,
    modelid: 121,
    company: '',
    rights: [
      {
        moduleid: '',
        roleid: -1,
        short: '',
        company: '',
        modelid: 151,
      },
    ],
  },
]
export const initUser = [
  {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    hash: '',
    phone: '',
    company: '',
    id: 0,
    roles: [{ ...initRole }],
    modelid: 111,
    menu: '',
    rights: [[]],
  },
]
export const initPermission = [
  {
    id: '141',
    name: '',
    description: '',
    enterdate: date,
    postingdate: date,
    changedate: date,
    modelid: 141,
    account: '-1',
    company: '',
  },
]
export const initfModule:IFmodule[] = [
  {
    id: '151',
    name: '',
    description: '',
    parent:'',
    copyFrom:-1,
    enterdate: new Date(),
    postingdate: new Date(),
    changedate: new Date(),
    modelid: 151,
    account: '-1',
    isDebit: false,
    company: '',
  },
]
export const MASTERFILE = {
  acc: '/acc',
  asset: '/asset',
  article: '/art',
  articleGroup: '/articleGroup',
  bank: '/bank',
  cc: '/cc',
  module: '/module',
  fmodule: '/fmodule',
  login: '/login',
  role: '/role',
  perm: '/perm',
  vat: '/vat',
  store: '/store',
  qty: '/qty',
  cust: '/cust',
  emp: '/emp',
  sup: '/sup',
  comp: '/comp',
  ftr: '/ftr',
  ltr: '/ltr',
  bs: '/bs',
  pac: '/pac',
  currency: '/ccy',
  journal: '/journal',
  ijournal: '/ijournal',
  balancesheet: '/balance',
  user: '/user',
  salaryItem: '/s_item',
  payrollTaxRange: '/payrollTax',
  masterfile: '/mf',
  accountClass: '/class',
  accountGroup: '/group',
  closeAccountPeriod: '/close',
  createPayrollTransaction: '/ptr',
  createDepreciationTransaction: '/dtr',
}
export const LOGIN = (t: (arg0: string) => any) => ({
  id: '11111',
  name: 'Login',
  title: t('login.title'),
  ctx: '/users/login',
  modelid: formEnum.LOGIN,
  state: loginInit,
})
const SUPPLIER = {
  id: '1',
  name: 'Supplier',
  title: 'supplier.title',
  ctx: MASTERFILE.sup,
  state: initSup,
  modelid: formEnum.SUPPLIER,

}
export const CUSTOMER = {
  id: '3',
  name: 'Customer',
  title: 'customer.title',
  ctx: MASTERFILE.cust,
  state: initCust,
  modelid: formEnum.CUSTOMER,
}
export const EMPLOYEE = {
  id: '33',
  name: 'Employee',
  title: 'employee.title',
  ctx: MASTERFILE.emp,
  state: initEmp,
  modelid: formEnum.EMPLOYEE,
}
export const ARTICLE ={
  id: '34',
  name: 'Article',
  title: 'article.title',
  ctx: MASTERFILE.article,
  state: initArticle,
  state2: '',
  state3: '/art',
  modelid: formEnum.ARTICLE,
}
export const STORE = {
  id: '35',
  name: 'store',
  title: 'store.title',
  ctx: MASTERFILE.masterfile,
  state: initStore,
  state3: '/store',
  modelid: formEnum.STORE
}
export const ACCOUNT = {
  id: '9',
  name: 'Account',
  title: 'account.title',
  ctx: MASTERFILE.acc,
  state: initAcc,
  modelid: formEnum.ACCOUNT,
}
export const COSTCENTER ={
  id: '6',
  name: 'CostCenter',
  title: 'costcenter.title',
  ctx: MASTERFILE.masterfile,
  state: initCc,
  state2: '',
  state3: `${MASTERFILE.masterfile}/${formEnum.COSTCENTER}`,
  modelid: formEnum.COSTCENTER,
}
const COMPANY = {
  id: '10',
  name: 'Company',
  title: 'company.title',
  ctx: MASTERFILE.comp,
  modelid: formEnum.COMPANY,
}
export const ASSET = {
  id: '19',
  name: 'Asset',
  title: 'asset.title',
  ctx: MASTERFILE.asset,
  state: initAsset,
  state2: '',
  state3: '/asset',
  modelid: formEnum.ASSET
}
export const BANK = {
  id: '11',
  name: 'Bank',
  title: 'bank.title',
  ctx: MASTERFILE.masterfile,
  state: initBank,
  modelid: formEnum.BANK,
}
export const CURRENCY = {
  id: '99',
  name: 'Currency',
  title: 'ccy.title',
  ctx: MASTERFILE.masterfile,
  state: initCurrency,
  state3: '',
  modelid: formEnum.CURRENCY,
}
export const QUANTITYUNIT = {
  id: '15',
  name: 'Quantity unit',
  title: 'quantityUnit.title',
  ctx: MASTERFILE.masterfile,
  state: initQuantity,
  modelid: formEnum.QUANTITYUNIT,
}
export const SALARY_ITEM = {
  id: '171',
  name: 'Salary Item',
  title: 'salary.item.title',
  ctx: MASTERFILE.salaryItem,
  state: initSalaryItem,
  state3: '/s_item',
  modelid: formEnum.SALARY_ITEM,
}
export const MODULE = {
  id: '400',
  name: 'Module',
  title: 'module.title',
  ctx: MASTERFILE.module,
  state: initModule,
  state3: '/module/400',
  modelid: formEnum.MODULE,
}
export const ACCOUNT_CLASS = {
  id: '36',
  name: 'Account class',
  title: 'accountClass.title',
  ctx: MASTERFILE.masterfile,
  state: initAccountClass,
  state3: `${MASTERFILE.masterfile}/${formEnum.ACCOUNT_CLASS}`,
  modelid: formEnum.ACCOUNT_CLASS,
}
export const ACCOUNT_GROUP = {
  id: '37',
  name: 'Account group',
  title: 'accountGroup.title',
  ctx: MASTERFILE.masterfile,
  state: initAccountGroup,
  state2: '',
  state3:  `${MASTERFILE.masterfile}/${formEnum.ACCOUNT_GROUP}`,
  modelid: formEnum.ACCOUNT_GROUP
}
export const ARTICLE_GROUP = {
  id: '13',
  name: 'Article group',
  title: 'articleGroupe.title',
  ctx: MASTERFILE.masterfile,
  state: initArticleGroup,
  state2: '',
  state3: MASTERFILE.masterfile,
  modelid: formEnum.ARTICLE_GROUP,
}
export const CLOSE_ACCOUNT_PERIOD = {
  id: '38',
  name: 'Close Account period',
  title: 'closeAccountingPeriod.title',
  ctx: MASTERFILE.closeAccountPeriod,
  state3: MASTERFILE.closeAccountPeriod,
  modelid: formEnum.CLOSE_ACCOUNT_PERIOD,
}
export const CREATE_PAYROLL_TRANSACTION = {
  id: '39',
  name: 'Create Payroll transaction',
  title: 'createPayrollTransaction.title',
  ctx: MASTERFILE.createPayrollTransaction,
  state3: MASTERFILE.createPayrollTransaction,
  modelid: formEnum.CREATE_PAYROLL_TRANSACTION,
}
export const CREATE_DEPRECIATION_TRANSACTION ={
  id: '39',
  name: 'Create depreciation transaction',
  title: 'createDepreciationTransaction.title',
  ctx: MASTERFILE.createDepreciationTransaction,
  state3: MASTERFILE.createDepreciationTransaction,
  modelid: formEnum.CREATE_DEPRECIATION_TRANSACTION,
}
export const VAT = {
  id: '14',
  name: 'Vat',
  title: 'vat.title',
  ctx: MASTERFILE.vat,
  state: initVat,
  state3: '/vat',
  modelid: formEnum.VAT,
}
export const PAYROLL_TAX_RANGE = {
  id: '172',
  name: 'Payroll tax range',
  title: 'payroll.tax.range.title',
  ctx: MASTERFILE.payrollTaxRange,
  state: initPayrollTaxRange,
  state3: MASTERFILE.payrollTaxRange.concat("/").concat(formEnum.PAYROLL_TAX_RANGE.toString()),
  modelid: formEnum.PAYROLL_TAX_RANGE,
}
const BS ={
  id: '18',
  name: 'Bankstatement',
  title: 'bankstatement.title',
  ctx: MASTERFILE.bs,
  state: initBS,
  state3: MASTERFILE.bs,
  modelid: formEnum.BANKSTATEMENT,
  period: -1,
}
const PACB = {
  id: '106',
  name: 'PAC',
  title: 'pac.title',
  ctx: MASTERFILE.pac,
  state3: MASTERFILE.pac,
  modelid: formEnum.PACB,
}
const USER = {
  id: '111',
  name: 'User',
  title: 'user.title',
  ctx: MASTERFILE.user,
  modelid: formEnum.USER,
  state:initUser,
}
const JOURNAL = {
  id: '112',
  name: 'Journal',
  title: 'journal.title',
  ctx: MASTERFILE.journal,
  modelid: formEnum.JOURNAL,
}
const IJOURNAL = {
  id: '10010',
  name: 'IJournal',
  title: 'journal.title',
  ctx: MASTERFILE.ijournal,
  modelid: formEnum.IJOURNAL,
}
export const FINANCIALS = {
  id: '1300',
  name: 'Financials',
  title: 'financials.title',
  ctx: MASTERFILE.ftr,
  modelid: formEnum.FINANCIALS
}
export const TRANSACTION = {
  id: '1301',
  name: 'Transaction',
  title: 'transaction.title',
  ctx: MASTERFILE.ltr,
  state3: '',
  modelid: formEnum.TRANSACTION,
}
const BALANCESHEET = {
  id: '10012',
  name: 'Balancesheet',
  title: 'balancesheet.title',
  ctx: MASTERFILE.balancesheet,
  state: {
    account: '',
    account2: '',
    fromPeriod: '',
    toPeriod: '',
  },
  state1:initAcc,
  modelid: formEnum.BALANCESHEET,
}
export const ROLE = {
  id: '121',
  name: 'UserRole',
  title: 'role.title',
  ctx: MASTERFILE.role,
  state: initRole,
  state2: '',
  state3: '/role',
  modelid: formEnum.ROLE,
}
export const PERMISSION ={
  id: '141',
  name: 'Permission',
  title: 'permission.title',
  ctx: MASTERFILE.perm,
  state: initPermission,
  state2: '',
  state3: '/perm',
  modelid: formEnum.PERMISSION,
}

export const FMODULE = {
  id: '151',
  name: 'FModule',
  title: 'fmodule.title',
  ctx: MASTERFILE.fmodule,
  state: initfModule,
  state2: `${MASTERFILE.acc}/${formEnum.ACCOUNT}`,
  state3: `${MASTERFILE.module}/${formEnum.MODULE}`,
  modelid: formEnum.FMODULE,
}
export const LOGIN_MENU = (t: (arg0: string) => any) => [LOGIN(t)]

export const MENU = (t: { (arg0: string): any; (arg0: string): any; }) =>
  new Map([
    [MASTERFILE.article, ARTICLE],
    [MASTERFILE.articleGroup, ARTICLE_GROUP],
    [MASTERFILE.asset, ASSET],
    [MASTERFILE.journal, JOURNAL],
    [MASTERFILE.ijournal, IJOURNAL],
    [MASTERFILE.pac, PACB],
    [MASTERFILE.currency, CURRENCY],
    [MASTERFILE.bank, BANK],
    [MASTERFILE.qty, QUANTITYUNIT],
    [MASTERFILE.acc, ACCOUNT],
    [MASTERFILE.cc, COSTCENTER],
    [MASTERFILE.cust, CUSTOMER],
    [MASTERFILE.sup, SUPPLIER],
    [MASTERFILE.store, STORE],
    [MASTERFILE.accountClass, ACCOUNT_CLASS],
    [MASTERFILE.accountGroup, ACCOUNT_GROUP],
    [MASTERFILE.salaryItem, SALARY_ITEM],
    [MASTERFILE.payrollTaxRange, PAYROLL_TAX_RANGE],
    [MASTERFILE.vat, VAT],
    [MASTERFILE.user, USER],
    [MASTERFILE.role, ROLE],
    [MASTERFILE.perm, PERMISSION],
    [MASTERFILE.login, LOGIN(t)],
    ['/dashboard', LOGIN(t)],
    [MASTERFILE.comp, COMPANY],
    [MASTERFILE.bs, BS],
    ['/ftr', FINANCIALS],
    ['/ltr', TRANSACTION],
    [MASTERFILE.module, MODULE],
    [MASTERFILE.fmodule, FMODULE],
    [MASTERFILE.emp, EMPLOYEE],
    [MASTERFILE.balancesheet, BALANCESHEET],
    [MASTERFILE.closeAccountPeriod, CLOSE_ACCOUNT_PERIOD],
    [MASTERFILE.createPayrollTransaction, CREATE_PAYROLL_TRANSACTION],
    [
      MASTERFILE.createDepreciationTransaction,
      CREATE_DEPRECIATION_TRANSACTION,
    ],
  ])

export const useStore = create<ISTORE_Return>((set) => ({
  profile: {
    token: 'noTOkenXXX',
    company: '',
    locale: '',
    currency: '',
    language: '',
    incomeStmtAcc: '',
    modules: [],
    roles: [],
    rights: [],
    error: '',
  },
  selected: '',
  menu: new Map<any, any>(),
  routes: '',
  module: '',
  setProfile: (p: IProfile) => set(() => ({ profile: p })),
  setSelected: (s: string) => set(() => ({ selected: s })),
  setMenu: (m: Map<any, any>) => set(() => ({ menu: m })),
  setModule: (module_ : any) => set(() => ({ module: module_ })),
  setRoutes: (r: any) => set(() => ({ routes: r })),
}))

