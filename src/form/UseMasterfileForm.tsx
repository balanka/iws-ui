import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry, PinnedRowModule} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
//@ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {Add, Edit, Get} from './CrudController.ts'
import iwsStore from '../utils/Store.tsx'
import React, {Dispatch, JSX, ReactNode, SetStateAction, useCallback, useState} from 'react'
import {IWSModel} from '../Models.ts'
import useForm from './UseForm.ts'
//import {CommonIwsFormHead} from "./FormsProps.tsx";
//import {logout} from "../utils/FormUtils.tsx";
import {MasterfileGrid} from "../IWSGrid.tsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
//import Login from "./Login.tsx";
import {formEnum} from "../utils/FormEnum.tsx";
import {State} from "../Props.ts";

import { CommonFormHead } from './CommonFormHead'
import {logout} from "../utils/FormUtils.tsx"
import Login from "./Login.tsx";
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, PinnedRowModule,])

const UseMasterfileForm = <T extends IWSModel>(current_ :T, coldef:ColDef[]
                                               ,  url:string):
  [{header:ReactNode, body: (()=> JSX.Element)|null, table:ReactNode, disable:boolean, visible:boolean, state:State, rowData: T[]
    , current:T, setCurrent:Dispatch<SetStateAction<T>>, zIndex:number, handleKeyPress:(event:any)=>void }] => {
  const [{
    profile, menu, selected, t, title: title
    , language, visible, state, toggle, toggleTable, handleLanguageChange, modelid
  }] = useForm()
  const {token, company} = profile
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  //let body = null
  let body =  ((module_ === '11111' || module_ === 11111)) ? Login : null

  console.log('body', body)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [edited, setEdited] = useState<boolean>(false)
  const [added, setAdded] = useState<boolean>(false)
  const [current, setCurrent] = useState<T>(current_)
  const [rowData, setRowData] = useState<T[]>([])
  const [disable, setDisable] = useState(true)
  const modifyUrl = url
  const ctx = `${url}/${modelid}/${company}`

  const zIndex = 9999
  console.log('ctx', ctx)
  console.log('url', url)
  console.log('edited', edited)
  console.log('rowData', rowData)

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
  const submitQuery = (event: any) => {
    event.preventDefault()
    Get(ctx, token, modelid, setRowData)
    setCurrent(current_)
  }
  const handleKeyPress = useCallback((event:any) => {
    switch (event.keyCode) {
      case 112:
        submitEdit(event)
        return
      case 114:
        reload()
        return
      default:
        return

    }}, [])

  const header:JSX.Element = CommonFormHead({title:title, collapse:state.collapse, initAdd:initAdd, edited:edited??false
    , added:added?? added ===undefined
    , disable:disable??true, edit:edit, cancelEdit: cancelEdit, submitEdit:submitEdit, submitQuery:submitQuery
    , reload:reload, toggle:toggle, toggleTable:toggleTable, logout:logout, navigate:navigate, language:language
    , handleLanguageChange:handleLanguageChange, dispatch:dispatch, t:t})
  //const header = TestHeader({ title });

  console.log('=== CommonFormHead Debug ===');
  console.log('CommonFormHead:', CommonFormHead);
  console.log('CommonFormHead type:', typeof CommonFormHead);
  console.log('CommonFormHead keys:', Object.keys(CommonFormHead || {}));
  console.log('CommonFormHead.prototype:', CommonFormHead?.prototype);

  console.log('=== What does CommonFormHead return? ===');
  console.log('header:', header);
  console.log('header type:', typeof header);
  console.log('Is this a React element?', React.isValidElement(header));
  console.log('If not, what properties does it have?', Object.keys(header || {}));
  // @ts-ignore
  const table:ReactNode = MasterfileGrid( {columnDefs:coldef, onRowSelected:onRowSelected, rowData:rowData})

  return [{header:header, body:body, table, disable, visible, state,  rowData, current, setCurrent, zIndex, handleKeyPress}]


}
export default UseMasterfileForm
