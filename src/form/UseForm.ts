import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, PinnedRowModule} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { useStore} from './Menu'
import {formEnum} from '../utils/FormEnum'
import {useTranslation} from "react-i18next";
import {State, UseFormResult} from '../Props.ts'
import {useState} from "react";
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, PinnedRowModule,])

const UseForm = (): [UseFormResult] => {
  const {profile, setProfile, menu, setMenu, setModule, setRoutes, selected} = useStore()
  const { company} = profile
  const {t, i18n} = useTranslation()
  console.log('selected', selected)
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  console.log('module_', module_)
  const modelid: number = module_ ? module_.modelid : 1111
  const title =  `${company}/${t(module_.title)}`
  const [language, setLanguage] = useState('en-US')
  const [state, setState] = useState <State>({collapse: true, fadeIn: true, timeout: 300})
  const [visible, setVisible] = useState <boolean>( true)
  const toggle = () => setState({...state, collapse: !state.collapse})
  const toggleTable = () => setVisible(!visible)
  const handleLanguageChange = (event:any) => {
    event.preventDefault()
    const value = event.target.value
    setLanguage(value)
    i18n.changeLanguage(value).then(r => console.log('r >>>value ', r))
  }

  return [{ profile, setProfile, menu, setMenu, setModule, setRoutes, selected, t, i18n, title:title
    , language, setLanguage, handleLanguageChange, toggle, toggleTable, state, visible, modelid, company, module_}]
}
export default UseForm
