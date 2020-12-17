import React, {useEffect, useState, createRef} from 'react';
import MaterialTable, { MTableFilterRow }  from 'material-table';
import Add from "@material-ui/icons/Add";
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import FirstPage from "@material-ui/icons/FirstPage";
import ChevronRight from "@material-ui/icons/ChevronRight";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import RateReviewIcon from '@material-ui/icons/RateReview';


export default function EditableTable(props) {
    //console.log('propsD',props);
    const {data, columns,  rowStyle,  theme, t , addRow, tableRef, editable} = props
    const [selectedRows, setSelectedRows] = useState([]);
    console.log('props.data',props.data);
    const dx=data
    console.log('state.dx',dx);
   const [state, setState] = useState({data:dx});
    useEffect(() => {}, [props]);


    const [components] = useState({
        FilterRow: (props) => <MTableFilterRow {...props} />
    });
    console.log('state.data',state.data);

    const rowStyle1 = (rowData) => ({ boxShadow: rowData.tableData.checked ? '0px 24px 73px -15px rgba(0,0,0,0.3)' : '', transform: rowData.tableData.checked ? 'scale(1.01)' : 'scale(1)', transition: rowData.tableData.checked ? 'all 0.1s ease' : 'all 0.1s ease', backgroundColor: rowData.tableData.checked ? 'rgba(245, 0, 87, 0.06)' : '', })

    return (
        <MaterialTable
            editable={editable}
            tableRef={tableRef}
            //title={props.title}
            columns={columns}
            data={dx}
            icons={{
                Add: () => <Add />,
                Check: () => <Check />,
                Clear: () => <Clear />,
                Delete: () => <IndeterminateCheckBoxIcon />,
                Edit: () => <RateReviewIcon />,
                FirstPage: () => <FirstPage />,
                NextPage: () => <ChevronRight />,
                LastPage: () => <LastPage />,
                PreviousPage: () => <ChevronLeft />,
                ResetSearch: () => <Clear />,
                Search: () => <Search />
            }}

            options={{
                toolbar:false,
                draggable:true,
                header:true,
                grouping:false,
                sorting:true,
                columnsButton:true,
                addRowPosition: "first",
                paging:false,
                showFirstLastPageButtons:false,
                showTitle:false,
                padding:"dense",
                filtering: false,
                search: false,
                selection: false,
                cellStyle: {padding: '0.3em', fontSize: 10,},
                headerStyle: {padding: '0.3em', fontSize: 10,  position: 'sticky'},
                root: {
                    '&:nth-child(odd)': {
                        backgroundColor: '#fff9e6'//theme.palette.background.default,
                    },
                    color: '#eee',
                    padding: 0.5,
                    height: 3,
                    hover: true
                },
                rowStyle: rowStyle
            }}
            components={components}
            onSelectionChange={(rows) => {
                console.log('rows>>>>>',rows);
                setSelectedRows(rows);
            }}
            localization={{
                body: {
                    emptyDataSourceMessage:t('muitable.emptyDataSourceMessage'),
                    addTooltip:t('muitable.addTooltip'),
                    deleteTooltip: t('muitable.deleteTooltip'),
                    editTooltip: t('muitable.editTooltip'),
                    filterRow: {
                        filterTooltip: t('muitable.filterTooltip')
                    },
                    editRow: {
                        deleteText: t('muitable.deleteText'),
                        cancelTooltip: t('muitable.cancelTooltip'),
                        saveTooltip: t('muitable.saveTooltip'),
                    }
                },
                grouping: {
                    placeholder: t('muitable.placeholder'),
                    groupedBy: t('muitable.groupedBy'),
                },
                header: {
                    actions: t('muitable.actions'),
                },
                pagination: {
                    labelDisplayedRows: t('muitable.labelDisplayedRows'),
                    labelRowsSelect: t('muitable.labelRowsSelect'),
                    labelRowsPerPage: t('muitable.labelRowsPerPage'),
                    firstAriaLabel: t('muitable.firstAriaLabel'),
                    firstTooltip: t('muitable.firstTooltip'),
                    previousAriaLabel: t('muitable.previousAriaLabel'),
                    previousTooltip: t('muitable.previousTooltip'),
                    nextAriaLabel: t('muitable.previousTooltip'),
                    nextTooltip:t('muitable.nextTooltip'),
                    lastAriaLabel: t('muitable.lastAriaLabel'),
                    lastTooltip: t('muitable.lastTooltip'),
                },
                toolbar: {
                    addRemoveColumns: t('muitable.addRemoveColumns'),
                    nRowsSelected: t('muitable.nRowsSelected'),
                    showColumnsTitle: t('muitable.showColumnsTitle'),
                    showColumnsAriaLabel: t('muitable.showColumnsAriaLabel'),
                    exportTitle: t('muitable.exportTitle'),
                    exportAriaLabel: t('muitable.exportAriaLabel'),
                    exportName: t('muitable.exportName'),
                    searchTooltip:t('muitable.searchTooltip'),
                    searchPlaceholder: t('muitable.searchPlaceholder'),
                }
            }}
        />
    );
}