import React, {useState, useEffect} from 'react'
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import Grid from 'react-fast-grid'
import { styles as stylesx } from './BasicTreeTableProps'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { CommonFormHead } from './FormsProps'
import {initArticle, MASTERFILE} from './Menu'
import iwsStore from '../utils/Store'
import  { ArticleTabs }  from './ArticleTabs.tsx'
import { formEnum } from '../utils/FormEnum'
import { Get } from './CrudController.ts'
import {articleColumnDefs} from '../ColumnsDefs.ts'
import {IAccount, IArticle, IMasterfile, IVat} from '../Models.ts'
import {ArticleGrid} from '../IWSGrid.tsx'
import Login from './Login'
import {logout} from '../utils/FormUtils.tsx'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import UseMasterfileForm from './UseMasterfileForm.ts'
import useForm from './UseForm.ts'

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])

 const ArticleForm = () => {
   const [{profile,  selected, t, toggle, toggleTable, state, visible, module_ }] = useForm()
   const { token, company, locale, currency, stockAcc, expenseAcc, revenueAcc, vat} = profile
     const dispatch = useDispatch()
     let navigate = useNavigate()
     if (module_ === '11111' || module_ === 11111) return <Login/>
     const height = 20
     const acc_modelid = formEnum.ACCOUNT
     const vat_modelid = formEnum.VAT
     const qttyUnit_modelid = formEnum.QUANTITYUNIT
     const group_modelid = formEnum.ARTICLE_GROUP
     const ccy_modelid = formEnum.CURRENCY
     const initialState:IArticle = {...initArticle[0], account:stockAcc??'',  oaccount:expenseAcc??''
       , revenueAccount:revenueAcc??'', vatCode:vat??'',  currency:currency??'', stocks:[]}
     const current_: IArticle = initialState
     const [, setIwsState] = useState(iwsStore.initialState)
     const [accData, setAccData] = useState<IAccount[]>([])
     const [groupData, setGroupData] = useState<IMasterfile[]>([])
     const [quantityUnitData, setQuantityUnitData] = useState<IMasterfile[]>([])
     const [vatData, setVatData] = useState<IVat[]>([])
     const [ccyData, setCcyData] = useState<IMasterfile[]>([])
     const [{language, initAdd, added, disable, edit, edited, submitEdit, cancelEdit, reload
       , handleLanguageChange, title, zIndex, rowData, current, setCurrent }] = UseMasterfileForm(current_)
     const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
     const vat_ctx = `${MASTERFILE.vat}/${vat_modelid}/${company}`
     const qttyUnit_ctx = `${MASTERFILE.masterfile}/${qttyUnit_modelid}/${company}`
     const group_ctx = `${MASTERFILE.masterfile}/${group_modelid}/${company}`
     const ccy_ctx = `${MASTERFILE.masterfile}/${ccy_modelid}/${company}`

     useEffect(() => {
         iwsStore.subscribe(setIwsState)
         Get(acc_ctx, token??'noToken', acc_modelid, setAccData)
         Get(group_ctx, token??'noToken', group_modelid, setGroupData)
         Get(qttyUnit_ctx, token??'noToken', qttyUnit_modelid, setQuantityUnitData)
         Get(vat_ctx, token??'noToken', vat_modelid, setVatData)
         Get(ccy_ctx, token??'noToken', ccy_modelid, setCcyData)
         setCurrent(current_)
     }, [selected])

      const load = (event: any) => {
         event.preventDefault()
        reload()
     }

     const onRowSelected = (event: RowSelectedEvent) =>
              setCurrent((event.data instanceof Array) ? event.data[0] : event.data)
     return (<>
             <CommonFormHead
                 title={title}
                 collapse={state.collapse}
                 initAdd={initAdd}
                 edited={edited??false}
                 added={added?? added ===undefined}
                 edit={edit}
                 disable={disable??true}
                 cancelEdit={cancelEdit}
                 submitEdit={submitEdit}
                 submitQuery={load}
                 reload={reload}
                 toggle={toggle}
                 toggleTable={toggleTable}
                 logout={logout}
                 navigate={navigate}
                 language={language}
                 handleLanguageChange={handleLanguageChange}
                 dispatch={dispatch}
             />
             <Grid container style={{...stylesx.innerX, display: !state.collapse?'none':''}} maximize direction="row" zeroMinWidth>
                 <ArticleTabs current={current} setCurrent={setCurrent} disable={disable} t={t} data ={rowData}
                              accData={accData} quantityUnitData ={quantityUnitData} locale={`${locale}`} currency={`${currency}`}
                              vatData={vatData} groupData={groupData} ccyData={ccyData} height={height} zIndex={zIndex-1}/>
             </Grid>
             <Grid container
                 // @ts-ignore
                   style={{...stylesx.outer, height: 300, paddingTop: 10, display: visible?'':'none'}} maximize direction="column">
                 <ArticleGrid columnDefs={articleColumnDefs(t)} onRowSelected={onRowSelected} rowData={rowData}/>
             </Grid>
         </>
     )
}
export default  ArticleForm
