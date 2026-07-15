import  {useState, useEffect} from 'react'
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ModuleRegistry
} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {Edit, Get, Get2} from './CrudController'
import {initBS, MASTERFILE} from './Menu'
import iwsStore from '../utils/Store'
import {bankStatementColumnDefs} from '../ColumnsDefs.ts'
import {IBankStatement } from '../Models.ts'
import {BankStatementGrid} from '../IWSGrid.tsx'
import BankStatementTabs from './BankStatementTabs.tsx'
import Login from './Login'
import {logout} from '../utils/FormUtils.tsx'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import useForm from './UseForm.ts'
import {styles} from './BasicTreeTableProps.tsx'
import BankStatementFormHead from "./BankStatementFormHead.tsx";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

const BankStatementForm = () => {
  const [{profile, t,  selected, visible, language, toggle, toggleTable, handleLanguageChange, state, modelid, company,  module_ }] = useForm()
  const { token, locale, currency } = profile
  const currencyx = currency ??'EUR'
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const modifyUrl = module_.ctx
  if (module_ === '11111' || module_ === 11111) return <Login/>
  const title = t(module_.title)
  const ctx = `${module_.ctx}/${modelid}/${company}`
  const current_: IBankStatement = initBS
  const [current, setCurrent] = useState<IBankStatement>(current_)
  const [rows, setRows] = useState<string[]|bigint[]>([])
  const [rowData, setRowData] = useState<IBankStatement[]>([])

  useEffect(() => {
    const subscription = iwsStore.subscribe((store) => {
      setRowData(store.get(current_.modelid) as unknown as IBankStatement[]);
      setCurrent(current_)
      // attach the event listener
     // document.onkeydown = handleKeyPress
      //document.addEventListener('onKeyDown', handleKeyPress)
    });
    return () => subscription.unsubscribe();
  }, [current_, selected])

  const cancelEdit = () => {
    setCurrent(current_)
  }
  const submitEdit = async () => {
    try {
      const updated = await Edit(modifyUrl, token, current, setCurrent);
      // Update the local list optimistically with the server response
      const index = rowData.findIndex((obj) => obj && obj.id === updated.id);
      if (index >= 0) {
        const newList = [...rowData];
        newList[index] = updated;
        setRowData(newList);
      }
      // setCurrent already called inside Edit, but you can also do:
      // setCurrent(updated); // optional, already done
    } catch (error) {
      console.error('Edit failed', error);
      // Show user notification
    }
  };
  // const submitEdit = () => {
  //   const updated = Edit(modifyUrl, token, current, setCurrent)
  //   const index = rowData.findIndex((obj:IBankStatement) => obj && (obj.id === updated.id))
  //   if (index>=0) {
  //     rowData[index] = updated
  //     setRowData([...rowData])
  //   }
  //   setCurrent(updated)
  // }

  const reload = () => {
    iwsStore.deleteByModelId(current.modelid)
    Get(ctx, token, modelid, setRowData)
    setCurrent(current_)
}

  const onRowSelected = (event: RowSelectedEvent) => {
    const _data:IBankStatement[] = (event.data instanceof Array)?event.data:[event.data]
    let rowsx = _data.map((item:IBankStatement) => item.id)
    // @ts-ignore
    setRows(rowsx)
    setCurrent(_data[0])
  }

  const submitPost = (event:any) => {
    event.preventDefault()
    const url_ = `${MASTERFILE.bs}/post/${current.company}/${rows.join(',')}`
    Get2(url_, token, setCurrent)
  }
  const importData = () => {
    console.log('current', current)
    const url_ = `${module_.ctx}/${current.path}/${current.header}/${current.char}/${current.extension}/${company}`
    console.log('url_', url_)
    url_ && Get(url_, token, current.modelid, setRowData)
  }

  const minHeight = 330
  const maxHeight = 500
  const height = 33
  return (
        <>
          <BankStatementFormHead
              title={title}
              collapse={state.collapse}
              cancelEdit={cancelEdit}
              submitEdit={submitEdit}
              importData={importData}
              submitPost={submitPost}
              reload={reload}
              toggle={toggle}
              toggleTable={toggleTable}
              logout={logout}
              navigate={navigate}
              language={language}
              handleLanguageChange={handleLanguageChange}
              dispatch={dispatch}
              current={current}
              t={t}
          />
          <div
            //@ts-ignore
            style={{...styles.outer, paddingTop:1, paddingBottom:10, display: !state.collapse?'none':''}}>
            <BankStatementTabs collapse ={state.collapse} current={current} setCurrent={setCurrent}  t={t}  height={height}
              currency={currencyx}  locale={locale ??'fr-FR'}/>
          </div>
          <div
            //@ts-ignore
            style={{...styles.outer, paddingTop:15, height: state.collapse?minHeight:maxHeight,  minWidth:"100%", display:visible?'':'none'}}>
              <BankStatementGrid
                   columnDefs ={bankStatementColumnDefs(t, locale??'fr-FR', currency??'EUR')}  onRowSelected={onRowSelected} rowData ={rowData}/>
            </div>
    </>
  )
}
export default BankStatementForm
