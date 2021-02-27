const Navigation =(t)=>

    ([{
        _tag: 'CSidebarNavItem',
        name: t('menu.login'),
        to: '/login',
        icon: 'cil-speedometer'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'info',
          text: 'NEW',
        }
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: t('menu.accounting'),
        route: '/base',
        icon: 'cil-puzzle',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: t('menu.financials'),
            to: '/ftr',
            //icon: 'cil-drop',
            icon: 'cil-chart-pie',
          },
          {
            _tag: 'CSidebarNavItem',
            name: t('menu.journal'),
            to: '/journal',
            icon: 'cil-speedometer',
            badge: {
              color: 'info',
              text: 'New',
            }
          },
          {
            _tag: 'CSidebarNavItem',
            name: t('menu.pacb'),
            to: '/pacb',
            icon: 'cil-speedometer',
            badge: {
              color: 'info',
              text: 'New',
            }
          },
          {
            _tag: 'CSidebarNavItem',
            name: t('menu.balancesheet'),
            to: '/balance',
            icon: 'cil-speedometer',
            badge: {
              color: 'info',
              text: 'New',
            }
          },
          {
            _tag: 'CSidebarNavItem',
            name: t('menu.bankstatement'),
            to: '/bs',
            icon: 'cil-speedometer',
            badge: {
              color: 'info',
              text: 'New',
            }
          },
        ]
      },
    {
      _tag: 'CSidebarNavDropdown',
      name: t('menu.masterfiles'),
      route: '/base',
      icon: 'cil-puzzle',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: t('menu.account'),
          to: '/acc',
          //icon: 'cil-drop',
          icon: 'cil-chart-pie',
        },
        {
          _tag: 'CSidebarNavItem',
          name: t('menu.costcenter'),
          to: '/cc',
          //icon: 'cil-drop',
          icon: 'cil-chart-pie',
        },
        {
          _tag: 'CSidebarNavItem',
          name: t('menu.customer'),
          to: '/customer',
          icon: 'cil-speedometer',
          badge: {
            color: 'info',
            text: 'New',
          }
        },
        {
          _tag: 'CSidebarNavItem',
          name: t('menu.supplier'),
          to: '/supplier',
          icon: 'cil-speedometer',
          badge: {
            color: 'info',
            text: 'New',
          }
        },
        {
          _tag: 'CSidebarNavItem',
          name: t('menu.bank'),
          to: '/bank',
          icon: 'cil-speedometer',
          badge: {
            color: 'info',
            text: 'New',
          }
        },
        {
          _tag: 'CSidebarNavItem',
          name: t('menu.vat'),
          to: '/vat',
          icon: 'cil-speedometer',
          badge: {
            color: 'info',
            text: 'New',
          }
        },
        {
          _tag: 'CSidebarNavItem',
          name: t('menu.company'),
          to: '/company',
          icon: 'cil-speedometer',
          badge: {
            color: 'info',
            text: 'New',
          }
        },
        {
          _tag: 'CSidebarNavItem',
          name: t('menu.user'),
          to: '/user',
          icon: 'cil-speedometer',
          badge: {
            color: 'info',
            text: 'New',
          }
        },
      ]
    }
  ])
export default Navigation;

