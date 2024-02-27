import { formEnum } from '../utils/FORMS'
import {
  ColumnsACC,
  columnsPACB,
  ColumnJournal,
  ColumnsBalancesheet,
  ColumnsVAT,
  ColumnsBS,
  ColumnsM,
  ColumnsComp,
  ColumnsCUST,
  ColumnsUSER,
  ColumnsLOGIN,
  ColumnsModule,
  ColumnsAsset,
  ColumnsM2,
  ColumnsSalaryItem,
} from '../tables/LineFinancialsProps'

import create from 'zustand'
import React from 'react'

export const getCurrentMonth = (date) => {
  const p = date.getUTCMonth() + 1
  return p <= 10 ? '0'.concat(p.toString()) : p.toString()
}

export const date = new Date().toISOString()
export const getPeriod = (date) => {
  return parseInt(date.getUTCFullYear().toString().concat(getCurrentMonth(date)))
}
export const MASTERFILE = {
  acc: '/acc',
  asset: '/asset',
  article: '/art',
  bank: '/bank',
  cc: '/cc',
  module: '/module',
  fmodule: '/fmodule',
  role: '/role',
  perm: '/perm',
  vat: '/vat',
  store: '/store',
  cust: '/cust',
  emp: '/emp',
  sup: '/sup',
  comp: '/comp',
  ftr: '/ftr/model',
  bs: '/bs',
  pac: '/pac',
  jou: '/journal',
  balancesheet: '/balance',
  user: '/user',
  salaryItem: '/s_item',
  masterfile: '/mf',
  accountClass: '/class',
  accountGroup: '/group',
}
export const LOGIN = (t) => ({
  id: '11111',
  name: 'Login',
  title: t('login.title'),
  ctx: '/users/login',
  modelid: formEnum.LOGIN,
  state: loginInit,
  state1: '',
  state2: '',
  state3: '',
  columns: ColumnsLOGIN(),
})
const SUPPLIER = (t, locale, currency) => ({
  id: '1',
  name: 'Supplier',
  title: 'supplier.title',
  ctx: MASTERFILE.sup,
  state: initSup,
  state1: initAcc,
  state2: initVat,
  state3: initBank,
  modelid: formEnum.SUPPLIER,
  columns: ColumnsCUST(initAcc, t, locale, currency),
})
const CUSTOMER = (t, locale, currency) => ({
  id: '3',
  name: 'Customer',
  title: 'customer.title',
  ctx: MASTERFILE.cust,
  state: initCust,
  state1: initAcc,
  state2: initVat,
  state3: initBank,
  modelid: formEnum.CUSTOMER,
  columns: ColumnsCUST(initAcc, t, locale, currency),
})
const EMPLOYEE = (t, locale, currency) => ({
  id: '33',
  name: 'Employee',
  title: 'employee.title',
  ctx: MASTERFILE.emp,
  state: initEmp,
  state1: initAcc,
  state2: initVat,
  state3: initBank,
  modelid: formEnum.EMPLOYEE,
  columns: ColumnsCUST(initAcc, t, locale, currency),
})
export const COSTCENTER = (t, locale) => ({
  id: '6',
  name: 'CostCenter',
  title: 'costcenter.title',
  ctx: MASTERFILE.masterfile,
  state: initCC,
  state1: initAcc,
  state2: '',
  state3: '/mf',
  modelid: formEnum.COSTCENTER,
  columns: ColumnsM(initAcc, t, locale),
})
export const ARTICLE = (t, locale) => ({
  id: '34',
  name: 'Article',
  title: 'article.title',
  ctx: MASTERFILE.article,
  state: initArticle,
  state1: initAcc,
  state2: '',
  state3: '/art',
  modelid: formEnum.ARTICLE,
  columns: ColumnsM(initAcc, t, locale),
})

