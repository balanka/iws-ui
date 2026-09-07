import {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import { LineTransactionGrid } from '../IWSGrid';
import { lineTransactionColumnDefs } from '../ColumnsDefs';
import IWSTabs from './IWSTabs';
import { TransactionDetailsForm } from './TransactionDetailsForm';
import FileOutput from './FileOutput';
import { ILineTransaction, ITransaction } from '../Models';
import { isArrayAndNotEmpty } from '../utils/Utils';
// @ts-ignore
import type { RowSelectedEvent } from 'ag-grid-community/dist/types/src/events';
import {TransactionDetailsTabProps} from "../Props.ts";
import {TFunction} from "i18next";

export const TransactionDetailsTabs = <T extends ITransaction, L extends ILineTransaction>({
                                                                                             collapseTable,
                                                                                             transaction,
                                                                                             setTransaction,
                                                                                             currentLineTransaction,
                                                                                             setCurrentLineTransaction,
                                                                                             accountFilter,
                                                                                             oaccountFilter,
                                                                                             articleData,
                                                                                             vatData,
                                                                                             t,
                                                                                             onGridReady,
                                                                                             zIndex = 2,
                                                                                             locale,
                                                                                             currency,
                                                                                           }: TransactionDetailsTabProps<T, L>) => {
  const height = 20;
  const detailsMinHeight = 120;
  const detailsMaxHeight = 300;
  const disable = transaction?.posted;
  const gridApiRef = useRef<any>(null);
  // Determine current line (first line or prop)
  let currentLine: ILineTransaction = isArrayAndNotEmpty(transaction?.lines)
    ? transaction.lines[0]
    : currentLineTransaction;


  // Build lines array for grid
  const linesx = !transaction?.lines?.length
    ? [{ ...currentLine, transid: transaction?.id }]
    : transaction.lines;

  const  setTr = setTransaction as Dispatch<SetStateAction<ITransaction>>
  const  setLine  = setCurrentLineTransaction as  Dispatch<SetStateAction<ILineTransaction>>
  const tx = t as TFunction<'transalation', undefined>
  const props = {
    transaction,
    setTransaction:setTr,
    currentLineTransaction,
    setCurrentLineTransaction:setLine,
    accountFilter,
    oaccountFilter,
    articleData,
    vatData,
    t:tx,
    disable,
    height,
    locale,
    currency,
  };

  const onRowSelected = (event: RowSelectedEvent) => {
    setCurrentLineTransaction(event.data);
  };

  // Store grid API when ready
  const handleGridReady = (params: any) => {
    gridApiRef.current = params.api;
    if (onGridReady) onGridReady(params);
  };

  // Force grid resize when collapseTable changes
  useEffect(() => {
    if (gridApiRef.current) {
      // Force the grid to recalculate its dimensions
      gridApiRef.current.resetRowHeights();
      gridApiRef.current.sizeColumnsToFit();
    }
  }, [collapseTable]);

  const table = () => (
    <div
      style={{
        width: '100%',
        height: collapseTable ? detailsMinHeight : detailsMaxHeight,
        paddingTop: 1,
        zIndex: zIndex - 2,
      }}
    >
      <LineTransactionGrid
        columnDefs={lineTransactionColumnDefs(t, locale, currency)}
        onRowSelected={onRowSelected}
        rowData={linesx}
        onGridReady={handleGridReady}
        pagination={false}
      />
    </div>
  );

  const tabContent = [
    { title: t('transaction.line.title'), id: 1, form: table() },
    { title: t('common.general'), id: 2, form: TransactionDetailsForm(props) },
    { title: t('common.export'), id: 3, form: FileOutput() },
  ];

  return <IWSTabs tabList={tabContent} />;
};

export default TransactionDetailsTabs;
