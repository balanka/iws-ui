import React, {useEffect, useState} from 'react';
import MaterialTable from '@material-table/core';
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
    const {Options, flag, data, columns, t, tableRef, addRow, edit, editable} = props
    const [selectedRows, setSelectedRows] = useState([]);
    const dx=data
    const [datax, setDatax] = useState(dx);

    useEffect(() => {}, [props, datax, data]);
    const icons ={
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
    }
    return (
        <MaterialTable
            editable={flag?null:editable}
           tableRef={tableRef}
            //title={props.title}
            columns={columns}
            data={data}
            icons={icons}
            options={Options}
            //components={components}
            onSelectionChange={(rows) => { console.log('selectedRows',rows); console.log('selectedRowsedit',edit!==null);
               // if(rows.length>0) edit(rows[0].tid);
                if(rows.length>0 && edit!==null) edit(rows[0]);
            setSelectedRows(rows)}}
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