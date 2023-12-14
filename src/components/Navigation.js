import { useStore } from '../views/base/Components/Menu'
import React, { useLayoutEffect } from 'react'
import iwsStore from '../views/base/Components/Store'
import { formEnum } from '../views/base/utils/FORMS'
import { CNavGroup, CNavItem } from '@coreui/react'
import { cilPuzzle } from '@coreui/icons/dist/esm/free/cil-puzzle'
import CIcon from '@coreui/icons-react'

const Navigation = (t) => {
  const { profile, module, setModule } = useStore()
  const userMenu = profile.modules ? profile.modules : [1010, 11111]
  const DEFAULT = [
    {
      id: 11111,
      name: t('menu.login'),
      description: 'views/base/Components/Login',
      path: '/login',
      exact: true,
      parent: -1,
      modelid: 1111,
    },
    {
      id: 1010,
      name: 'Dashboard',
      description: 'views/base/Components/Dashboard',
      path: '/dashboard',
      exact: true,
      parent: -1,
      modelid: 1010,
    },
  ]

  useLayoutEffect(() => {
    iwsStore.subscribe(setModule)
  }, [setModule])

  const buildIcon = (iconImage) => {
    return <CIcon icon={iconImage} customClassName="nav-icon" />
  }
  const buildMenu = (name_, path, children) => {
    let obj
    if (Array.isArray(children) && children.length > 0) {
      obj = { component: CNavGroup, name: t(name_), to: path, icon: buildIcon(cilPuzzle) }
      obj['items'] = [...children].map((e) => {
        return {
          component: CNavItem,
          name: t(e.name),
          to: e.path,
          exact: true,
          icon: buildIcon(cilPuzzle),
        }
      })
    } else {
      obj = { component: CNavItem, name: t(name_), to: path }
    }
    return obj
  }

  const modules_ = module ? iwsStore.get(formEnum.MODULE) : []
  const allItems = Array.isArray(modules_) && modules_.length > 0 ? modules_ : DEFAULT
  const allMenuItems = allItems.map((item) =>
    Array.isArray(allItems) && allItems.length > 0
      ? {
          ...item,
          items: [
            ...allItems.filter((e) => e.parent === item.id && userMenu.includes(parseInt(e.id))),
          ],
        }
      : {
          ...item,
        },
  )
  return allMenuItems
    .filter((e) => (Array.isArray(e.items) && e.items.length > 0) || e.parent === -1)
    .map((e) => buildMenu(e.name, e.path, e.items))
}
export default Navigation
