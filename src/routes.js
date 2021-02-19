import React from 'react';

const importFn =(str)=>React.lazy(() => import(`./${str}`))

const routes_=[
  { path: '/base/tabs', name: 'Tabs', cp:'views/base/Components/MenuTabs' },

  {path: '/dashboard', name: 'Dashboard', cp: 'views/dashboard/Dashboard'},
  { path: '/theme', name: 'Theme', cp:'views/theme/colors/Colors', exact: true },
  { path: '/theme/colors', name: 'Colors', cp:'views/theme/colors/Colors' }
  /*,
  { path: '/theme/typography', name: 'Typography', cp:'views/theme/typography/Typography' },
  { path: '/base', name: 'Base', cp:'views/base/cards/Cards', exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', cp:'views/base/breadcrumbs/Breadcrumbs'   },
  { path: '/base/cards', name: 'Cards', cp:'views/base/cards/Cards' },
  { path: '/base/carousels', name: 'Carousel', cp:'views/base/carousels/Carousels' },
  { path: '/base/collapses', name: 'Collapse', cp:'views/base/collapses/Collapses'},
  { path: '/base/jumbotrons', name: 'Jumbotrons', cp:'views/base/jumbotrons/Jumbotrons' },
  { path: '/base/list-groups', name: 'List Groups', cp:'views/base/list-groups/ListGroups' },
  { path: '/base/navbars', name: 'Navbars', cp:'views/base/navbars/Navbars' },
  { path: '/base/navs', name: 'Navs', cp:'views/base/navs/Navs'},
  { path: '/base/paginations', name: 'Paginations', cp:'views/base/paginations/Paginations' },
  { path: '/base/popovers', name: 'Popovers', cp:'views/base/popovers/Popovers' },
  { path: '/base/progress-bar', name: 'Progress Bar', cp:'views/base/progress-bar/ProgressBar' },
  { path: '/base/switches', name: 'Switches', cp:'views/base/switches/Switches' },

  { path: '/base/tooltips', name: 'Tooltips', cp:'views/base/tooltips/Tooltips' },
  { path: '/buttons', name: 'Buttons', cp:'views/buttons/buttons/Buttons', exact: true },
  { path: '/buttons/buttons', name: 'Buttons', cp:'views/buttons/buttons/Buttons' },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', cp:'views/buttons/button-dropdowns/ButtonDropdowns' },
  { path: '/buttons/button-groups', name: 'Button Groups', cp:'views/buttons/button-groups/ButtonGroups' },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', cp:'views/buttons/brand-buttons/BrandButtons' },
  { path: '/charts', name: 'Charts', cp:'views/charts/Charts'},
  { path: '/editors', name: 'Editors', cp:'views/editors/code-editors/CodeEditors', exact: true },
  { path: '/editors/code-editors', name: 'Code Editors', cp:'views/editors/code-editors/CodeEditors' },
  { path: '/editors/text-editors', name: 'Text Editors', cp:'views/editors/text-editors/TextEditors' },
  { path: '/forms', name: 'Forms', cp:'views/forms/basic-forms/BasicForms', exact: true },
  { path: '/forms/advanced-forms', name: 'Advanced Forms', cp:'views/forms/advanced-forms/AdvancedForms' },
  { path: '/forms/basic-forms', name: 'Basic Forms', cp:'views/forms/basic-forms/BasicForms'},
  { path: '/forms/validation-forms', name: 'Form Validation', cp:'views/forms/validation-forms/ValidationForms' },
  { path: '/google-maps', name: 'Google Maps', cp:'views/google-maps/GoogleMaps' },
  { path: '/icons', exact: true, name: 'Icons', cp:'views/icons/coreui-icons/CoreUIIcons' },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', cp:'views/icons/coreui-icons/CoreUIIcons' },
  { path: '/icons/flags', name: 'Flags', cp:'views/icons/flags/Flags' },
  { path: '/icons/brands', name: 'Brands', cp:'views/icons/brands/Brands' },
  { path: '/notifications', name: 'Notifications', cp:'views/notifications/alerts/Alerts', exact: true },
  { path: '/notifications/alerts', name: 'Alerts', cp:'views/notifications/alerts/Alerts' },
  { path: '/notifications/badges', name: 'Badges', cp:'views/notifications/badges/Badges' },
  { path: '/notifications/modals', name: 'Modals', cp:'views/notifications/modals/Modals' },
  { path: '/notifications/toaster', name: 'Toaster', cp:'views/notifications/toaster/Toaster' },
  { path: '/plugins', name: 'Plugins', cp:'views/plugins/calendar/Calendar', exact: true },
  { path: '/plugins/calendar', name: 'Calendar', cp:'views/plugins/calendar/Calendar' },
  { path: '/plugins/draggable', name: 'Draggable Cards', cp:'views/plugins/draggable/Draggable' },
  { path: '/plugins/spinners', name: 'Spinners', cp:'views/plugins/spinners/Spinners' },
  { path: '/tables', name: 'Tables', cp:'views/tables/tables/Tables', exact: true },
  { path: '/tables/data-table', name: 'Data Table', cp:'views/tables/data-table/DataTable' },
  { path: '/tables/tables', name: 'Tables', cp:'views/tables/tables/Tables' },
  { path: '/widgets', name: 'Widgets', cp:'views/widgets/Widgets' },
  { path: '/apps', name: 'Apps', cp:'views/apps/invoicing/Invoice', exact: true },
  { path: '/apps/invoicing', name: 'Invoice', cp:'views/apps/invoicing/Invoice', exact: true },
  { path: '/apps/invoicing/invoice', name: 'Invoice', cp:'views/apps/invoicing/Invoice' },
  { path: '/users', exact: true,  name: 'Users', cp:'views/users/Users'},
  { path: '/users/:id', exact: true, name: 'User Details', cp:'views/users/User' }

   */
];

const routes =routes_.map(record=> ({...record, component: importFn(record.cp) }));

export default routes;
