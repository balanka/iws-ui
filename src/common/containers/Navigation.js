import {useStore} from "../../views/base/Components/Menu";
import {useLayoutEffect} from "react";
import iwsStore from "../../views/base/Components/Store";
import {formEnum} from "../../utils/FORMS";

const Navigation = (t) => {
  const {profile, module, setModule} = useStore();

  const userMenu = profile.modules?profile.modules:[1010, 11111];
  const DEFAULT =[
    {id: 11111, name: t('menu.login'), description:'views/base/Components/Login', path: '/login', parent: -1, modelid:1111},
    {id: 1010, name: 'Dashboard', description:'views/base/Components/Dashboard', path: '/dashboard', parent: -1, modelid:1010},
  ]

  useLayoutEffect(() => {
    iwsStore.subscribe(setModule);
  }, [ setModule]);

  const buildMenu = (name_, path, children) => {
    let obj;
    if (Array.isArray(children) && children.length > 0) {
      obj = {_tag: 'CSidebarNavDropdown', name: t(name_), to: path, icon: 'cil-puzzle'};
      obj['_children'] = [...children].map(e => {
        return {_tag: 'CSidebarNavItem', name: t(e.name), to: e.path, icon: 'cil-chart-pie'}
      })
    } else {
      obj = {_tag: 'CSidebarNavItem', name: t(name_), to: path, icon: 'cil-chart-pie'};
    }
    return obj;

  }


  const modules_ = module ? iwsStore.get(formEnum.MODULE) : [];
  const allItems = ((Array.isArray(modules_) && modules_.length > 0) ? modules_ :DEFAULT)
  const allMenuItems = allItems.map(item => Array.isArray(allItems) && allItems.length > 0 ?
      {...item, children: [...allItems.filter(e => (e.parent === item.id)&&(userMenu.includes(parseInt(e.id))))]} : {...item});
  return allMenuItems.filter(e => (Array.isArray(e.children) && e.children.length > 0) || e.parent === -1)
    .map(e => buildMenu(t(e.name), e.path, e.children));
}

export default Navigation;

