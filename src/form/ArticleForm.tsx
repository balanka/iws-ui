import React, {useState, useEffect} from 'react'
import {AllCommunityModule, ClientSideRowModelModule, ColDef, ModuleRegistry} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import {styles} from './BasicTreeTableProps'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {initArticle, MASTERFILE} from './Menu'

import  { ArticleTabs }  from './ArticleTabs.tsx'
import { formEnum } from '../utils/FormEnum'
import { Get } from './CrudController.ts'
import {articleColumnDefs} from '../ColumnsDefs.ts'
import {IAccount, IArticle, IMasterfile, IVat} from '../Models.ts'
import UseMasterfileForm from './UseMasterfileForm.tsx'
import useForm from './UseForm.ts'
import {CInputGroup} from "@coreui/react";
import Login from "./Login.tsx";


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule,])
     const ArticleForm = () => {
     const [{profile, t, module_ }] = useForm()
      if (module_ === '11111' || module_ === 11111) return <Login/>
     const { token, company, locale, currency, stockAcc, expenseAcc, revenueAcc, vat} = profile
     const acc_modelid = formEnum.ACCOUNT
     const vat_modelid = formEnum.VAT
     const qttyUnit_modelid = formEnum.QUANTITYUNIT
     const group_modelid = formEnum.ARTICLE_GROUP
     const ccy_modelid = formEnum.CURRENCY
     const initialState:IArticle = {...initArticle[0], account:stockAcc??'',  oaccount:expenseAcc??''
       , revenueAccount:revenueAcc??'', vatCode:vat??'',  currency:currency??'', stocks:[]}
     const current_: IArticle = initialState
       //const modelid: number = module_ ? module_.modelid : 1111
     //const [, setIwsState] = useState(iwsStore.getByModelId(modelid))
     const [accData, setAccData] = useState<IAccount[]>([])
     const [groupData, setGroupData] = useState<IMasterfile[]>([])
     const [quantityUnitData, setQuantityUnitData] = useState<IMasterfile[]>([])
     const [vatData, setVatData] = useState<IVat[]>([])
     const [ccyData, setCcyData] = useState<IMasterfile[]>([])
     const acc_ctx = `${MASTERFILE.acc}/${acc_modelid}/${company}`
     const vat_ctx = `${MASTERFILE.vat}/${vat_modelid}/${company}`
     const qttyUnit_ctx = `${MASTERFILE.masterfile}/${qttyUnit_modelid}/${company}`
     const group_ctx = `${MASTERFILE.masterfile}/${group_modelid}/${company}`
     const ccy_ctx = `${MASTERFILE.masterfile}/${ccy_modelid}/${company}`
     const height = 33
     const minHeight = 350
     const maxHeight = 700
      const colDef:ColDef[]= articleColumnDefs(t)
      const {header, body, table, disable, visible, state, rowData, current, setCurrent, zIndex} =
        UseMasterfileForm<IArticle>(current_,  colDef, MASTERFILE.article)

       useEffect(() => {
         Get(acc_ctx, token??'noToken', acc_modelid, setAccData)
         Get(group_ctx, token??'noToken', group_modelid, setGroupData)
         Get(qttyUnit_ctx, token??'noToken', qttyUnit_modelid, setQuantityUnitData)
         Get(vat_ctx, token??'noToken', vat_modelid, setVatData)
         Get(ccy_ctx, token??'noToken', ccy_modelid, setCcyData)
         setCurrent(current_)
       }, [])
      const safeBody = React.isValidElement(body) ? body : null;
       const mainForm = ArticleTabs ({collapse:state.collapse, current:current, setCurrent:setCurrent, disable:disable, t:t
                             , data:rowData, accData:accData, quantityUnitData:quantityUnitData,  locale:`${locale}`, currency:`${currency}`
                              , vatData:vatData, groupData:groupData, ccyData:ccyData, height:height, zIndex:zIndex-1})
      return (
        <>
          {header}
          <CInputGroup>
            {safeBody ? safeBody :mainForm}
          </CInputGroup>
          <div  style={{...styles.outer0, paddingTop:15, height: state.collapse?minHeight:maxHeight,  minWidth:"100%", display:visible?'':'none'}}>
            {table}
          </div>
        </>
      )
}
export default  ArticleForm
