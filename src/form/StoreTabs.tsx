import React from 'react'
import { StockGrid } from "../IWSGrid.tsx"
import Grid from 'react-fast-grid'
import { styles } from './BasicTreeTableProps.jsx'
import {stockColumnDefs} from '../ColumnsDefs.ts'
import {CustomerAccountForm, StoreGeneralForm} from './FormsProps'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import IWSTabs from "./IWSTabs.tsx";
import {StoreGeneralFormProps, StoreProps} from '../Props'

export  const StoreTabs =(
    { collapse, current, setCurrent, accData, locale,  t,  disable, height, zIndex }:StoreProps) => {
    const  props:StoreProps = {collapse, current, setCurrent, accData, locale,  t,  disable, height, zIndex }
    const  props2:StoreGeneralFormProps = {collapse, current, setCurrent, accData, locale,  t,  disable, height }
  //const onRowSelected = (event: RowSelectedEvent) => console.log(' RowSelectedEvent', event )

  const getTable = () =>
    <Grid container
        // @ts-ignore
          style={{...styles.outer, height:150,  paddingTop: 10}} maximize direction="row">
      <StockGrid
          // @ts-ignore
          theme="legacy" columnDefs ={stockColumnDefs(t)}
                       onRowSelected={()=>{}} rowData ={current.stocks} />
    </Grid>

    const tabContent =
     [{ title: t('common.general'), id: 1, form:StoreGeneralForm(props2)},
         // @ts-ignore
      { title: t('common.accounts'), id: 2, form: CustomerAccountForm(props)},
      { title: t('stock.title'), id: 4, form: getTable() },
    ]

  return <IWSTabs tabList={ tabContent} />
}

