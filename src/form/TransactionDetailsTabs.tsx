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
import {ILineTransaction} from '../Models.ts'
import {formatumber2Digits} from "../utils/Utils.ts";
import {showFile} from "../utils/XlsUtils.ts";


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
                                }: TransactionDetailsTabProps) => {

    const height = 20
    //const templateFileName ='Goodreceiving.docx'
    const templateFileName ='Goodreceiving1.docx'
    const disable = transaction.posted

    const total = transaction?.lines?.reduce((c, current:ILineTransaction)=> c+current?.quantity*current?.price+current?.vat, 0)
    const linesx = () =>
        transaction?.lines?.map((line)=> {return {...line
            , quantity: formatumber2Digits (line?.quantity*line?.price,'de-DE', 2)
            , price: formatumber2Digits (line?.price,'de-DE', 2)
            , vat: formatumber2Digits (line?.vat,'de-DE', 2)
            , net: formatumber2Digits (line?.quantity*line?.price, 'de-DE', 2)}})
    const currentx = {...transaction, lines:linesx (), total: formatumber2Digits (total, 'de-DE', 2) }
    transaction.lines = !transaction?.lines?.length?  [ {...currentLineTransaction, transid:transaction.id1}]:transaction?.lines
    //const saveProps:SaveProps<ILineTransaction>= { 'fileName':"MYSavedData.xlsx", 'sheetName':"Sheet1", data:data}

  console.log('Transaction>>>', transaction)
    const props: TransactionDetailsFormProps = {
        transaction, setTransaction, currentLineTransaction
        , setCurrentLineTransaction, articleData, vatData, t, disable, height
    }
    const onRowSelected = (event: RowSelectedEvent) => {
        console.log('event.dataLLLL>>>', event.data)
        setCurrentLineTransaction(event.data)
    }
  // const defaultColDef = {
  //     editable: true
  //   }
    const table = () => {
        return (
            <Grid container
                // @ts-ignore
                  style={{...styles.outer, width: '100%', height: 130, paddingTop: 5, zIndex:zIndex-2}} maximize
                  direction="column" zeroMinWidth>
                <LineTransactionGrid columnDefs={lineTransactionColumnDefs(t)} onRowSelected={onRowSelected}
                                     //defaultColDef = {defaultColDef}
                   rowData={!transaction?.lines?.length?[ {...currentLineTransaction
                   , transid:transaction.id1}]:transaction.lines}
                   onGridReady={onGridReady}  pagination={false}/>
            </Grid>
        )
    }

    const handleClick = (event:any) => {
        const { target = {} } = event || {}
        target.value = ""
    }

    const tabContent = [
        {title: t('transaction.line.title'), id: 1, form: table()},
        {title: t('common.general'), id: 2, form: TransactionDetailsForm(props)},
        {title: t('common.export'), id: 3, form: FileOutput()},
        {title: t('common.print'), id: 4, form: <input type="file" onInput={(event:any) =>
                showFile({e: event, templateFileName: templateFileName, data: currentx})}
                onClick={handleClick}
            />},

    ]
    return <IWSTabs tabList={tabContent}/>
}
export {TransactionDetailsTabs}
