import {useStore} from "../../views/base/Components/Menu";
import {useLayoutEffect} from "react";
import iwsStore from "../../views/base/Components/Store";

const Navigation = (t) => {
  const {module, setModule} = useStore();
  const DEFAULT =[
    {id: 11111, name: t('menu.login'), path: '/login', parent: -1},
    {id: 1010, name: 'Dashboard', path: '/dashboard', parent: -1},
  ]
  console.log('module<<<<<<', module);

  useLayoutEffect(() => {
    iwsStore.subscribe(setModule);
  }, [ setModule]);

  const buildMenu = (name_, path, children) => {
    let obj;
    if (Array.isArray(children) && children.length > 0) {
      obj = {_tag: 'CSidebarNavDropdown', name: t(name_), to: path, icon: 'cil-puzzle'};
      obj['_children'] = [...children].map(e => {
        return {_tag: 'CSidebarNavItem', name: t(e.name), to: e.path, icon: 'cil-chart-pie'};
      })
    } else {
      obj = {_tag: 'CSidebarNavItem', name: t(name_), to: path, icon: 'cil-chart-pie'};
    }
    return obj;

  }

  const modules = module ? iwsStore.get(400) : [];
  const allItems = (Array.isArray(modules) && modules.length > 0) ? modules :DEFAULT;

  console.log("allItems", allItems);
  const allMenuItems = allItems.map(item =>
    Array.isArray(allItems) && allItems.length > 0 ?
      {...item, children: [...allItems.filter(e => e.parent === item.id)]} : {...item});

  const allMenu = allMenuItems.filter(e => (Array.isArray(e.children) && e.children.length > 0) || e.parent === -1)
    .map(e => buildMenu(t(e.name), e.path, e.children));
  console.log("XXX", allMenu);

  return allMenu;
}

export default Navigation;

