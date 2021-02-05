import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from "./TableIcons.js";

export default function EditableTable(props) {
    const {Options, flag, data, columns, t, tableRef, edit, editable, setSelectedRows
    , parentChildData} = props
    return (
        <MaterialTable
            editable={flag?null:editable}
            tableRef={tableRef}
            //title={props.title}
            columns={columns}
            data={data}
            icons={tableIcons}
            options={Options}
            parentChildData ={parentChildData}
            //components={components}
            onSelectionChange={(rows) => {
                setSelectedRows(rows);
                if(Options.selection&&edit&&rows.length>0)
                    edit(rows[0]);
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