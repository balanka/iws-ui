import React from 'react'
import {LineTFinancialsGrid} from '../IWSGrid'
import Grid from 'react-fast-grid'
import {LinesFinancialsColumns} from '../ColumnsDefs'
import IWSTabs from './IWSTabs.tsx'
import { FinancialsDetailsFormProps, FinancialsDetailsTabProps } from '../Props'
import {styles as stylesx} from './BasicTreeTableProps.tsx'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { FinancialsDetailsForm} from './FormsProps.tsx'

const FinancialsDetailsTabs  = ({ transaction
                                    , setTransaction
                                    , currentLineFinancials
                                    , setCurrentLineFinancials
                                    , accData, t,  zIndex, onGridReady}: FinancialsDetailsTabProps) => {

    const height = 20
    const disable = transaction.posted
    console.log('Financials current_', currentLineFinancials)
    let  props:FinancialsDetailsFormProps = {transaction, setTransaction
                                               , currentLineFinancials
                                               , setCurrentLineFinancials, accData, t, zIndex, disable,  height}

    const onRowSelected = (event: RowSelectedEvent) => {
        setCurrentLineFinancials(event.data)
        props = {...props, currentLineFinancials: event.data}
    }
  const table =
      <Grid container
          // @ts-ignore
            style={{...stylesx.outer, width: '100%', height: 132, paddingTop: 5, zIndex:zIndex-1}} maximize
            direction="column" zeroMinWidth>
          <LineTFinancialsGrid
              // @ts-ignore
              theme="legacy" columnDefs={LinesFinancialsColumns(t)} onRowSelected={onRowSelected}
              onGridReady={onGridReady}  rowData={transaction?.lines??[]} pagination={false} />
      </Grid>
  const tabContent = [
      { title: t('financials.line.title'), id: 1, form: table },
      { title: t('common.general'), id: 2, form: FinancialsDetailsForm (props)},
    ]
  return <IWSTabs tabList={tabContent} zIndex={zIndex}/>
}
export {FinancialsDetailsTabs}
