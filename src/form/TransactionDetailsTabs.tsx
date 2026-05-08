import { LineTransactionGrid} from "../IWSGrid"
import { lineTransactionColumnDefs} from "../ColumnsDefs"
import IWSTabs from './IWSTabs.tsx'
import {TransactionDetailsFormProps, TransactionDetailsTabProps} from '../Props'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import { TransactionDetailsForm} from './TransactionDetailsForm.tsx'
import {blue} from '@mui/material/colors'
import FileOutput from './FileOutput.tsx'
import { ILineTransaction, ITransaction} from '../Models.ts'
import {isArrayAndNotEmpty} from "../utils/Utils.ts";

const styles = {
    outer: {
        backgroundColor: blue,
        borderRadius: 5,
        boxShadow: '0 10px 30px #BBB',
        padding: 0,
    }
}
const TransactionDetailsTabs = ({
                                      transaction, setTransaction
                                    , currentLineTransaction, setCurrentLineTransaction
                                   ,  accountFilter, oaccountFilter
                                  , articleData, vatData, t, onGridReady,  zIndex
                                }: TransactionDetailsTabProps<ITransaction, ILineTransaction>) => {

    const height = 20
    const disable = transaction?.posted
  let currentLine:ILineTransaction = isArrayAndNotEmpty(transaction?.lines)? transaction?.lines[0]:currentLineTransaction
  currentLine = (transaction?.lines?.length===1)?currentLine:currentLineTransaction
    const linesx = !transaction?.lines?.length ? [{
    ...currentLine, transid: transaction?.id}] : transaction?.lines
  if(transaction?.hasOwnProperty('lines')) {
    transaction.lines = linesx
  }else {
    transaction["lines"] = linesx
  }
    const props: TransactionDetailsFormProps<ITransaction, ILineTransaction> = { transaction, setTransaction
      , currentLineTransaction:currentLine
      , setCurrentLineTransaction, accountFilter, oaccountFilter, articleData, vatData, t, disable, height
    }
    const onRowSelected = (event: RowSelectedEvent) => setCurrentLineTransaction(event.data)

    const table = () => {
        return (
            <div
                // @ts-ignore
                  style={{...styles.outer, width: '100%', height: 130, paddingTop:1, zIndex:zIndex-2}}>
                <LineTransactionGrid columnDefs={lineTransactionColumnDefs(t)} onRowSelected={onRowSelected}
                   rowData={!transaction?.lines?.length?[ {...currentLineTransaction, transid:transaction?.id}]:transaction?.lines}
                   onGridReady={onGridReady}  pagination={false}/>
            </div>
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
