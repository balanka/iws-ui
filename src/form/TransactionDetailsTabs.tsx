import React from 'react'
import { LineTransactionGrid} from "../IWSGrid"
import Grid from 'react-fast-grid'
import { lineTransactionColumnDefs} from "../ColumnsDefs"
import IWSTabs from './IWSTabs.tsx'
import {TransactionDetailsFormProps, TransactionDetailsTabProps} from '../Props'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { TransactionDetailsForm} from './FormsProps.tsx'
import {blue} from '@mui/material/colors'
import FileOutput from './FileOutput.tsx'
import {ILineTransaction, ITransaction} from '../Models.ts'

const styles = {
    outer: {
        backgroundColor: blue,
        borderRadius: 5,
        boxShadow: '0 10px 30px #BBB',
        padding: 5,
    }
}
const TransactionDetailsTabs = ({
                                      transaction, setTransaction
                                    , currentLineTransaction, setCurrentLineTransaction
                                    , articleData, vatData, t, onGridReady,  zIndex
                                }: TransactionDetailsTabProps<ITransaction, ILineTransaction>) => {

    const height = 20
    const disable = transaction?.posted
  const linesx = !transaction?.lines?.length ? [{
    ...currentLineTransaction,
    transid: transaction?.id1
  }] : transaction?.lines
  if(transaction.hasOwnProperty('lines')) {
    transaction.lines = linesx
  }else {
    transaction["lines"] = linesx
  }
    const props: TransactionDetailsFormProps<ITransaction, ILineTransaction> = { transaction, setTransaction, currentLineTransaction
        , setCurrentLineTransaction, articleData, vatData, t, disable, height
    }
    const onRowSelected = (event: RowSelectedEvent) => setCurrentLineTransaction(event.data)


    const table = () => {
        return (
            <Grid container
                // @ts-ignore
                  style={{...styles.outer, width: '100%', height: 130, paddingTop: 5, zIndex:zIndex-2}} maximize
                  direction="column" zeroMinWidth>
                <LineTransactionGrid columnDefs={lineTransactionColumnDefs(t)} onRowSelected={onRowSelected}
                   rowData={!transaction?.lines?.length?[ {...currentLineTransaction, transid:transaction?.id1}]:transaction?.lines}
                   onGridReady={onGridReady}  pagination={false}/>
            </Grid>
        )
    }

    const tabContent = [
        {title: t('transaction.line.title'), id: 1, form: table()},
        {title: t('common.general'), id: 2, form: TransactionDetailsForm(props)},
        {title: t('common.export'), id: 3, form: FileOutput()},
    ]
    return <IWSTabs tabList={tabContent}/>
}
export {TransactionDetailsTabs}
