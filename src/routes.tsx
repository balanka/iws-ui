import { MASTERFILE } from './form/Menu'
import './i18n'

const dashboard = () =>import('./components/dashboard/Dashboard.tsx')
const accountForm = ()  =>   import('./form/AccountForm.tsx')
const companyForm = ()  =>   import('./form/CompanyForm.tsx')
const articleForm = () =>  import('./form/ArticleForm.tsx')
const assetForm = () =>  import('./form/AssetForm.tsx')
const customerForm = () =>  import('./form/CustomerForm.tsx')
const financialsForm = () =>   import('./form/FinancialsForm')
const transactionForm = () =>   import('./form/TransactionForm')
const jForm = () =>  import('./form/JForm')
const journal = () =>  import('./form/Journal')
const inventoryJournalForm = () =>  import('./form/InventoryJournalForm')
const bankStatementForm = () =>   import('./form/BankStatementForm')
const storeForm = () =>   import('./form/StoreForm')
const userForm = () =>   import('./form/UserForm.tsx')
const vatForm = () => import('./form/VatForm')
const partnerForm = () => import('./form/PartnerForm')
const fModuleForm = () => import('./form/FModuleForm')
const permissionForm = () => import('./form/PermissionForm')
const roleForm = () => import('./form/RoleForm')
const masterfileForm = () => import('./form/MasterfileForm')
const roomForm = () => import('./form/RoomForm')
const apartmentForm = () => import('./form/ApartmentForm')
const realEstateForm = () => import('./form/RealEstateForm')
const basicTreeTable = () => import('./form/Main')
//const BasicTreeTable = () => import('./form/BasicTreeData')
//const ImageEditorExample = () => import('./form/ImageEditorExample')
//const weatherComponent = () => import('./form/WeatherComponent')
//const userTable = () => import('./form/UserTable')
const smartTableColumnAndRowsGroupsExample = () => import('./form/SmartTableColumnAndRowsGroupsExample')
//const mySmartTable =()=> import('./form/MySmartTable')



const Login = ()   => import('./form/Login')