export const STORE = (t, locale) => ({
  id: '35',
  name: 'store',
  title: 'store.title',
  ctx: MASTERFILE.masterfile,
  state: initStore,
  state1: initAcc,
  state2: '',
  state3: '/store',
  modelid: formEnum.STORE,
  columns: ColumnsM2(t, locale),
})
export const ACCOUNT = (t, locale, currency) => ({
  id: '9',
  name: 'Account',
  title: 'account.title',
  ctx: MASTERFILE.acc,
  state: initAcc,
  state1: initAcc,
  state2: '',
  state3: '/acc',
  modelid: formEnum.ACCOUNT,
  columns: ColumnsACC(initAcc, t, locale, currency),
})
const COMPANY = (t, locale, currency) => ({
  id: '10',
  name: 'Company',
  title: 'company.title',
  ctx: MASTERFILE.comp,
  state: initComp,
  state1: initAcc,
  state2: initVat,
  state3: initBank,
  modelid: formEnum.COMPANY,
  columns: ColumnsComp(initAcc, t, locale, currency),
})
export const ASSET = (t, locale, currency) => ({
  id: '19',
  name: 'Asset',
  title: 'asset.title',
  ctx: MASTERFILE.asset,
  state: initAsset,
  state1: initAcc,
  state2: '',
  state3: '/asset',
  modelid: formEnum.ASSET,
  columns: ColumnsAsset(initAcc, t, locale, currency),
})
export const BANK = (t, locale) => ({
  id: '11',
  name: 'Bank',
  title: 'bank.title',
  ctx: MASTERFILE.masterfile,
  state: initBank,
  state1: initAcc,
  state2: '',
  state3: '/bank',
  modelid: formEnum.BANK,
  columns: ColumnsM(initAcc, t, locale),
})
export const SALARY_ITEM = (t, locale) => ({
  id: '171',
  name: 'Salary Item',
  title: 'salary.item.title',
  ctx: MASTERFILE.salaryItem,
  state: initSalaryItem,
  state1: initAcc,
  state2: '',
  state3: '/s_item',
  modelid: formEnum.SALARY_ITEM,
  columns: ColumnsSalaryItem(initAcc, t, locale),
})
export const MODULE = (t, locale) => ({
  id: '400',
  name: 'Module',
  title: 'module.title',
  ctx: MASTERFILE.module,
  state: initModule,
  state1: initAcc,
  state2: '',
  state3: '/module',
  modelid: formEnum.MODULE,
  columns: ColumnsModule(t, locale),
})
export const ACCOUNT_CLASS = (t, locale) => ({
  id: '36',
  name: 'Account class',
  title: 'accountClass.title',
  ctx: MASTERFILE.masterfile,
  state: initAccountClass,
  state1: initAccountClass,
  state2: '',
  state3: '/class',
  modelid: formEnum.ACCOUNT_CLASS,
  columns: ColumnsM(initAccountClass, t, locale),
})
export const ACCOUNT_GROUP = (t, locale) => ({
  id: '37',
  name: 'Account group',
  title: 'accountGroup.title',
  ctx: MASTERFILE.masterfile,
  state: initAccountGroup,
  state1: [...initAccountClass, ...initAccountGroup],
  state2: '',
  state3: '/group',
  modelid: formEnum.ACCOUNT_GROUP,
  columns: ColumnsM([...initAccountGroup, ...initAccountClass], t, locale),
})
export const VAT = (t, locale) => ({
  id: '14',
  name: 'Vat',
  title: 'vat.title',
  ctx: MASTERFILE.vat,
  state: initVat,
  state1: initAcc,
  state2: '',
  state3: '/vat',
  modelid: formEnum.VAT,
  columns: ColumnsVAT(initAcc, t, locale),
})
const BS = (t, locale, currency) => ({
  id: '18',
  name: 'Bankstatement',
  title: 'bankstatement.title',
  ctx: MASTERFILE.bs,
  state: initBS,
  state1: '',
  state2: '',
  state3: '/bs',
  modelid: formEnum.BANKSTATEMENT,
  period: -1,
  columns: ColumnsBS(t, locale, currency),
})
const PACB = (t, locale, currency) => ({
  id: '106',
  name: 'PAC',
  title: 'pac.title',
  ctx: MASTERFILE.pac,
  state: initPac,
  state1: initAcc,
  state2: '',
  state3: '/pac',
  modelid: formEnum.PACB,
  columns: columnsPACB(t, locale, currency),
})
const USER = (t, locale, currency) => ({
  id: '111',
  name: 'User',
  title: 'user.title',
  ctx: MASTERFILE.user,
  state: initUser,
  state1: '',
  state2: '',
  state3: '',
  modelid: formEnum.USER,
  columns: ColumnsUSER(t, locale, currency),
})
const JOURNAL = (t, locale, currency) => ({
  id: '112',
  name: 'Journal',
  title: 'journal.title',
  ctx: MASTERFILE.jou,
  state: initJour,
  state1: initAcc,
  state2: '',
  state3: '',
  modelid: formEnum.JOURNAL,
  columns: ColumnJournal(t, locale, currency),
})
const FINANCIALS = (t) => ({
  id: '1120',
  name: 'Financials',
  title: 'financials.title',
  ctx: MASTERFILE.ftr,
  state: initFtr,
  state1: initAcc,
  state2: initCC,
  state3: '',
  modelid: formEnum.FINANCIALS,
})

const BALANCESHEET = (t, locale, currency) => ({
  id: '1300',
  name: 'Balancesheet',
  title: 'balancesheet.title',
  ctx: MASTERFILE.balancesheet,
  state: {
    account: '',
    account2: '',
    fromPeriod: '',
    toPeriod: '',
  },
  state1: initAcc,
  state2: '',
  state3: '',
  modelid: formEnum.BALANCESHEET,
  columns: ColumnsBalancesheet(t, locale, currency),
})

