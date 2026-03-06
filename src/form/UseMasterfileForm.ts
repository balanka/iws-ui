import {AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, PinnedRowModule} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { UseMasterfileFormResult} from '../Props.ts'
import {Add, Edit, Get} from './CrudController.ts'
import iwsStore from '../utils/Store.tsx'
import {useState} from 'react'
import {IWSModel} from '../Models.ts'
import useForm from './UseForm.ts'
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, PinnedRowModule,])

const UseMasterfileForm = <T extends IWSModel>(current_ :T, ctx_?:string, url?:string): [UseMasterfileFormResult<T>] => {
  const [{ profile, menu, selected, t, i18n, title:title, language, handleLanguageChange, modelid}]  = useForm()
  const { token, company} = profile
  const [edited, setEdited] = useState<boolean>(false)
  const [added, setAdded] = useState<boolean>(false)
  const [current, setCurrent] = useState<T>(current_)
  const [rowData, setRowData] = useState<T[]>([])
  const [disable, setDisable] = useState(true)
  const modifyUrl = url??selected
  const ctx = ctx_??`${selected}/${modelid}/${company}`
  const zIndex = 9999

  const edit = () => {
    if(edited) {
      setEdited(false )
      setDisable(true)
      setAdded(false)
    } else {
      setEdited(true)
      setDisable(false)
      setAdded(true)
    }
  }
  const onRowSelected = (event: RowSelectedEvent) =>{
    if(event) {
      console.log('event', event)
      setCurrent((event.data instanceof Array) ? event.data[0] : event.data)
    }
  }
  const submitEdit = (event:any) => {
    event.preventDefault()
    console.log('rowData', rowData)
    if(edited) {
      const x = Edit(modifyUrl, token, { ...current }, rowData, setRowData, setCurrent)
      //
      console.log('x', x)
      console.log('current', current)
      console.log('rowData', rowData)
      //setRowData(rowData)
      //setCurrent(x)
      //onRowSelected(x)
    } else if (!edited && !disable) {
      Add(modifyUrl, token, {...current}, rowData, setRowData, setCurrent)
    }
    setDisable(true)
    setEdited(false)
    setAdded(true)
  }
  const cancelEdit = () => {
    if(edited) {
      setEdited(false)
      setDisable(true)
      setAdded(true)
    }
  }

  const initAdd = () => {
    const newRow = { ...current_, company:`${company}`}
    setCurrent(newRow)
    setAdded(true)
    setEdited(false)
    setDisable(false)
  }

  const reload = () => {
    iwsStore.deleteKey(current.modelid)
    Get(ctx, token??'noToken', current.modelid, setRowData)
    //const size= rowData.length
    //setCurrent(size>1?rowData[0]:current_)
  }

  return [{ profile, menu, selected, t, i18n, language, modelid, initAdd, added, disable, edit, edited, submitEdit
    , cancelEdit, reload, handleLanguageChange, title:title, zIndex, rowData, setRowData, current, setCurrent, onRowSelected }]

}
export default UseMasterfileForm
