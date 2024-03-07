import React from 'react'
import { MASTERFILE } from './views/base/Components/Menu'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
const Masterfile = (path) => React.lazy(() => import('./views/base/Components/MasterfileForm'))
const FINANCIALS = (path) => React.lazy(() => import('./views/base/Components/FinancialsForm'))
const JFORM = (path) => React.lazy(() => import('./views/base/Components/JForm'))
const BANKSTATEMENT = (path) =>
  React.lazy(() => import('./views/base/Components/BankStatementForm'))
const BALANCESHEET = (path) => React.lazy(() => import('./views/base/Components/BasicTreeTable'))
const LOGIN = () => React.lazy(() => import('./views/base/Components/Login'))

const routes = [
  { path: '/accounting', exact: true, name: 'Accounting' },
  { path: '/ftr', name: 'financials', element: FINANCIALS() },
  { path: MASTERFILE.journal, name: 'Journal', element: JFORM() },
  { path: '/Masterfiles', exact: true, name: 'Masterfiles' },
  { path: '/admin', name: 'Admin' },
  { path: MASTERFILE.acc, name: 'Account', element: Masterfile() },
  { path: MASTERFILE.article, name: 'Article', element: Masterfile() },
  { path: MASTERFILE.cc, name: 'Cost center', element: Masterfile() },
  { path: MASTERFILE.cust, name: 'Customer', element: Masterfile() },
  { path: MASTERFILE.sup, name: 'Supplier', element: Masterfile() },
  { path: MASTERFILE.store, name: 'Store', element: Masterfile() },
  { path: MASTERFILE.emp, name: 'Employee', element: Masterfile() },
  { path: MASTERFILE.user, name: 'Users', element: Masterfile() },
  { path: MASTERFILE.vat, name: 'VAT', element: Masterfile() },
  { path: '/bank', name: 'Bank', element: Masterfile() },
  { path: '/qty', name: 'Quantity unit', element: Masterfile() },
  { path: MASTERFILE.accountClass, name: 'Account class', element: Masterfile() },
  { path: MASTERFILE.accountGroup, name: 'Account group', element: Masterfile() },
  { path: MASTERFILE.payrollTaxRange, name: 'Account group', element: Masterfile() },
  { path: MASTERFILE.role, name: 'Role', element: Masterfile() },
  { path: MASTERFILE.bs, name: 'Bankstatement', element: BANKSTATEMENT() },
  { path: MASTERFILE.pac, name: 'Pac', element: JFORM() },
  { path: MASTERFILE.balancesheet, name: 'Balancesheet', element: BALANCESHEET() },
  { path: MASTERFILE.module, name: 'Module', element: Masterfile() },
  { path: MASTERFILE.comp, name: 'Company', element: Masterfile() },
  { path: MASTERFILE.asset, name: 'Assets', element: Masterfile() },
  { path: MASTERFILE.salaryItem, name: 'Salary item', element: Masterfile() },
  { path: '/users/login', name: 'Login', element: LOGIN() },
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
