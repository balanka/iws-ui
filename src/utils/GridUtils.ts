import {ColDef, RowSelectedEvent} from 'ag-grid-community'

export type defaultColDefType = {
  resize: { resizable: boolean }
}
export const  getGridOptions = <A>(columnDefs:ColDef[],
                        defaultColDef:defaultColDefType,
                        onRowSelected: (event:RowSelectedEvent<A, any>) => void):{
  getRowStyle: (params: any) => { background: string };
  theme: string;
  columnDefs: ColDef[];
  defaultColDef: defaultColDefType;
  rowHeight: number;
  rowSelection: { mode: string };
  onRowSelected: (event: RowSelectedEvent<A, any>) => void;
  paginationPageSizeSelector: number[];
  pagination: boolean;
  paginationPageSize: number;
  masterDetail: boolean;
  detailRowAutoHeight: boolean;
  autoSizeStrategy: { type: string }
}  => {
  return  {
    // @ts-ignore
    getRowStyle: params => (params.node.rowIndex % 2 === 0) ? {background: '#fff9e6'} : {background: 'white'},
    theme: 'legacy',
    columnDefs,
    defaultColDef,
    rowHeight: 30,
    rowSelection: {
      //mode: "singleRow",
      mode: "multiRow",
    },
    onRowSelected: onRowSelected,
    paginationPageSizeSelector: [5, 10, 20],
    pagination: true,
    paginationPageSize: 10,
    masterDetail: true,
    detailRowAutoHeight: true,
    autoSizeStrategy: {
      type: "fitGridWidth",
    },
  }
}

