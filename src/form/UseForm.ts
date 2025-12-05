import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, PinnedRowModule} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { useStore} from './Menu'
import {formEnum} from '../utils/FormEnum'
import {useTranslation} from "react-i18next";
import {UseFormResult} from "../Props.ts";
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, PinnedRowModule,])
const UseForm = (): [UseFormResult] => {
  const {profile, menu, selected} = useStore()
  const { company} = profile
  const {t, i18n} = useTranslation()
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  const modelid: number = module_ ? module_.modelid : 1111
  const title =  `${company}/${t(module_.title)}`
  return [{ profile, menu, selected, t, i18n, title:title, modelid}]

}
export default UseForm
