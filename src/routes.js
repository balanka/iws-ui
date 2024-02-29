import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
const MASTERFILE = (path) => React.lazy(() => import('./views/base/Components/MasterfileForm'))
const FINANCIALS = (path) => React.lazy(() => import('./views/base/Components/FinancialsForm'))
const JFORM = (path) => React.lazy(() => import('./views/base/Components/JForm'))
const BANKSTATEMENT = (path) =>
  React.lazy(() => import('./views/base/Components/BankStatementForm'))
const BALANCESHEET = (path) => React.lazy(() => import('./views/base/Components/BasicTreeTable'))
const LOGIN = () => React.lazy(() => import('./views/base/Components/Login'))

const routes = [
  { path: '/accounting', exact: true, name: 'Accounting' },
  { path: '/ftr', name: 'Supplier', element: FINANCIALS() },
  { path: '/journal', name: 'Journal', element: JFORM() },
  { path: '/Masterfiles', exact: true, name: 'Masterfiles' },
  { path: '/admin', name: 'Admin' },
  { path: '/acc', name: 'Account', element: MASTERFILE() },
  { path: '/art', name: 'Article', element: MASTERFILE() },
  { path: '/cc', name: 'Cost center', element: MASTERFILE() },
  { path: '/cust', name: 'Customer', element: MASTERFILE() },
  { path: '/sup', name: 'Supplier', element: MASTERFILE() },
  { path: '/store', name: 'Store', element: MASTERFILE() },
  { path: '/emp', name: 'Employee', element: MASTERFILE() },
  { path: '/user', name: 'Users', element: MASTERFILE() },
  { path: '/vat', name: 'VAT', element: MASTERFILE() },
  { path: '/bank', name: 'Bank', element: MASTERFILE() },
  { path: '/qty', name: 'Quantity unit', element: MASTERFILE() },
  { path: '/class', name: 'Account class', element: MASTERFILE() },
  { path: '/group', name: 'Account group', element: MASTERFILE() },
  { path: '/role', name: 'Role', element: MASTERFILE() },
  { path: '/bs', name: 'Bankstatement', element: BANKSTATEMENT() },
  { path: '/pac', name: 'Pac', element: JFORM() },
  { path: '/balance', name: 'Balancesheet', element: BALANCESHEET() },
  { path: '/module', name: 'Module', element: MASTERFILE() },
  { path: '/comp', name: 'Company', element: MASTERFILE() },
  { path: '/asset', name: 'Assets', element: MASTERFILE() },
  { path: '/s_item', name: 'Salary item', element: MASTERFILE() },
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