export const ROLE = (t, locale) => ({
  id: '121',
  name: 'UserRole',
  title: 'role.title',
  ctx: MASTERFILE.role,
  state: initRole,
  state1: initAcc,
  state2: '',
  state3: '/role',
  modelid: formEnum.ROLE,
  columns: ColumnsM(initAcc, t, locale),
})

export const PERMISSION = (t, locale) => ({
  id: '141',
  name: 'Permission',
  title: 'permission.title',
  ctx: MASTERFILE.perm,
  state: initPermission,
  state1: initAcc,
  state2: '',
  state3: '/perm',
  modelid: formEnum.PERMISSION,
  columns: ColumnsM(initAcc, t, locale),
})

export const FMODULE = (t, locale) => ({
  id: '151',
  name: 'FModule',
  title: 'fmodule.title',
  ctx: MASTERFILE.fmodule,
  state: initfModule,
  state1: initAcc,
  state2: '',
  state3: '/fmodule',
  modelid: formEnum.FMODULE,
  columns: ColumnsM(initAcc, t, locale),
})
export const LOGIN_MENU = (t, locale, currency) => [LOGIN(t, locale, currency)]

export const loginInit = [
  {
    username: '',
    password: '',
    company: '',
    language: '',
  },
]
export const initAcc = [
  {
    id: '9',
    name: '',
    description: '',
    enterdate: date,
    postingdate: date,
    changedate: date,
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
    subAccounts: [],
  },
]

export const initArticle = [
  {
    id: '',
    name: '',
    description: '',
    parent: '',
    sprice: 0,
    pprice: 0,
    avgPrice: 0,
    currency: '',
    stocked: true,
    company: '',
    modelid: 34,
    enterdate: date,
    changedate: date,
    postingdate: date,
  },
]
export const initAsset = [
  {
    id: '',
    name: '',
    description: '',
    enterdate: date,
    postingdate: date,
    changedate: date,
    company: '',
    modelid: 19,
    account: '-1',
    oaccount: '-1',
    scrapValue: -1,
    lifeSpan: -1,
    depMethod: 1,
    rate: 1,
    frequency: -1,
    currency: 'EUR',
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
export const initStore = [
  {
    id: '',
    name: '',
    description: '',
    enterdate: date,
    postingdate: date,
    changedate: date,
    company: '',
    modelid: 35,
  },
]
export const initModule = [
  {
    id: '400',
    name: '',
    description: '',
    path: '',
    parent: -1,
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
    parent: -1,
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
    parent: -1,
    enterdate: date,
    postingdate: date,
    changedate: date,
    company: '',
    modelid: 37,
  },
]
export const initCC = [
  {
    id: '6',
    name: '',
    description: '',
    enterdate: date,
    postingdate: date,
    changedate: date,
    modelid: 6,
    parent: '-1',
    company: '',
  },
]
export const initComp = [
  {
    id: '',
    name: '',
    description: '',
    street: '',
    city: '',
    state: '',
    zip: '',
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
    enterdate: date,
    postingdate: date,
    changedate: date,
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
  },
]
export const initVat = [
  {
    id: '',
    name: '',
    description: '',
    percent: '',
    inputVatAccount: '',
    outputVatAccount: '',
    enterdate: date,
    postingdate: date,
    changedate: date,
    company: '',
    modelid: 14,
  },
]
export const initCust = [
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
    vatcode: '-1',
    company: '',
    modelid: 3,
    enterdate: date,
    postingdate: date,
    changedate: date,
    bankaccounts: [
      {
        id: '',
        bic: '',
        owner: '',
        modelid: 12,
        company: '',
      },
    ],
  },
]
export const initSalaryItem = [
  {
    id: '-1',
    name: '',
    description: '',
    amount: 0,
    account: '',
    enterdate: date,
    postingdate: date,
    changedate: date,
    modelid: 171,
    company: '',
  },
]
export const initEmp = [
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
    vatcode: '-1',
    company: '',
    modelid: 33,
    enterdate: date,
    postingdate: date,
    changedate: date,
    bankaccounts: [
      {
        id: '',
        bic: '',
        owner: '',
        modelid: 12,
        company: '',
      },
    ],
    salaryItem: [
      {
        id: '-1',
        owner: '-1x',
        account: '',
        amount: 0,
        text: '',
        company: '',
      },
    ],
  },
]
export const initSup = [
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
    accountName: '',
    oaccount: '-1',
    oaccountName: '',
    vatcode: '-1',
    vatName: '',
    company: '',
    modelid: 1,
    enterdate: date,
    postingdate: date,
    changedate: date,
    bankaccounts: [
      {
        id: '',
        bic: '',
        owner: '',
        modelid: 12,
        company: '',
      },
    ],
  },
]