const routes = ():{path:string, name?:string, element?: ()=>Promise<any>}[] => [
  {
    path: '/transaction-combined-htmx/:id',
    name: 'Transactions (combined, HTMX)',
    element: () => import('./htmx/CombinedPageMount').then(m => ({
      default: () => <m.default prefix="transaction" title="Transactions" />
    }))
  },

  {
    path: '/financials-combined-htmx/:id',
    name: 'Financials (combined, HTMX)',
    element: () => import('./htmx/CombinedPageMount').then(m => ({
      default: () => <m.default prefix="financials" title="Financials" />
    }))
  },
  {
    path: '/masterfile-combined-htmx/:id',
    name: 'Masterfile (combined, HTMX)',
    element: () => import('./htmx/CombinedPageMount').then(m => ({
      default: () => <m.default prefix="masterfile" title="Masterfile" />
    }))
  },
  {
    path: '/article-combined-htmx/:id',
    name: 'Article (combined, HTMX)',
    element: () => import('./htmx/CombinedPageMount').then(m => ({
      default: () => <m.default prefix="article" title="Article" />
    }))
  },

  {
    path: '/asset-combined-htmx/:id',
    name: 'Asset (combined, HTMX)',
    element: () => import('./htmx/CombinedPageMount').then(m => ({
      default: () => <m.default prefix="asset" title="Asset" />
    }))
  },
  {
    path: '/account-combined-htmx/:id',
    name: 'Account (combined, HTMX)',
    element: () => import('./htmx/CombinedPageMount').then(m => ({
      default: () => <m.default prefix="account" title="Account" />
    }))
  },
  {
    path: '/customer-combined-htmx/:id',
    name: 'Customer (combined, HTMX)',
    element: () => import('./htmx/CombinedPageMount').then(m => ({
      default: () => <m.default prefix="customer" title="Customer" />
    }))
  },
  {
    path: '/employee-combined-htmx/:id',
    name: 'Employee (combined, HTMX)',
    element: () => import('./htmx/CombinedPageMount').then(m => ({
      default: () => <m.default prefix="employee" title="Employee" />
    }))
  },
  {
    path: '/supplier-combined-htmx/:id',
    name: 'Supplier (combined, HTMX)',
    element: () => import('./htmx/CombinedPageMount').then(m => ({
      default: () => <m.default prefix="supplier" title="Supplier" />
    }))
  },
  {
    path: '/vat-combined-htmx/:id',
    name: 'Vat (combined, HTMX)',
    element: () => import('./htmx/CombinedPageMount').then(m => ({
      default: () => <m.default prefix="vat" title="Vat" />
    }))
  },
  {
    path: '/company-combined-htmx/:id',
    name: 'Company (combined, HTMX)',
    element: () => import('./htmx/CombinedPageMount').then(m => ({
      default: () => <m.default prefix="company" title="Company" />
    }))
  },
  {
    path: '/permission-combined-htmx/:id',
    name: 'Permission (combined, HTMX)',
    element: () => import('./htmx/CombinedPageMount').then(m => ({
      default: () => <m.default prefix="permission" title="Permission" />
    }))
  },
  {
    path: '/store-combined-htmx/:id',
    name: 'Store (combined, HTMX)',
    element: () => import('./htmx/CombinedPageMount').then(m => ({
      default: () => <m.default prefix="store" title="Store" />
    }))
  },
  {
    path: '/user-combined-htmx/:id',
    name: 'User (combined, HTMX)',
    element: () => import('./htmx/CombinedPageMount').then(m => ({
      default: () => <m.default prefix="user" title="User" />
    }))
  },

  { path: '/accounting',  name: 'Accounting' },
  { path: '/ftr', name: 'financials', element: financialsForm },
  { path: '/ltr', name: 'transaction', element: transactionForm },
  { path: MASTERFILE.journal, name: 'Journal', element: journal },
  { path: MASTERFILE.ijournal, name: 'inventory Journal', element: inventoryJournalForm },
  { path: '/Masterfiles',  name: 'Masterfiles' },
  { path: '/admin', name: 'Admin' },
  { path: MASTERFILE.acc, name: 'Account', element: accountForm },
  { path: MASTERFILE.comp, name: 'Company', element: companyForm},
  {
    path: MASTERFILE.createDepreciationTransaction,
    name: 'Generate depreciation transaction',
    element: smartTableColumnAndRowsGroupsExample,
    //element: masterfileForm,
  },
  { path: MASTERFILE.article, name: 'Article', element: articleForm},
  { path: MASTERFILE.articleGroup, name: 'Article group', element: masterfileForm },
  { path: MASTERFILE.cc, name: 'Cost center', element: masterfileForm },
  { path: MASTERFILE.cust, name: 'Customer', element: customerForm},
  { path: MASTERFILE.sup, name: 'Supplier', element: customerForm },
  { path: MASTERFILE.store, name: 'Store', element: storeForm},
  { path: MASTERFILE.emp, name: 'Employee', element: customerForm },
  { path: MASTERFILE.user, name: 'Users', element: userForm },
  { path: MASTERFILE.vat, name: 'VAT', element: vatForm },
  { path: MASTERFILE.bank, name: 'Bank', element: masterfileForm },
  { path: MASTERFILE.contact, name: 'Contact', element: partnerForm },
  { path: MASTERFILE.currency, name: 'Currency', element: masterfileForm },
  { path: MASTERFILE.qty, name: 'Quantity unit', element: masterfileForm},
  { path: MASTERFILE.accountClass, name: 'Account class', element: masterfileForm},
  { path: MASTERFILE.accountGroup, name: 'Account group', element: masterfileForm },
  { path: MASTERFILE.payrollTaxRange, name: 'PayRoll tax range', element: masterfileForm },
  { path: MASTERFILE.role, name: 'Role', element: roleForm },
  { path: MASTERFILE.perm, name: 'Permission', element: permissionForm },
  { path: MASTERFILE.bs, name: 'Bankstatement', element: bankStatementForm},
  { path: MASTERFILE.pac, name: 'Pac', element: jForm },
  { path: MASTERFILE.balancesheet, name: 'Balancesheet', element: basicTreeTable },
  { path: MASTERFILE.module, name: 'Module', element: masterfileForm},
  { path: MASTERFILE.fmodule, name: 'FModule', element: fModuleForm},
  //{ path: MASTERFILE.comp, name: 'Company', element: masterfileForm },
  { path: MASTERFILE.asset, name: 'Assets', element: assetForm},
  { path: '/users/login', name: 'Login', element: Login },
  { path: MASTERFILE.room, name: 'Room', element: roomForm},
  { path: MASTERFILE.apartment, name: 'Apartment', element: apartmentForm},
  { path: MASTERFILE.realEstate, name: 'Real estate', element: realEstateForm},
  { path: '/',  name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: dashboard },

]

export default routes
