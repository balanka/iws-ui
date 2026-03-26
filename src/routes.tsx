import { MASTERFILE } from './form/Menu'
import './i18n'

const Dashboard = () =>import('./components/dashboard/Dashboard.tsx')
const AccountForm = ()  =>   import('./form/AccountForm.tsx')
const CompanyForm = ()  =>   import('./form/CompanyForm.tsx')
const ArticleForm = () =>  import('./form/ArticleForm.tsx')
const AssetForm = () =>  import('./form/AssetForm.tsx')
const CustomerForm = () =>  import('./form/CustomerForm.tsx')
//const MasterfileForm = () =>   import('./form/MasterfileForm')
//const MasterfileForm2 = () =>   import('./form/MasterfileForm2')
const FinancialsForm = () =>   import('./form/FinancialsForm')
const TransactionForm = () =>   import('./form/TransactionForm')
const JForm = () =>  import('./form/JForm')
const Journal = () =>  import('./form/Journal')
const InventoryJournalForm = () =>  import('./form/InventoryJournalForm')
const BankStatementForm = () =>   import('./form/BankStatementForm')
const StoreForm = () =>   import('./form/StoreForm')
const UserForm = () =>   import('./form/UserForm')
const VatForm = () => import('./form/VatForm')
const PartnerForm = () => import('./form/PartnerForm')
const FModuleForm = () => import('./form/FModuleForm')
const PermissionForm = () => import('./form/PermissionForm')
const RoleForm = () => import('./form/RoleForm')
const MasterfileForm = () => import('./form/MasterfileForm')
//const BasicTreeTable = () => import('./form/BasicTreeTable')
const BasicTreeTable = () => import('./form/Main')
//const BasicTreeTable = () => import('./form/BasicTreeData')
//const ImageEditorExample = () => import('./form/ImageEditorExample')
//const weatherComponent = () => import('./form/WeatherComponent')


const Login = ()   => import('./form/Login')

const routes = ():{path:string, name?:string, element?: ()=>Promise<any>}[] => [
  { path: '/accounting',  name: 'Accounting' },
  { path: '/ftr', name: 'financials', element: FinancialsForm },
  { path: '/ltr', name: 'transaction', element: TransactionForm },
  { path: MASTERFILE.journal, name: 'Journal', element: Journal },
  { path: MASTERFILE.ijournal, name: 'inventory Journal', element: InventoryJournalForm },
  { path: '/Masterfiles',  name: 'Masterfiles' },
  { path: '/admin', name: 'Admin' },
  { path: MASTERFILE.acc, name: 'Account', element: AccountForm },
  { path: MASTERFILE.comp, name: 'Company', element: CompanyForm},
  {
    path: MASTERFILE.createDepreciationTransaction,
    name: 'Generate depreciation transaction',
    //element:weatherComponent
    element: MasterfileForm,
  },
  { path: MASTERFILE.article, name: 'Article', element: ArticleForm},
  { path: MASTERFILE.articleGroup, name: 'Article group', element: MasterfileForm },
  { path: MASTERFILE.cc, name: 'Cost center', element: MasterfileForm },
  { path: MASTERFILE.cust, name: 'Customer', element: CustomerForm},
  { path: MASTERFILE.sup, name: 'Supplier', element: CustomerForm },
  { path: MASTERFILE.store, name: 'Store', element: StoreForm},
  { path: MASTERFILE.emp, name: 'Employee', element: CustomerForm },
  { path: MASTERFILE.user, name: 'Users', element: UserForm },
  { path: MASTERFILE.vat, name: 'VAT', element: VatForm },
  { path: MASTERFILE.bank, name: 'Bank', element: MasterfileForm },
  { path: MASTERFILE.partner, name: 'Partner', element: PartnerForm },
  { path: MASTERFILE.currency, name: 'Currency', element: MasterfileForm },
  { path: MASTERFILE.qty, name: 'Quantity unit', element: MasterfileForm},
  { path: MASTERFILE.accountClass, name: 'Account class', element: MasterfileForm},
  { path: MASTERFILE.accountGroup, name: 'Account group', element: MasterfileForm },
  { path: MASTERFILE.payrollTaxRange, name: 'PayRoll tax range', element: MasterfileForm },
  { path: MASTERFILE.role, name: 'Role', element: RoleForm },
  { path: MASTERFILE.perm, name: 'Permission', element: PermissionForm },
  { path: MASTERFILE.bs, name: 'Bankstatement', element: BankStatementForm},
  { path: MASTERFILE.pac, name: 'Pac', element: JForm },
  { path: MASTERFILE.balancesheet, name: 'Balancesheet', element: BasicTreeTable },
  { path: MASTERFILE.module, name: 'Module', element: MasterfileForm},
  { path: MASTERFILE.fmodule, name: 'FModule', element: FModuleForm},
  { path: MASTERFILE.comp, name: 'Company', element: MasterfileForm },
  { path: MASTERFILE.asset, name: 'Assets', element: AssetForm},
  { path: '/users/login', name: 'Login', element: Login },
  { path: '/',  name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

]

export default routes
