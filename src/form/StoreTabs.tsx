import React from 'react'
import { StockGrid } from "../IWSGrid.tsx"
import { styles } from './BasicTreeTableProps.jsx'
import {stockColumnDefs} from '../ColumnsDefs.ts'
import {CustomerAccountForm, MasterfilesForm} from './FormsProps'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import IWSTabs from "./IWSTabs.tsx";
import {StoreGeneralFormProps, StoreProps} from '../Props'
import {initStore} from "./Menu.tsx";

export  const StoreTabs =(
    { collapse, current, setCurrent, ccData, accData, locale,  t,  disable, height, zIndex, minMaxHieght }:StoreProps) => {
    const  props:StoreProps = {collapse, current, setCurrent, ccData, accData, locale,  t,  disable, height, zIndex, minMaxHieght }
    const  props2:StoreGeneralFormProps = {collapse, current, setCurrent, accData, locale,  t,  disable, height }

  const geform  =({collapse, current, setCurrent, accData,   t,  disable, height }:StoreGeneralFormProps) =>{
    return (
      <MasterfilesForm collapse ={collapse} current={current} setCurrent ={setCurrent}
                            disable ={disable} t ={t} height ={height} accData={accData} propertyName={'account'} fieldName ={t('common.account')} />
    )
  }
  const getTable = () =>
      <div  style={{...styles.outer0, paddingTop:15, height:minMaxHieght,  minWidth:"100%"}}>
          <StockGrid
              // @ts-ignore
              theme="legacy" columnDefs ={stockColumnDefs(t)}
                       onRowSelected={()=>{}} rowData ={current?.stocks??initStore[0].stocks} />
      </div>

    const tabContent =
     [{ title: t('common.general'), id: 1, form: geform (props2) },
         // @ts-ignore
      { title: t('common.accounts'), id: 2, form: CustomerAccountForm(props)},
      { title: t('stock.title'), id: 4, form: getTable() },
    ]

  return <IWSTabs tabList={ tabContent} />
}

