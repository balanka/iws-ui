import { useStore } from '../form/Menu'
import React, {useEffect} from 'react'
import iwsStore from '../utils/Store'
import { formEnum } from '../utils/FormEnum'
import { CNavGroup, CNavItem } from '@coreui/react'
import { cilPuzzle } from '@coreui/icons/dist/esm/free/cil-puzzle'
import { useTranslation } from 'react-i18next'
import CIcon from '@coreui/icons-react'
import {IMasterfile, IMasterfile2} from '../Models.ts'
import {isArrayAndNotEmpty} from '../utils/Utils.ts'

const Navigation = () => {
  const { profile, module, setModule } = useStore()
  const { t } = useTranslation()
  let userMenu = profile.modules ? profile.modules : [1010, 11111]
  const DEFAULT = [
    {
      id: 11111,
      name: t('menu.login'),
      description: '../form/Login',
      path: '/login',
      exact: true,
      parent: -1,
      modelid: 1111,
    },
    {
      id: 1010,
      name: t('common.dashboard'),
      description: '../dashboard/Dashboard',
      path: '/dashboard',
      exact: true,
      parent: -1,
      modelid: 1010,
    },
  ]

  useEffect(() => {
    iwsStore.subscribe(setModule)
  }, [])

  const buildIcon = (iconImage:any) => {
    return <CIcon icon={iconImage} customClassName="nav-icon" />
  }
  const buildMenu = (name_:string, path:string, children:any) => {
    let obj:any
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
  userMenu = modules_ //.map((m:IMasterfile)=>m.id)
  //   console.log('userMenu', userMenu)
  // console.log('modules_', modules_)
  // console.log('modules_', userMenu.map((m:IMasterfile)=>parseInt(`${m.id}`)).includes(153))

  const allItems:any[] = Array.isArray(modules_) && modules_.length > 0 ? modules_ : DEFAULT
  const allMenuItems:any[] = allItems.map((item:IMasterfile2) =>
    isArrayAndNotEmpty(allItems) ? {
          ...item,
          items: [
            ...allItems.filter((e: IMasterfile2) => e.parent === item.id
                && userMenu.map((m:IMasterfile)=>parseInt(`${m.id}`)).includes(parseInt(`${e.id}`))),
          ],
        }
        : {
          ...item,
        },
  )
  //console.log('allMenuItems', allMenuItems)
  return allMenuItems
    .filter((e:any) => (Array.isArray(e.items) && e.items.length > 0) || e.parent === -1)
    .map((e:any) => buildMenu(e.name, e.path, e.items))
}
export default Navigation