export const initJour = [
  {
    id: '',
    transid: '',
    oid: '',
    account: '',
    oaccount: '',
    transdate: '',
    postingdate: '',
    enterdate: '',
    period: '',
    amount: '',
    idebit: '',
    debit: '',
    icredit: '',
    credit: '',
    currency: '',
    side: '',
    text: '',
    month: '',
    year: '',
    company: '',
    typeJournal: '',
    file_content: '',
    modelid: 10002,
    query: {
      account: '',
      account2: '',
      fromPeriod: '',
      toPeriod: '',
    },
  },
]
export const initBS = [
  {
    id: '',
    depositor: '',
    postingdate: date,
    valuedate: date,
    postingtext: '',
    purpose: '',
    beneficiary: '',
    accountno: '',
    bankCode: '',
    amount: '',
    currency: '',
    info: '',
    company: '',
    companyIban: '',
    posted: '',
    modelid: 18,
    period: -1,
    path: '',
  },
]
export const initFtr = [
  {
    id: -1,
    oid: 0,
    id1: -1,
    costcenter: '',
    account: '',
    transdate: date,
    enterdate: date,
    postingdate: date,
    period: getPeriod(new Date()),
    posted: false,
    modelid: 1300,
    company: '',
    text: '',
    typeJournal: 0,
    file_content: 0,
    lines: [
      {
        id: -1,
        transid: -1,
        account: '',
        accountName: '',
        side: true,
        oaccount: '',
        oaccountName: '',
        amount: 0.0,
        duedate: date,
        text: '',
        currency: 'EUR',
      },
    ],
  },
]
export const initPac = [
  {
    id: '',
    name: '',
    period: '',
    idebit: 0.0,
    icredit: 0.0,
    debit: 0.0,
    credit: 0.0,
    currency: '',
    company: '',
    modelid: 106,
    query: {
      account: '',
      account2: '',
      fromPeriod: '',
      toPeriod: '',
    },
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

export const initfModule = [
  {
    id: '151',
    name: '',
    description: '',
    enterdate: date,
    postingdate: date,
    changedate: date,
    modelid: 151,
    account: '-1',
    isDebit: false,
    company: '',
  },
]
export const MENU = (t, locale, currency) =>
  new Map([
    ['/art', ARTICLE(t, locale, currency)],
    ['/asset', ASSET(t, locale, currency)],
    ['/journal', JOURNAL(t, locale, currency)],
    ['/pac', PACB(t, locale, currency)],
    ['/bank', BANK(t, locale)],
    ['/acc', ACCOUNT(t, locale, currency)],
    ['/cc', COSTCENTER(t, locale)],
    ['/cust', CUSTOMER(t, locale, currency)],
    ['/sup', SUPPLIER(t, locale, currency)],
    ['/store', STORE(t, locale, currency)],
    ['/class', ACCOUNT_CLASS(t, locale, currency)],
    ['/group', ACCOUNT_GROUP(t, locale, currency)],
    ['/s_item', SALARY_ITEM(t, locale, currency)],
    ['/vat', VAT(t, locale, currency)],
    ['/user', USER(t, locale, currency)],
    ['/role', ROLE(t, locale)],
    ['/perm', PERMISSION(t, locale)],
    ['/login', LOGIN(t, locale, currency)],
    ['/dashboard', LOGIN(t, locale, currency)],
    ['/comp', COMPANY(t, locale, currency)],
    ['/bs', BS(t, locale, currency)],
    ['/ftr', FINANCIALS(t, locale, currency)],
    ['/module', MODULE(t, locale)],
    ['/fmodule', FMODULE(t, locale)],
    ['/emp', EMPLOYEE(t, locale, currency)],
    ['/balance', BALANCESHEET(t, locale, currency)],
  ])

const initialState = {
  profile: {
    token: 'noTOken',
    company: '',
    currency: '',
    language: '',
    modules: [],
  },
  selected: '',
  userMenu: [],
  history_: '',
  routes: () => LoginRoute,
}
const importFn = (str) => React.lazy(() => import(`./${str}`))
const LoginRoute = [
  {
    path: '/login',
    exact: true,
    name: 'Login',
    element: importFn('views/base/Components/Login'),
  },
]
export const useStore = create((set) => ({
  profile: initialState,
  selected: '',
  menu: '',
  routes: '',
  module: '',
  setProfile: (p) => set((state) => ({ profile: p })),
  setSelected: (s) => set((state) => ({ selected: s })),
  setMenu: (m) => set((state) => ({ menu: m })),
  setModule: (module_) => set((state) => ({ module: module_ })),
  setRoutes: (r) => set((state) => ({ routes: r })),
}))

export { LoginRoute }
