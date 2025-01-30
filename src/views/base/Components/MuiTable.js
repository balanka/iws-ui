import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { lightBlue } from '@mui/material/colors'
export const MuiTable = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    data, // eslint-disable-next-line react/prop-types
    columns, // eslint-disable-next-line react/prop-types
    //setExpanded, // eslint-disable-next-line react/prop-types
    // eslint-disable-next-line react/prop-types
    setPagination, // eslint-disable-next-line react/prop-types
    //setSorting, // eslint-disable-next-line react/prop-types
    //expanded, // eslint-disable-next-line react/prop-types
    // eslint-disable-next-line react/prop-types
    isLoading, // eslint-disable-next-line react/prop-types
    pagination, // eslint-disable-next-line react/prop-types
    isError, // eslint-disable-next-line react/prop-types
    // isRefetching, // eslint-disable-next-line react/prop-types
    //sorting,
  } = props
  const baseBackgroundColor = lightBlue //'rgba(3, 44, 43, 1)'
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <MaterialReactTable
      table={useMaterialReactTable({
        columns,
        data: data,
        enableExpanding: true, //enable expanding column
        enableStickyHeader: true,
        enableFilters: false,
        layoutMode: 'grid', //'grid-no-grow',
        //tell MRT which rows have additional sub-rows that can be fetched
        getRowCanExpand: (row) => (!!row ? row?.original?.subordinateIds?.length : 0), //just some type of boolean
        //identify rows by the user's id
        getRowId: (row) => row.id,
        // eslint-disable-next-line react/prop-types
        getSubRows: (row) => data?.filter((r) => r.managerId === row.id), //parse flat array into tree structure
        // paginateExpandedRows: false, //the back-end in this example is acting as if this option is false
        manualPagination: true, //turn off built-in client-side pagination
        manualSorting: true, //turn off built-in client-side sorting
        enableColumnResizing: true,
        // mantineTableHeadCellProps: {
        //   sx: {
        //     flex: '0 0 auto',
        //   },
        // },
        // mantineTableBodyCellProps: {
        //   sx: {
        //     flex: '0 0 auto',
        //   },
        // },
        muiTableBodyRowProps: ({ row }) => ({
          //conditionally style expanded rows
          sx: {
            fontWeight: row.getIsExpanded() ? 'bold' : 'normal',
            maxHeight: '40px',
            height: row.getIsPinned()
              ? `${
                  //Default mrt row height estimates. Adjust as needed.
                  //density === 'compact' ? 10 : density === 'comfortable' ? 20 : 30
                  // eslint-disable-next-line no-undef
                  density === 'compact' ? 30 : density === 'comfortable' ? 50 : 70
                }px`
              : undefined,
          },
        }),
        muiTableHeadCellProps: {
          sx: {
            // flex: '0 0 auto',
            fontWeight: 'normal',
            fontSize: '12px',
            //color: theme.palette.text.secondary,
          },
          '& .Mui-TableHeadCell-Content': {
            padding: '0',
            flex: '0 0 auto',
          },
          //use the `&` syntax to target hover state
          '&:hover': {
            fontWeight: 'small',
          },
        },
        muiTableContainerProps: {
          sx: {
            flex: '0 0 auto',
            minHeight: '50px',
            maxHeight: '200px',
            maxWidth: '1170px',
          },
        },
        // muiTableBodyRowProps: ({ row, table }) => {
        //   const { density } = table.getState()
        //   return {
        //     sx: {
        //       // maxWidth: '20px',
        //       fontWeight: row.getIsSelected() ? 'bold' : 'normal',
        //       //Set a fixed height for pinned rows
        //       height: row.getIsPinned()
        //         ? `${
        //             //Default mrt row height estimates. Adjust as needed.
        //             //density === 'compact' ? 10 : density === 'comfortable' ? 20 : 30
        //             density === 'compact' ? 50 : density === 'comfortable' ? 70 : 90
        //           }px`
        //         : undefined,
        //     },
        //   }
        // },
        muiTablePaperProps: {
          elevation: 0, //change the mui box shadow
          //customize paper styles
          sx: {
            minHeight: '50px',
            maxHeight: '320px',
            maxWidth: '1189px',
            borderRadius: '0',
            border: '1px dashed #e0e0e0',
          },
        },
        muiTableBodyProps: {
          mrtTheme: (theme) => ({
            baseBackgroundColor: baseBackgroundColor,
            draggingBorderColor: theme.palette.secondary.main,
          }),
          sx: {
            // minHeight: '100px',
            // maxHeight: '195px',
            // maxWidth: '1100px',
            //stripe the rows, make odd rows a darker color
            '& tr:nth-of-type(odd) > td': {
              //backgroundColor: '#f5f5f5',
              backgroundColor: '#FEBE', // '#FEBB' '#FEFB' FEFF '#cef9f9' #ABBB '#ABEE', '#ABBA' '#ABAE' '#cff9e6' '#4ff9f9' '#EEEE' 'lightgray', // 'lightcyan','lightcyan', 'lightblue'
            },
          },
        },
        // muiToolbarAlertBannerProps: isError
        //   ? {
        //       color: 'error',
        //       children: 'Error loading data',
        //     }
        //   : undefined,
        //onExpandedChange: setExpanded,
        onPaginationChange: setPagination,
        //onSortingChange: setSorting,
        // eslint-disable-next-line react/prop-types
        rowCount: data?.length ?? 0, //meta?.totalRowCount ?? 0,
        state: {
          //expanded,
          isLoading,
          pagination,
          showAlertBanner: isError,
          //showProgressBars: isRefetching,
          // sorting,
        },
      })}
    />
  )
}
